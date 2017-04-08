import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.cred = {
    username:'qw13',
    password:'west-state-killed'
}

exports.login = () => 
    sleep(500)
    .then(findId('login_username').clear())
    .then(findId('login_password').clear())
    .then(findId('login_username').sendKeys(exports.cred.username))
    .then(findId('login_password').sendKeys(exports.cred.password))
    .then(findId('login_btn').click())
    .then(sleep(1000))


exports.logout=()=>
    sleep(500)
    .then(findId('logout_btn').click())
    .then(sleep(500))