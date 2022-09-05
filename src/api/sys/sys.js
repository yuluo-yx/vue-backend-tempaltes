import http from "../link.js"
import apiUrl from "../url.js"

export function getCPUInfo() {
    return http(apiUrl.getCPUInfo, "get", {}, {})
}

export function getMemoryInfo() {
    return http(apiUrl.getMemoryInfo, "get", {}, {})
}

export function getDiskInfo() {
    return http(apiUrl.getDiskInfo, "get", {}, {})
}

export function getJavaAndOSConfig() {
    return http(apiUrl.getJavaAndOSConfig, "get", {}, {})
}

