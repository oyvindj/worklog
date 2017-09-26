export const getNameFromList = (id, list) => {
  for (const item of list) {
    if (item.id === id) {
      return item.name
    }
  }
  return 'undefined'
}
