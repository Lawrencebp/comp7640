import axios from "axios";
import { ElLoading } from 'element-plus'
import {ElMessageBox} from "element-plus";

const options = {
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
}

const request = axios.create({
    baseURL: 'http://111.230.95.185/',
    timeout: 3000,
});


// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    ElLoading.service(options)
    config.headers.contentType = 'application/json'
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    ElLoading.service(options).close()
    return response.data;
}, function (error) {
    // ElLoading.service(options).close()
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElLoading.service(options).close()
    ElMessageBox.alert(error.message, 'Error', {
        confirmButtonText: 'EXIT',
    })
    return Promise.reject(error);
});

export default request
