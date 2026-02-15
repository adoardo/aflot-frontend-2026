import axios from 'axios'
import jsonpApapter from 'axios-jsonp'

const BASE_URL_OAUTH = 'https://oauth.vk.com/',
      BASE_URL = 'https://api.vk.com/',
      VERSION = '5.21',
      FRIENDS_N = 5

function getParamsObj (url) {
  let s = url.split('#')
  if (s.length < 2 || s[1] === '') return s[0]
  let params = s[1]
  params = params.split('&')
  let res = {}
  params.forEach( el => {
    let val = el.split('=')
    if (val.length < 2) res[val[0]] = ''
    else res[val[0]] = val[1]
  })
  return res
}

function sendRequest (base, path, params) {
  let config = {
    adapter: jsonpApapter,
    baseURL: base,
    headers: {
      // 'Accept': 'application/json'
      // 'Accept-Encoding': 'deflate, gzip'
    },
    params
    // validateStatus: status => status == 200
  }
  return axios.get(path, config)
}

function getUrlAuth (client_id, redirect_uri) {
  // if (!redirect_uri) redirect_uri = 'http://localhost:3000/auth/'
  if (!redirect_uri) redirect_uri = 'https://тест.афлот.рф'
  let path = "authorize?"
  return BASE_URL_OAUTH + path + `client_id=${client_id}` + '&scope=friends,offline' +
          `&redirect_uri=${redirect_uri}` + '&display=page' + `&v=${VERSION}` + '&response_type=token'
}

async function getFriendsList (user_id, access_token) {
  try {
    let path = "/method/friends.get"
    let params = {
      user_id,
      access_token,
      v: VERSION
    }
    let result = await sendRequest(BASE_URL, path, params)

    return result.data

  } catch (err) {
    return null
  }
}

async function getUsers (access_token, user_ids) {
  try {
    let path = "/method/users.get"
    let params = {
      user_ids,
      // sex, bdate, city, country, home_town, has_photo
      fields: 'photo_id,sex,bdate,country,city,has_photo',
      access_token,
      v: VERSION
    }
    let result = await sendRequest(BASE_URL, path, params)

    return result.data

  } catch (err) {
    return null
  }
}

async function getPhotos (access_token, photo_ids) {
  try {
    let path = "/method/photos.getById"
    let params = {
      photos: photo_ids,
      access_token,
      v: '3.0' // удобная версия для фото
    }
    let result = await sendRequest(BASE_URL, path, params)

    return result.data

  } catch (err) {
    return null
  }
}

async function getFriends (user_id, access_token) {
  try {
    let result = await getFriendsList(user_id, access_token)
    result = result.response

    let user_ids = result.items.slice(0, FRIENDS_N)
    result = await getUsers(access_token, user_ids)
    result = result.response

    let photo_ids = result.map( el => el['photo_id'] || '' ).filter( el => el != '' )
    let photos = await getPhotos(access_token, photo_ids)
    photos = photos.response
    result.forEach( el => {
      let photo = photos.find( photo => photo.owner_id == el.id )
      if (photo) el.photo_id = photo.src
    })

    return result

  } catch (err) {
    return null
  }
}

export { getUrlAuth, getParamsObj, getFriends }
