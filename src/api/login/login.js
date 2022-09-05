import http from "../link.js"
import apiUrl from "../url.js"

export function loginUser(user) {
    return http(apiUrl.login, "post", user, {})
}

export function logoutUser() {
    // 消除掉所有的token
    // console.log("logout")
    localStorage.removeItem("token");
}
