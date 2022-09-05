// 封装数相关据请求
import service from "../util/service.js"

/**
 * 请求封装
 * @param {*} url     请求地址
 * @param {*} method  请求方法
 * @param {*} data    请求数据，在请求体中，用于非get请求中，post，delete，put
 * @param {*} params  请求数据，跟在url后面 用于get
 * @returns 
 */
let http = (url, method="get", data, params) => {
    // Promise 是对异步操作进行封装并返回其结果的构造函数  不是所有的浏览器都支持promise
    // 两个参数为成功和失败
    return new Promise((resolve, reject)=>{
        service.request({
            // 在ES6中，键值相同时，可以省略
            // url: url,
            url,
            // 给method设定默认值为get
            method: method,
            data: data,
            params: params
        }).then((ok)=>{
            // 成功之后可以使用reserve接受
            resolve(ok)
        }).catch((err)=>{
            // console.log(err);
            // 失败使用reject接受
            reject(err)
        })
    })
}

// 暴露当前的link
export default http