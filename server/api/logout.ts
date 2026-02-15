import { defineEventHandler, getCookie, setCookie } from 'h3'

export default defineEventHandler(event => {
    // Read counter cookie
    let counter = getCookie(event, 'counter') || 0

    // Increase counter cookie by 1
    setCookie(event, 'counter', ++counter)
    setCookie(event, 'stel_token', 1)
    deleteCookie(event, 'stel_token', {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
    })

    // Send JSON response
    return { counter }
})