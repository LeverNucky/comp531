import Action, { resource,updateError} from '../../actions'

//refresh all articles
export function fetchArticles() {
	return (dispatch)=>resource('GET', 'articles')
        .then((response)=>{
            const articles = response.articles.reduce((object,item) => {
            	item.date=new Date(item.date).toString()
                object[item._id] = item;
                return object;
            },{})
           	dispatch({type:Action.UPDATE_ARTICLES, articles});
    })
}

//add article
export function uploadArticle(fd) {
	return (dispatch)=>{
        if (fd.get("image")){
            resource('POST','article',fd,false)
            .then((response)=>{
                dispatch(fetchArticles())
            })
            .catch((err)=>{
                dispatch(updateError(err))
            })
        }
        else{
           
            resource('POST','article',{text:fd.get("text")})
            .then((response)=>{

                dispatch(fetchArticles())
            })
            .catch((err)=>{
                dispatch(updateError(err))
            })
        }
        
    }
}

//update article
export function updateArticle(id,article){
    return (dispatch) => {
        resource('PUT', `articles/${id}`,{'text':article})
        .then(()=>{
            dispatch(fetchArticles())
        })
    }
}
//update comments
export function updateComment(id,comment,commentId=-1){
    return (dispatch) => {
        resource('PUT', `articles/${id}`,{'text':comment,commentId})
        .then((response)=>{
            dispatch(fetchArticles())
            dispatch(toggleShowComments(id))
        })
        
    }
}
//Search Keyword
export function searchKeyword(keyword) {
    return { type: Action.SEARCH_KEYWORD, keyword }
}

// Belows are functions that toggle the attribute of an article

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
