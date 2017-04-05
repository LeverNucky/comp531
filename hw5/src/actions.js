import fetch from 'isomorphic-fetch'

export const apiUrl = 'https://webdev-dummy.herokuapp.com'

const Action = {

    ADD_ARTICLE: 'ADD_ARTICLE',
    UPDATE_ARTICLES: 'UPDATE_ARTICLES',

    SEARCH_KEYWORD: 'SEARCH_KEYWORD',

    UPDATE_AVATARS: 'UPDATE_AVATARS',
    UPDATE_HEADLINE: 'UPDATE_HEADLINE',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    ADD_FOLLOWER: 'ADD_FOLLOWER',
    REMOVE_FOLLOWER: 'REMOVE_FOLLoWER',

    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS',

    NAV_PROFILE: 'NAV_PROFILE',
    NAV_MAIN: 'NAV_MAIN',
    NAV_LANDING: 'NAV_LANDING',

    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'

}

export default Action

export function updateError(error) { return { type: Action.ERROR, error }}
export function updateSuccess(success) { return { type: Action.SUCCESS, success }}
export function navToProfile() { return { type: Action.NAV_PROFILE }}
export function navToMain() { return { type: Action.NAV_MAIN }}
export function navToLanding() { return { type: Action.NAV_LANDING }}
