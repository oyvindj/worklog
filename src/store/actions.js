import * as serviceUtil from '../common/serviceUtil'

export const DELETE_WORK = ({dispatch, commit, state}, payload) => {
  serviceUtil.deleteItem({dispatch, commit, state}, payload.item, 'work', 'LOAD_WORK_LIST', payload.success, payload.error)
}
export const CREATE_WORK = ({dispatch, commit, state}, payload) => {
  serviceUtil.create({dispatch, commit, state}, payload.work, 'work', 'LOAD_WORK_LIST', payload.success, payload.error)
}
export const LOAD_WORK_LIST = ({commit, state}, payload) => {
  serviceUtil.load({commit, state}, payload, 'work', 'SET_WORK_LIST', null)
}
export const LOAD_COMPANIES = ({commit, state}, payload) => {
  serviceUtil.load({commit, state}, payload, 'company', 'SET_COMPANIES', null)
}
export const LOAD_PROJECTS = ({commit, state}, payload) => {
  serviceUtil.load({commit, state}, payload, 'project', 'SET_PROJECTS', null)
}
