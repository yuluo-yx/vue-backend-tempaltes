export function CkUsername(data) {
    //用户名正则，4到12位 只能是字母（大小写敏感），数字，下划线，不能以下划线开头和结尾
    let reg = /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/;
    return !reg.test(data) ? true : false
}

export function CkPassword(data) {
    //正则验证密码 6-15位的字母+数字
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/;
    return !reg.test(data) ? true : false
}

export function CkEmail(data) {
    // 使用正则进行验证
    let reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/

    return !reg.test(data) ? true : false
}