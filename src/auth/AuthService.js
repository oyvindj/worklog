import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import router from './../router'
import store from '../store'
import * as dateUtil from '../common/dateUtil'

export default class AuthService {
  authenticated = this.isAuthenticated()
  // authNotifier = new EventEmitter()
  userProfile = this.getUserProfile()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `yoyoquiz`,
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        let self = this
        this.auth0.client.userInfo(authResult.accessToken, function (err, user) {
          if (user) {
            console.log('user logged on: ' + user.nickname)
            self.setSession(authResult, user)
            // self.updateMetadata(user.sub, authResult.accessToken)
            router.replace('home')
          } else if (err) {
            console.log('ERROR: ' + err)
          }
        })
      } else if (err) {
        router.replace('home')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  updateMetadata (sub, token) {
    const auth0Manage = new auth0.Management({
      domain: 'oyvindj.eu.auth0.com',
      token: token
    })
    const userId = sub.split('|')[1]
    console.log('creating metadata for userId: ' + userId)
    auth0Manage.getUser(userId, (err, profile) => {
      console.log('got profile: ' + profile)
      console.log('err: ' + err)
      const userMetadata = {rank: 'pro'}
      auth0Manage.patchUserMetadata(userId, userMetadata, (data) => {
        console.log('user metadata updated: ' + data)
      })
    })
  }

  setSession (authResult, user) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('user_profile', JSON.stringify(user))
    store.state.user = user
    store.state.authenticated = true
  }

  logout () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('userProfile')
    // this.authNotifier.emit('authChange', false)
    store.state.user = {}
    store.state.authenticated = false
    router.replace('home')
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    console.log('login expires in ' + dateUtil.formattedDuration(new Date(), expiresAt))
    return new Date().getTime() < expiresAt
  }
  getUserProfile () {
    const up = localStorage.getItem('user_profile')
    if (up) {
      return JSON.parse(up)
    } else {
      return {}
    }
  }
}
