import axios from 'axios'
import localStorage from 'function/localstorage'

export default function request(config, method) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000',
      timeout: 3000
    })
    
    instance.interceptors.request.use(req => {
      let token = localStorage.getLocalStorage('token')
      if(token) {
        req['token'] = token
      }
      return req
    }, err => {
      console.log(err);
    })

    instance.interceptors.response.use(res => {
      return res.data
    }, err => {
			console.log('来到了response拦截failure中');
      console.log(err);
      if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
		})

    instance(config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}