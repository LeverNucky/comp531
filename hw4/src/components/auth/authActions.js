import Action, { resource, updateError, navToMain, navToLanding } from '../../actions'

import { fetchFollowers } from '../main/followingActions'
import { fetchArticles } from '../article/articleActions'
import { fetchProfile } from '../profile/profileActions'

export function initialMainView() {
    return (dispatch) => {
        //Initialize before entering main page
        dispatch(navToMain())
        dispatch({type: Action.UPDATE_HEADLINE,
            headline: "Default headline"
        })
        dispatch(fetchProfile())
        dispatch(fetchFollowers())
        dispatch(fetchArticles())
    }
}

export function login(username, password) {
    return (dispatch) => {
        //Log In, allow any non-empty username and password now
        if (username && password){
            dispatch({type: Action.LOGIN, username: username})
            dispatch(initialMainView())
        }
        else{
            dispatch(updateError('Missing username or password when logging in'))
        }
    }
}

export function logout() {
    return (dispatch) => {
        //Log out
        dispatch({type:Action.LOGOUT})
        dispatch(navToLanding())   
    }
}