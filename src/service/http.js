//axios code starts here!
import axios from 'axios'

axios.interceptors.request.use(config => {
    // 预处理？
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
}, error => {
    // pao chu cuo wu
    return Promise.reject(error)
})
// create interceptors
axios.interceptors.response.use(response => {
    //yuchuli?
    return response.data
}, error => {
    const { response } = error
    if (response) {
        switch (response.status) {
            case 401:
                break
            case 403:
                break
            case 404:
                break
        }
    } else {
        if (!window.navigator.onLine) {
            // Client offline
            return
        }
    }
    return Promise.reject(error)
})
// Create axios default
export default function (url, {
    method = 'get',
    baseURL = 'localhost',
    timeout = 5000,
    data = {},
    headers = {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType = 'json'
}) {
    const config = {
        method: 'get',
        url: 'localhost',
        timeout: 5000,
        withCredentials: true,
        data: {},
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        responseType: 'json'
    }
    return axios(config)
}