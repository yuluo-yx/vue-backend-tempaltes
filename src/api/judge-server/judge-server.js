import http from "../link.js"
import apiUrl from "../url.js"

export function getAlljudgeServer(params) {
    return http(apiUrl.getAlljudgeServer, "get", {}, params)
}

export function insertJudgeServe(data) {
    return http(apiUrl.insertJudgeServe, "post", data, {})
}

export function removeJudgeServe(data) {
    return http(apiUrl.removeJudgeServe, "delete", data, {})
}

export function updateJudgeServe(data) {
    return http(apiUrl.updateJudgeServe, "put", data, {})
}
