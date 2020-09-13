import { HttpClient } from './http.service';
import { APIPath, USER_TOKEN } from '../utilities/constants';

const BASE_URL = `${APIPath}`;
const headersConfig = () => ({
  'x-auth': localStorage.getItem(USER_TOKEN),
  'content-type': 'application/json'
});


const headersConfigForFormData = () => ({
  'x-auth': localStorage.getItem(USER_TOKEN),
  'content-type': 'multipart/form-data'
});



const callLogin = (data) => {
  return HttpClient.post(`${BASE_URL}/login`, data, { headers: headersConfig() }).then(res => {
    localStorage.setItem(USER_TOKEN, res.data.token)
    return Promise.resolve(res)
  }).catch(err => {
    return Promise.reject(err.response.data)
  })
};

const callRegister = (data) => {
  return HttpClient.post(`${BASE_URL}/register`, data, { headers: headersConfig() }).then(data => {
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err.response)
  })
};

const callLogout = () => {
  return HttpClient.delete(`${BASE_URL}/logout`, { headers: headersConfig() }).then(data => {
    localStorage.clear()
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err.response)
  })
};

const fileList = () => {
  return HttpClient.post(`${BASE_URL}/files/list`, {}, { headers: headersConfig() }).then(res => {
    return Promise.resolve(res.data)
  }).catch(err => {
    return Promise.reject(err.response)
  })
}

const uploadFile = data => {
  return HttpClient.post(`${BASE_URL}/files/upload`, data, { headers: headersConfigForFormData() }).then(res => {
    return Promise.resolve(res.data)
  }).catch(err => {
    return Promise.reject(err.response)
  })
}


export const ApiService = {
  callLogin,
  callRegister,
  callLogout,
  fileList,
  uploadFile,
};
