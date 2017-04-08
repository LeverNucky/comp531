import React from 'react'
import { connect } from 'react-redux'

import { updateProfile } from './profileActions'



const ProfileForm= ({dispatch,oldZipcode,oldDob,oldPw,oldEmail})=>{
    let payload={}

    const GetFormattedDate=(dob)=>{
        const Dob = new Date(dob);
        const month = Dob.getMonth() + 1;
        const day = Dob.getDate();
        const year = Dob.getFullYear();
        return month + "/" + day + "/" + year;
    }   
    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-body">
                    <p>Current Info:</p>
                    <span>
                        <p id="current_dob">Date of Birth: {GetFormattedDate(oldDob)}</p>
                        <p id="current_email">Email Address: {oldEmail}</p>
                        <p id="current_zipcode">Zipcode: {oldZipcode}</p>
                    </span>
                </div>
                
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                
            }}>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Email</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="profile_email" type="text" placeholder={oldEmail} pattern="[^@]+@[^@]+\.[^@]+" 
                               ref={(node) => payload.email = node }/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Zipcode</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="profile_zipcode" type="text" placeholder={oldZipcode} pattern="[\d]{5}" 
                               ref={(node) => payload.zipcode = node }/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Password</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="profile_pw" type="text" placeholder={oldPw}
                               ref={(node) => payload.pw = node }/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Password Confirmation</label>
                    <div className="col-sm-6">
                        <input className="form-control" id="profile_pwconf" type="text" placeholder={oldPw}
                               ref={(node) => payload.pwconf = node }/>
                    </div>
                </div>

                <div className="form-group row">
                    <span className="col-sm-3 form-control-label"></span>
                    <div className="col-sm-9">
                        <button className="btn btn-primary" id="profile_update_btn" type="submit" onClick={() => {dispatch(updateProfile(payload))}}>Update</button>
                    </div>
                </div>
                
            </form>
        </div>
    )
}


export default connect(
    (state) => {
        return {
            oldZipcode: state.profile.zipcode,
            oldEmail: state.profile.email,
            oldDob: state.profile.dob,
            oldPw: state.profile.password
        }
    }
)(ProfileForm)
