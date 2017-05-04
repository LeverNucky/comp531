import React from 'react'
import { connect } from 'react-redux'

import { uploadArticle } from './articleActions'

export const NewArticle=({dispatch})=>{

    let newArticle
    let fd = new FormData()

    const handleImageChange=(e)=>{
        let file = e.target.files[0]
        if (fd.get('image')){
            fd.delete('image')
        }
        fd.append('image', file)
    }

    return (
        <div>
            <div className="well">
                <div>
                    <h5>Post something:</h5>
                    <textarea className="newPostBody" id="newPostBody"
                                cols="80" rows="4" placeholder="Post something here"
                                ref={(node) => {newArticle = node}}>
                    </textarea>
                </div>
                <div>
                    Add an image<input type="file" id="articleImage" accept="image/*" onChange={(e) => handleImageChange(e)}/>
                </div>
                
                <div>
                    <div className="text-right">
                        <input className="btn btn-info" type="button" value="Publish new article" id="newArticle_btn"
                                onClick={() => {
                                    if (fd.get('text')){
                                        fd.delete('text')
                                    }
                                    fd.append('text', newArticle.value)
                                    dispatch(uploadArticle(fd))
                                    newArticle.value = ''
                                    }
                                }
                        />
                    </div>
                </div>
                
            </div>            
        </div>
    )
    
}

export default connect()(NewArticle)
