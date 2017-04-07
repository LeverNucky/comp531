import Action, { resource,updateError} from '../../actions'

export function fetchArticles() {
	return (dispatch)=>resource('GET', 'articles')
        .then((response)=>{
            const articles = response.articles.reduce((object,item) => {
            	item.date=new Date(item.date).toString()
                object[item._id] = item;
                return object;
            },{})
            console.log()
           	dispatch({type:Action.UPDATE_ARTICLES, articles});
    })
}

export function uploadArticle(fd) {
	return (dispatch)=>{
        resource('POST','article',fd,false)
        .then((response)=>{
            dispatch(fetchArticles())
        }).catch((err)=>{
            dispatch(updateError(err))
        })
    }
}

export function updateArticle(id,article){
    return (dispatch) => {
        resource('PUT', `articles/${id}`,{'text':article})
        .then(()=>{
            dispatch(fetchArticles())
        })
    }
}

export function updateComment(id,comment,commentId=-1){
    return (dispatch) => {
        resource('PUT', `articles/${id}`,{'text':comment,commentId})
        .then((response)=>{
            dispatch(fetchArticles())
            dispatch(toggleShowComments(id))
        })
        
    }
}

export function toggleShowComments(_id){
        return (dispatch)=>{
            dispatch({type:Action.TOGGLE_SHOW_COMMENTS,_id})
        }
}

export function toggleShowAddComment(_id){
        return (dispatch)=>{
            dispatch({type:Action.TOGGLE_SHOW_ADD_COMMENT,_id})
        }
}

export function toggleEditMode(_id){
        return (dispatch)=>{
            dispatch({type:Action.TOGGLE_EDIT_MODE,_id})
        }
}
export function searchKeyword(keyword) {
	return { type: Action.SEARCH_KEYWORD, keyword }
}
