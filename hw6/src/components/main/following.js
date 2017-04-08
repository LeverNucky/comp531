import React from 'react'
import {connect} from 'react-redux'

import {addFollower, delFollower, dispatch} from './followingActions'

const Follower = ({name, avatar, headline, dispatch}) => (
    <div name="follower" className="follower">
        <div>&nbsp;</div>
        <div className="media-left">
            <img className="followingImage" src={ avatar }/>
        </div>
        <div className="media-body">
            <div><h5 color="#02307a" id="follower_name">{ name }</h5></div>
            <div><em>{ headline }</em></div>
        </div>
        <div className="media-right">
            <span className="glyphicon glyphicon-remove follower_rm_btn" onClick={() => {
                dispatch(delFollower(name))
            }}></span>
        </div>
    </div>
)

const Following = ({followers,error,dispatch})=>{
    let newFollower
    return (
        <div>
            <div className="well">
                { 
                    Object.keys(followers).map((f) => followers[f]).map((follower) =>
                    <Follower key={follower.name}
                        name={follower.name} avatar={follower.avatar} headline={follower.headline} dispatch={dispatch}/>
                )}
            </div>
            <div className="well">
                <input className="form-control" type="text"
                        placeholder="add a follower" id="follower_input"
                        ref={(node) => newFollower = node }/>
                
                <input className="btn btn-primary" type="button" id="follower_btn"
                        onClick={() => {
                            if ((newFollower && newFollower.value && newFollower.value.length > 0)){
                                dispatch(addFollower(newFollower.value))
                                newFollower.value = ''
                            }
                        }}
                        value="add follower"/>
                
                { error.length == 0 ? '' :
                    <div className="alert alert-danger">
                        {error}
                    </div>
                }
            </div>
        </div>
    )
}



export default connect(
    (state) => {
        return {
            error: state.common.error,
            followers: state.followers.followers
        }
    }
)(Following)
