import React from 'react'
import {connect} from 'react-redux'
import {updateHeadline} from '../profile/profileActions'


const Headline =({username,headline,avatar,dispatch})=>{
    let newHeadline;
    return (
        <div>
            <div className="well text-center">
                <h3 id="username">{username}</h3>
                    <img className="img-responsive img-rounded centerImg"
                        src={avatar}/>
                    <h4 id="headline">{headline}</h4>
                    <input className="form-control" id="headline" type="text"
                        placeholder="update your headline"
                        ref={ (node) => {newHeadline = node}}/>
                    <div>
                        <input className="btn btn-info btn-md"
                            type="button" value="Update your Headline"
                                onClick={() => {
                                    dispatch(updateHeadline(newHeadline.value))
                                    newHeadline.value = ''
                        }}/>
                    </div>
                </div>
            </div>
        )
}

export default connect(
    (state) => {
        return {
            username: state.profile.username,
            headline: state.profile.headline,
            avatar: state.profile.avatar
        }
    }
)(Headline)
