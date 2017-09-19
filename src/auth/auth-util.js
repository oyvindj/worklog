export const getAuthHeader = () => {
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  }
  return headers
}
