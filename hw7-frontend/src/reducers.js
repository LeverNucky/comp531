import { combineReducers } from 'redux'
import Action from './actions'

export function followers(state = { followers: {} }, action) {
    switch(action.type) {
        case Action.UPDATE_FOLLOWERS:
            return { ...state, followers: action.followers};
        default:
            return state
    }
}

export function articles(state = { articles: {}, searchKeyword: '', avatars: {} }, action) {
    switch(action.type) {
        case Action.ADD_ARTICLE:
            const articles = { ...state.articles }
            articles[action.article['_id']] = action.article
            return { ...state, articles }
        case Action.UPDATE_ARTICLES:
            return {...state,
                articles:Object.keys(action.articles).map((_id)=> action.articles[_id])
                .map((article)=>({...article,
                    showComments:false,
                    showAddcomment:false,
                    editMode:false,
                    comments:!article.comments?[]:article.comments.sort((a,b)=>{
                        if (new Date(a.date) < new Date(b.date))
                            return 1
                        if (new Date(a.date) > new Date(b.date))
                            return -1
                        return 0
                    }) 
                }))};

        case Action.TOGGLE_SHOW_ADD_COMMENT:
            return {...state,articles:state.articles.map((article)=>{
                return {...article,
                    showAddcomment:article._id===action._id?!article.showAddcomment:article.showAddcomment}
        })}
        case Action.TOGGLE_SHOW_COMMENTS:
            return {...state,articles:state.articles.map((article)=>{
                return {...article,
                    showComments:article._id==action._id?!article.showComments:article.showComments}
            })}
        case Action.TOGGLE_EDIT_MODE:
            return {...state,articles:state.articles.map((article)=>{
                return {...article,
                    editMode:article._id==action._id?!article.editMode:article.editMode}
            })}
        case Action.UPDATE_AVATARS:
            return { ...state, avatars: action.avatars }
        case Action.SEARCH_KEYWORD:
            return { ...state, searchKeyword: action.keyword }
        default:
            return state
    }
}

export function profile(state = { username:'', headline: '', avatar: '', zipcode: '', email: '', dob: '',password: ''}, action) {
    switch (action.type) {
        case Action.LOGIN:
            return {...state, username: action.username, password: action.password}
        case Action.LOGOUT:
            return {...state, username: ''}
        case Action.UPDATE_PROFILE:
            if (action.headline) return { ...state, headline: action.headline }
            if (action.avatar) return { ...state, avatar: action.avatar }
            if (action.zipcode) return { ...state, zipcode: parseInt(action.zipcode) }
            if (action.email) return { ...state, email: action.email }
            if (action.dob) return {...state, dob: action.dob}
            if (action.name) return {...state, username: action.name}
            if (action.password) return {...state, password: action.password}
        default:
            return state
    }
}

export function common(state = { error:'', success:'', location:'' }, action) {
    const clean = { error: '', success: '' }
    switch (action.type) {
        case Action.SUCCESS:
            return { ...state, ...clean, success: action.success }
        case Action.ERROR:
            return { ...state, ...clean, error: action.error }
        case Action.NAV_PROFILE:
            return { ...state, ...clean, location: 'profile'}
        case Action.NAV_MAIN:
            return { ...state, ...clean, location: 'main' }
        case Action.NAV_LANDING:
            return { ...state, ...clean, location: 'landing' }
        default:
            return { ...state, ...clean }
    }
}
//reducers
export const Reducer = combineReducers({
    articles, profile, followers, common
})

export default Reducer