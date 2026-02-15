// plugins/axios.js
import axios from 'axios';
import { useUsersStoreRefs } from '~/store/useUserStore';

const instance = axios.create({
  baseURL: 'https://апи.афлот.рф/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(config => {
  const { user } = useUsersStoreRefs();
  const token = user.value.access_token

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

instance.interceptors.response.use(response => {
  return response;
}, error => {
  console.log(error,' xz');
  // Обработка ошибок
  if (error.response && error.response.status === 401) {
    // Опционально: Обработка ошибок аутентификации, например, выход из системы
  }
  return Promise.reject(error);
});

export default instance;
