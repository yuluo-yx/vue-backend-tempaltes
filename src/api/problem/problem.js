import http from "../link.js"
import apiUrl from "../url.js"

export function getAllProblem(params) {
    return http(apiUrl.loginUser, "get", {}, params)
}

export function getProblemByContent(params) {
    return http(apiUrl.getProblemByContent, "get", {}, params)
}

export function removeProblem(data) {
    return http(apiUrl.removeProblem, "delete", data, {})
}

export function insertProblem(data) {
    return http(apiUrl.insertProblem, "post", data,{})
}

export function updateProblem(data) {
    return http(apiUrl.updateProblem, "put", data, {})
}
