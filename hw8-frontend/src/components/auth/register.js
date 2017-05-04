import React from 'react'
import { connect } from 'react-redux'
import { registerAction} from './authActions'
const Register = ({dispatch})=>{
    let info = {}
    return (
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
            <h2>Register</h2>
            <form  id="registration_form">
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" >Username</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="username" type="text" ref={(node) => info.username = node } placeholder="username" pattern="[a-zA-Z][a-zA-Z0-9]*" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" >Email</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="email" type="text" ref={(node) => info.email = node } placeholder="a@b.c" pattern="[^@]+@[^@]+\.[^@]+" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" >Zipcode</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="zipcode" type="zipcode" ref={(node) => info.zipcode = node } placeholder="#####" pattern="[\d]{5}" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" >Date of Birth</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="dob" type="text" ref={(node) => info.dob = node } placeholder="01/01/2000" pattern="[\d]{2}/[\d]{2}/[\d]{4}" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" >Password</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="password" type="text" ref={(node) => info.pw = node } placeholder="password" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Confirmation</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="pwconf" type="text" ref={(node) => info.pwconf = node } placeholder="password confirmation" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <span className="col-sm-3 form-control-label"> </span>
                    <div className="col-sm-6">
                        <button className="btn btn-success" id="submitButton" type="submit" onClick={() => {dispatch(registerAction(info))}}>Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}



export default connect()(Register)