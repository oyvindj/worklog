import * as serviceUtil from '../common/serviceUtil'

export const DELETE_COMPANY = ({dispatch, commit, state}, payload) => {
  serviceUtil.deleteItem({dispatch, commit, state}, payload.id, 'project', null, payload.success, payload.error)
}
export const DELETE_PROJECT = ({dispatch, commit, state}, payload) => {
  serviceUtil.deleteItem({dispatch, commit, state}, payload.id, 'project', null, payload.success, payload.error)
}
export const DELETE_WORK = ({dispatch, commit, state}, payload) => {
  serviceUtil.deleteItem({dispatch, commit, state}, payload.item, 'work', 'LOAD_WORK_LIST', payload.success, payload.error)
}
export const CREATE_WORK = ({dispatch, commit, state}, payload) => {
  serviceUtil.create({dispatch, commit, state}, payload.work, 'work', 'LOAD_WORK_LIST', {}, payload.success, payload.error)
}
export const CREATE_COMPANY = ({dispatch, commit, state}, payload) => {
  serviceUtil.create({dispatch, commit, state}, payload.data, 'company', 'LOAD_COMPANIES', {}, payload.success, payload.error)
}
export const CREATE_PROJECT = ({dispatch, commit, state}, payload) => {
  serviceUtil.create({dispatch, commit, state}, payload.data, 'project', 'LOAD_PROJECTS', {}, payload.success, payload.error)
}
export const LOAD_WORK_LIST = ({commit, state}, payload) => {
  serviceUtil.load({commit, state}, payload, 'work', 'SET_WORK_LIST', null)
}
export const LOAD_COMPANIES = ({commit, state}, payload) => {
  serviceUtil.load({commit, state}, payload, 'company', 'SET_COMPANIES', null)
}
export const LOAD_PROJECTS = ({commit, state}, payload) => {
  const filter = {
    companyId: payload
  }
  serviceUtil.load({commit, state}, payload, 'companyproject', 'SET_PROJECTS', filter)
}
export const LOAD_ALL_PROJECTS = ({commit, state}, payload) => {
  serviceUtil.load({commit, state}, payload, 'project', 'SET_ALL_PROJECTS', {})
}
