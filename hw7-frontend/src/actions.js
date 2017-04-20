import fetch from 'isomorphic-fetch'

const isLocal = false
export const apiUrl = isLocal ? 'http://localhost:3000' : 'https://ricebookqw13test.herokuapp.com'

const Action = {
    ADD_ARTICLE: 'ADD_ARTICLE',
    UPDATE_ARTICLES: 'UPDATE_ARTICLES',
    TOGGLE_EDIT_MODE: 'TOGGLE_EDIT_MODE',
    TOGGLE_SHOW_ADD_COMMENT: 'TOGGLE_SHOW_ADD_COMMENT',
    TOGGLE_SHOW_COMMENTS: 'TOGGLE_SHOW_COMMENTS',

    SEARCH_KEYWORD: 'SEARCH_KEYWORD',

    UPDATE_AVATARS: 'UPDATE_AVATARS',
    UPDATE_HEADLINE: 'UPDATE_HEADLINE',
    UPDATE_PROFILE: 'UPDATE_PROFILE',

    UPDATE_FOLLOWERS: 'UPDATE_FOLLOWERS',

    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS',

    NAV_PROFILE: 'NAV_PROFILE',
    NAV_MAIN: 'NAV_MAIN',
    NAV_LANDING: 'NAV_LANDING',

    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'

}
export default Action

export const resource = (method, endpoint, payload, isJson=true) => {
    const options = {
        method,
        credentials: 'include'
    }
    if (isJson) options.headers = {'Content-type':'application/json'}
    if (payload) options.body = isJson? JSON.stringify(payload) : payload

    return fetch(`${apiUrl}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                if (r.headers.get('Content-Type').indexOf('json') > 0) {
                    return r.json()
                } else {
                    return r.text()
                }
            } else {
                throw new Error(r.statusText)
            }
        })
}

//global userful functions
export function updateError(error) { return { type: Action.ERROR, error }}
export function updateSuccess(success) { return { type: Action.SUCCESS, success }}
export function navToProfile() { return { type: Action.NAV_PROFILE }}
export function navToMain() { return { type: Action.NAV_MAIN }}
export function navToLanding() { return { type: Action.NAV_LANDING }}
