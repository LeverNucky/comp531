import React from 'react'
import { connect } from 'react-redux'

import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'
import Nav from './main/nav'

const App = ({location}) => {
    let view
    if (location == 'main') {
        view = <Main />
    } else if (location == 'profile') {
        view = <Profile />
    } else {
        view = <Landing />
    }
    return (
        <div>
            <Nav/>
            { view }
        </div>
    )
}

export default connect((state) => {
    return { location: state.common.location }
})(App)