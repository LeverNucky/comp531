import React from 'react'
import { connect } from 'react-redux'
import Comment from './comment'
import {toggleEditMode,toggleShowAddComment,toggleShowComments,updateArticle,updateComment} from './articleActions'

export const Article = ({dispatch,username,_id,avatar,author,date,text,img,comments,editMode,showComments,showAddcomment})=>{	
	let newArticle,newComment
	return(
		<div>
			<div className="well">
				<h4>
	                <img className="followingImage" src={ avatar } />
	                <div className="article_author">
	                	{author} posted on {date}
	                </div>
	            </h4>

				{img===undefined ||img===null ? '':<img src={img} className="img-responsive img-rounded centerImg"/>}
				<div contentEditable={editMode} onInput={(e)=>{
      				newArticle=e.target.innerHTML
                }} className="article-text">
					{text}
				</div>
				<div className="text-center">
					<button type="button" className="btn btn-warning edit_post_btn"
							style={(username===author)?{}:{display:'none'}}
							
							onClick={() => {
								if (editMode){
									dispatch(updateArticle(_id,newArticle))
								}
								else{
									dispatch(toggleEditMode(_id))
								}
							}}>{editMode?"Post":"Edit"}</button>
					<button type="button" className="btn btn-success" onClick={() => {dispatch(toggleShowAddComment(_id))}}>
						Add a comment
					</button>
					<button type="button" className="btn btn-info" onClick={()=>{dispatch(toggleShowComments(_id))}}>
						{!showComments?"Show comments ("+comments.length+")":"Hide comments"}
					</button>
				</div>

				
				<div style={showAddcomment?{}:{display:'none'}}>
					<textarea className="newPostText"
								cols="80" rows="4" placeholder="your comment"
								onChange={(e) => {
									newComment = e.target.value
		           
							  }}>
		            </textarea>
		            <button type="button" className="btn btn-success btn-blue" onClick={(e)=>{
                        dispatch(updateComment(_id,newComment))


                    }}>Post Comment</button>

	            </div>
	            {!showComments?'':comments.map((comment)=>
					<Comment key={comment.commentId} avatar={comment.avatar} id={comment.commentId} articleId= {_id} editable={username===comment.author} author={comment.author} date={comment.date} text={comment.text}/>
					)
				}
			</div>
		</div>
	)
	
}

export default connect((state)=>{
	return {username:state.profile.username }
})(Article)