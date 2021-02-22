import request from '../utils/request'



export function getToken(size, page) {
    return request({
      url: 'login',
      method: 'post',
      params: {
        size: size,
        page: page
      }
    })
  }


