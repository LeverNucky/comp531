import React from 'react'
import { connect } from 'react-redux'
import {updateComment} from './articleActions'

const Comment= ({dispatch,id,articleId,author,date,avatar,text,editable})=>{
    let newMessage
    return (
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-8">
                <h4>
                    <img className="followingImage" src={ avatar }/>
                    {author} commented
                    on {date}
                </h4>
                <div className="media-body" contentEditable={editable} onInput={(e) => {newMessage = e.target.innerHTML}}>
                    {text}
                </div>
                <button style={editable?{display:'block'}:{display:'none'}} 
                    type="button" className="btn btn-green" onClick={(e)=>{
                    dispatch(updateComment(articleId,newMessage,id))
                }}>
                    Update Comment
                </button>
            </div>
        </div>
    )
}


export default connect()(Comment)