import axios from 'axios';
import { notification } from 'antd';

export interface Res<T> {
  code: number;
  msg: string;
  data: T;
}

// 创建axios实例
const serveice = axios.create({
  baseURL: '',
  timeout: 60 * 1000
});

// 请求拦截
serveice.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    }
);

// 响应拦截
serveice.interceptors.response.use(
    (response) => {
      const data = response.data;
      if (data.code !== 0) {
        notification.error({
          type: 'error',
          message: '请求错误 code: < ' + data.code + ' >',
          description: data.msg || '请求错误， 请稍后在试',
          duration: 3
        });
        return Promise.resolve(false);
      }
      return data;
    },
    (error) => {
      notification.error({
        type: 'error',
        message: '请求错误 code: < ' + error.response.status + ' >',
        description: '请求错误， 请稍后在试',
        duration: 3
      });
      return Promise.resolve(false);
    }
);

// post请求
export function axiosPost(url: string, data: any): Promise<Res<any>> {
  return serveice.post<any, Res<any>>(url, data);
}

export default serveice;
