import Cookies from 'js-cookie'

const EXPIRES = 1 // cookie保存天数

export const setCookie = (key, value) => {
    Cookies.set(key, value, { expires: EXPIRES })
}
export const getCookie = key => {
    return Cookies.get(key) || false
}
