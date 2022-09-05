// 拦截器
import axios from "axios"
import { ElMessage } from "element-plus"

// 根据当前启动的环境不同，自动挂载url地址
let axiosUrl = ''
// process.env.NODE_ENV获取当前启动的环境
if (process.env.NODE_ENV === "development") {
    console.log(process.env.VUE_APP_API_URL)
    axiosUrl = process.env.VUE_APP_API_URL
} else {
    // 其他环境
}

// 创建axios实例
const service = axios.create({
    baseURL: axiosUrl
})

// 请求拦截
//Request请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做点什么

    //判断token是否存在
    // if (localStorage.getItem('token') != null) {
    //     // 在请求头中添加token
    //     config.headers.Authorization = localStorage.getItem('token')
    // }

    return config;
}, function (error) {
    return Promise.reject(error);
})

// Response响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么

    // 在接受到响应的时候做一些操作
    switch (error, response.status) {
        case 404:
            ElMessage.error("当前路径错误！")
            break;
        case 500:
            ElMessage.error("服务器连接失败！")
            break;
        default:
            ElMessage.error("未知错误！")
            break;

    }

    return Promise.reject(error);
});

// js文件一定要导出 导出service
export default service
