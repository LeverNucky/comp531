import React from 'react'
import {connect} from 'react-redux'
import {login} from './authActions'

const Login = ({dispatch})=> {
    let username, password
    return (
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
            <h2>Log In</h2>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" >Username</label>
                <div className="col-sm-6">
                    <input className="form-control" id="login_username" type="text" ref={(node) => {username = node} }/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 form-control-label" >Password</label>
                <div className="col-sm-6">
                    <input className="form-control" id="login_password" type="password" ref={(node) => {password = node} }/>
                </div>
            </div>
            <input type="submit" className="btn-success" id="login_btn" value="Log In" onClick={() => {dispatch(login(username.value, password.value))}} />
        </div>
    )
}


export default connect()(Login)