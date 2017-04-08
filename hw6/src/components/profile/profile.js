import React from 'react'
import {connect} from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'

let Messages = ({error, success}) => (
    <div className="row">
        <div className="col-sm-10">
            { error.length == 0 ? '' :
                <div className="alert alert-danger">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10" id="error_Message">{error}</div>
                    <div className="col-sm-1"></div>
                    <div className="row">&nbsp;</div>
                </div>
            }
            { success.length == 0 ? '' :
                <div className="alert alert-success">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10" id="success_Message">{success}</div>
                    <div className="col-sm-1"></div>
                    <div className="row">&nbsp;</div>
                </div>
            }
        </div>
        <div className="col-sm-2">&nbsp;</div>
    </div>
)


Messages = connect(
    (state) => {
        return {
            error: state.common.error,
            success: state.common.success,
        }
    }
)(Messages)

const Profile = () => {
    return (
        <div>
            <div className="container">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <Avatar/>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                    <Messages/>
                    <ProfileForm/>
                </div>
            </div>
        </div>
    )
}
export default Profile