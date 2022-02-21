import axios from 'axios'
// 引入进度条
// 将js文件解释为ts文件
import 'nprogress/nprogress.css'
import nprogress from 'nprogress';

interface params {
  type: {
    type: string,
    default: 'get'
  }
}

interface AxiosRequest {
  url: string,
  params?: params
}

interface AxiosReponse {
  data: any;
  headers: any;
  request?: XMLHttpRequest;
  status: number;
  statusText: string;
  config: any;
}

export default function(option: AxiosRequest) {
  return new Promise((resolve, reject) => {

    const instance = axios.create({
      baseURL: 'http://39.98.123.211/api',
      timeout: 5000
    })

    instance.interceptors.request.use(config => {
      nprogress.start()
      return config
    }, err => {
      console.log(err);
    })

    instance.interceptors.response.use(res => {
      nprogress.done()
      return res
    }, err => {
      console.log(err);
      if (err && err.response) {
        switch (err.response.status) {
          case 400: 
            err.message = '请求错误'
            break
          case 401: 
            err.message = '未授权访问'
            break
          default:
            err.meesage = '其他错误'
        }
      }
      return err
    })

    instance(option).then((res: AxiosReponse) => {
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}