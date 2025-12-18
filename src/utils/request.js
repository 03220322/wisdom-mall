import axios from 'axios';
import { Toast } from 'vant';
import store from '@/store';
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'h5' },
});

// 添加请求拦截器
// 用实例化出来的instance实例，可以避免不同的axios请求互不污染
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
      message: '加载中...',
      forbidClick: true, // 背景不可点击
      loadingType: 'spinner',
      duration: 0, // 持续展示 toast
    });

    // 只要有token，就在请求时携带，便于请求像购物车这样的接口
    const token = store.getters.token;
    if (token) {
      config.headers['Access-Token'] = token;
      config.headers.platform = 'H5';
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    Toast.clear();
    // 默认axios会多封装一层（这里对返回的response进一步封装，减少数据深度)
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 最后别忘了导出实例
export default instance;
