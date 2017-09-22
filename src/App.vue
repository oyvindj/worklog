<template>
  <div>
    <Navbar></Navbar>
    <div class="ui hidden divider"></div>
    <div class="container">
      <router-view
        :auth="auth"
        :user="profile"
        :authenticated="authenticated">
      </router-view>
    </div>
  </div>
</template>

<script>
import AuthService from './auth/AuthService'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import router from './router'
import Navbar from './components/Navbar.vue'

const auth = new AuthService()
const { login, logout, authenticated } = auth

export default {
  name: 'app',
  data () {
    return {
      auth
    }
  },
  computed: {
    profile () {
      return auth.userProfile
    },
    ...mapGetters({
      profile: 'GET_USER',
      authenticated: 'GET_AUTHENTICATED'
    })
  },
  components: {
    Navbar
  },
  methods: {
    login,
    logout,
    ...mapMutations({
      setProfile: 'SET_USER',
      setAuthenticated: 'SET_AUTHENTICATED'
    }),
    ...mapActions({
    })
  },
  mounted: function () {
    // this.loadInstances({name: 'Foo!'})
    const profile = JSON.parse(localStorage.getItem('user_profile'))
    if (profile) {
      if (auth.isAuthenticated()) {
        this.setProfile(profile)
        this.setAuthenticated(true)
      } else {
        console.log('login token expired...')
      }
    }
    if (authenticated) {
      router.replace('home')
    }
  },
  watch: {
    'theAuthenticated': function () {
      console.log('authenticated changed...')
    }
  }
}
</script>

<style>
  .router-link-active {
  }
</style>
