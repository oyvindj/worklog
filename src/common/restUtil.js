import * as config from '../config'
import * as authUtil from '../auth/auth-util'

export const createUrl = (requestMapping) => {
  return config.props.HOST + '/' + requestMapping
}
export const createDeleteUrl = (requestMapping, id) => {
  return config.props.HOST + '/' + requestMapping + '/' + id
}
export const headers = authUtil.getAuthHeader()

export const validateStatus = function (status) {
  return (status < 300) // Reject only if the status code is greater than or equal to 300
}
