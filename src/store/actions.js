import axios from 'axios'
import * as restUtil from '../common/restUtil'
import * as config from '../config'

export const DELETE_WORK = ({dispatch, commit, state}, payload) => {
  deleteItem({dispatch, commit, state}, payload, 'work', 'LOAD_WORK_LIST', null)
}
export const CREATE_WORK = ({dispatch, commit, state}, payload) => {
  create({dispatch, commit, state}, payload, 'work', 'LOAD_WORK_LIST', null)
}
export const LOAD_WORK_LIST = ({commit, state}, payload) => {
  load({commit, state}, payload, 'work', 'SET_WORK_LIST', null)
}
export const LOAD_COMPANIES = ({commit, state}, payload) => {
  load({commit, state}, payload, 'company', 'SET_COMPANIES', null)
}
export const LOAD_PROJECTS = ({commit, state}, payload) => {
  load({commit, state}, payload, 'project', 'SET_PROJECTS', null)
}

const deleteItem = ({dispatch, commit, state}, payload, entity, dispatchTo, inFilter) => {
  if (config.props.DEBUG) {
    console.log('creating ' + entity + ', dispatch: ' + dispatchTo + ', filter: ' + JSON.stringify(inFilter) + ', payload: ' + JSON.stringify(payload))
  }
  const url = restUtil.createDeleteUrl(entity, payload)
  let filter = inFilter
  if (filter === null) {
    filter = {}
  }
  const params = {
    ...filter
  }
  axios.delete(url, {headers: restUtil.headers, params: params}).then(resp => {
    console.log('deleted entity...')
    dispatch(dispatchTo)
  }).catch(error => {
    console.log('Error deleting ' + entity, error)
  })
}
const create = ({dispatch, commit, state}, payload, entity, dispatchTo, inFilter) => {
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
    dispatch(dispatchTo)
  }).catch(error => {
    console.log('Error creating ' + entity, error)
  })
}
const load = ({commit, state}, payload, entity, mutation, inFilter) => {
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
    commit(mutation, resp.data)
  }).catch(error => {
    console.log('Error getting ' + entity, error)
  })
}
