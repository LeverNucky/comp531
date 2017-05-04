require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")
require('./style.css')

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import thunkMiddleware from 'redux-thunk'

import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import App from './components/app'
import {initialMainView} from './components/auth/authActions'



let store = createStore(Reducer, applyMiddleware(thunkMiddleware))

store.dispatch(initialMainView())

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)


