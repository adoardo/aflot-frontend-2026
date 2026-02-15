function storeData (user_id, access_token) {
  localStorage.setItem("id", user_id)
  localStorage.setItem("token", access_token)
}

function getData() {
  let result = { user_id: null, access_token: null }
  result.user_id = localStorage.getItem("id")
  result.access_token = localStorage.getItem("token")
  return result
}

export { storeData, getData }
