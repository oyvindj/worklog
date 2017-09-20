export const SET_AUTHENTICATED = (state, data) => {
  state.authenticated = data
}
export const SET_USER = (state, data) => {
  state.user = data
}
export const SET_WORK_LIST = (state, data) => {
  state.workList = data
}
export const SET_PROJECTS = (state, data) => {
  state.projects = data
}
export const SET_COMPANIES = (state, data) => {
  state.companies = data
}
export const SET_ERROR = (state, data) => {
  state.error = data
  state.confirmed = false
}
export const SET_CONFIRMED = (state, data) => {
  state.confirmed = data
  state.error = false
}
