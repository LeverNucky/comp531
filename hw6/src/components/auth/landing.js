import React from 'react'
import { connect } from 'react-redux'
import Login from './login'
import Register from './register'

let Messages = ({error, success}) => (
    <div className="row">
        { error.length == 0 ? '' :
            <div className="alert alert-danger">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="errorMessage">{ error }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
        { success.length == 0 ? '' :
            <div className="alert alert-success">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="successMessage">{ success }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
    </div>
)
Messages = connect((state) => {
    return { error: state.common.error, success: state.common.success }
})(Messages)

const Landing = () => (
    <div>
        <div className="container">
            <div className="jumbotron text-center">
                <h1>Welcome to RiceBook</h1>
            </div>
            <Messages/>
            
            <Register />
            <Login />
        </div>
    </div>
)

export default Landing