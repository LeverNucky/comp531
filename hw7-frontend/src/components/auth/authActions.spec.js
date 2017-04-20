import { expect } from 'chai'
import mockery from 'mockery'
import fetch,{mock} from 'mock-fetch'
import {login,logout} from './authActions'

describe('Validate Authentication',()=>{
    let resource,url,Action, Reducer

    beforeEach(()=>{
        if(mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        resource = require('../../actions').resource
        url  = require('../../actions').apiUrl
        Action = require('../../actions').default
        Reducer=require('../../reducers').default
    })
    afterEach(()=>{
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }       
    })
    it('should not log an user with wrong password and username',(done)=>{
        const username = "qw13"
        const password = "random_stuff"
        login(username,password)((action)=>{
            try{
                expect(action.type).to.eql(Action.ERROR)
                expect(action.error).to.eql('Invalid login')
                done()
            }catch(e){
                done(e)
            }
        })      
    })
    it('should log in a user',(done)=>{
        const username = "qw13"
        const password = "west-state-killed"
        let count = 2;
        mock(`${url}/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            json: {username,password}
        })

        login(username,password)((action)=>{
            try{
                if(action.type==Action.LOGIN){
                    expect(action.username).to.eql(username)
                }
                count--;
            }catch(e){
                done(e)
            }
        }).then(()=>{
            expect(count).to.eql(0)
        }).then(done)
        .catch(done)
    })

    it('should log out a user',(done)=>{
        const username = "qw13"
        const password = "west-state-killed"

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json: {password,username}
        })
        mock(`${url}/logout`,{
            method:'PUT',
            headers: {'Content-Type': 'application/json'}
        })
        let state = undefined
        const dispatch = (action) => {
            state = Reducer(state, action)
        }

        login(username, password)(dispatch)
        .then(() => {
            logout()((action)=>{
            })
        })
        .then(done)
        .catch(done)
    })
})