import http from "../link.js"
import apiUrl from "../url.js"

export function getAllDiscussion(params) {
    return http(apiUrl.loginUser, "get", {}, params)
}

export function getDiscussionByContent(params) {
    return http(apiUrl.getDiscussionByContent, "get", {}, params)
}

export function removeDiscussion(data) {
    return http(apiUrl.removeDiscussion, "delete", data, {})
}

export function updateDiscussion(data) {
    return http(apiUrl.updateDiscussion, "put", data, {})
}