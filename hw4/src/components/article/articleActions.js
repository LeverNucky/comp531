import Action, { resource } from '../../actions'

const _articles = require('../../data/articles.json')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function fetchArticles() {
	return (dispatch, getState) => {
		const articles = _articles['articles'].reduce((o,v) => {
			v.date=new Date(v.date).toString()

			o[v._id] = v
			return o
		}, {})

		dispatch({ type: Action.UPDATE_ARTICLES, articles})

		const avatars = getState().articles.avatars
		_articles.avatars.forEach((s) => {
			if (avatars[s.username]!=undefined){
				avatars[s.username] = s.avatar
			}
		})
		dispatch({ type: Action.UPDATE_AVATARS, avatars })
	}
}

export function uploadArticle(message, file) {
	return (dispatch,getState) => {
		var d=new Date().toString()
		const new_article={"_id":getRandomInt(1000000,9999999),"text":message,"date":d,"img":null,"comments":[],"author":getState().profile.username}
		dispatch({ type: Action.ADD_ARTICLE, article:new_article})
			
	}
}


export function searchKeyword(keyword) {
	return { type: Action.SEARCH_KEYWORD, keyword }
}
