import axios from 'axios'
import * as config from '../config'
import * as restUtil from './restUtil'

const defaultSuccess = (item) => {
  console.log('success...')
}
const defaultError = (item) => {
  console.log('error...')
}

export const deleteItem = ({dispatch, commit, state}, payload, entity, dispatchTo, success = defaultSuccess, error = defaultError) => {
  if (config.props.DEBUG) {
    console.log('creating ' + entity + ', dispatch: ' + dispatchTo + ', payload: ' + JSON.stringify(payload))
  }
  const url = restUtil.createDeleteUrl(entity, payload)
  const params = {
  }
  axios.delete(url, {headers: restUtil.headers, params: params}).then(resp => {
    console.log('deleted entity...')
    success(entity)
    dispatch(dispatchTo)
  }).catch(error => {
    console.log('Error deleting ' + entity, error)
    error(entity)
  })
}
export const create = ({dispatch, commit, state}, payload, entity, dispatchTo, inFilter, success = defaultSuccess, error = defaultError) => {
  if (config.props.DEBUG) {
    console.log('creating ' + entity + ', dispatch: ' + dispatchTo + ', filter: ' + JSON.stringify(inFilter) + ', payload: ' + JSON.stringify(payload))
  }
  const url = restUtil.createUrl(entity)
  let filter = inFilter
  if (filter === null) {
    filter = {}
  }
  const params = {
    ...filter
  }
  axios.post(url, payload, {headers: restUtil.headers, params: params}).then(resp => {
    console.log('created entity...')
    commit('SET_CONFIRMED', true)
    success(resp.data)
    dispatch(dispatchTo)
  }).catch(error => {
    console.log('Error creating ' + entity, error)
    commit('SET_ERROR', true)
    error(payload)
  })
}
export const load = ({commit, state}, payload, entity, mutation, inFilter) => {
  if (config.props.DEBUG) {
    console.log('loading ' + entity + ', mutation: ' + mutation + ', filter: ' + JSON.stringify(inFilter))
  }
  const url = restUtil.createUrl(entity)
  let filter = inFilter
  if (filter === null) {
    filter = {}
  }
  const params = {
    ...filter
  }
  axios.get(url, {headers: restUtil.headers, params: params}).then(resp => {
    // console.log(resp.data)
    commit(mutation, resp.data)
  }).catch(error => {
    console.log('Error getting ' + entity, error)
  })
}
export const loadById = ({commit, state}, payload, entity, mutation, inFilter) => {
  if (config.props.DEBUG) {
    console.log('loading ' + entity + ', mutation: ' + mutation + ', filter: ' + JSON.stringify(inFilter))
  }
  const url = restUtil.createDeleteUrl(entity, payload)
  let filter = inFilter
  if (filter === null) {
    filter = {}
  }
  const params = {
    ...filter
  }
  axios.get(url, {headers: restUtil.headers, params: params}).then(resp => {
    // console.log(resp.data)
    commit(mutation, resp.data)
  }).catch(error => {
    console.log('Error getting ' + entity, error)
  })
}
