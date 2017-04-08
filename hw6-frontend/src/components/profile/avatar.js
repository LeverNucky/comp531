import React from 'react'
import {connect} from 'react-redux'

import {uploadImage} from './profileActions'


const Avatar=({avatar,dispatch})=>{

    let fd = new FormData()

    const handleImageChange = (e) => {
        let file = e.target.files[0]
        fd.append('image', file)
    }
    return (
        <div>
            <img className="img-responsive" width="100%" src={avatar}/>
            <label className="btn btn-warning btn-file">
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)}/>
            </label>
            <input className="btn btn-primary" type="button" value="Upload" onClick={() => {
                dispatch(uploadImage(fd))
            }}/>
        
        </div>
    )
}

export default connect(
    (state) => {
        return {
            avatar: state.profile.avatar
        }
    }
)(Avatar)