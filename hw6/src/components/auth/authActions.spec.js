import { expect } from 'chai'
import mockery from 'mockery'
import fetch,{mock} from 'mock-fetch'
import {login,logout} from './authActions'

describe('Validate Authentication',()=>{
    let resource,url,Action

    beforeEach(()=>{
        if(mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        resource = require('../../actions').resource
        url  = require('../../actions').apiUrl
        Action = require('../../actions').default
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
        let count = 0;
        mock(`${url}/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            json: {
                username,result:"success"
            }
        })

        login(username,password)((action)=>{
            try{
                if(action.type==Action.LOGIN){
                    expect(action.username).to.eql(username)
                }
                count++;
            }catch(e){
                done(e)
            }
        }).then(()=>{
            expect(count).to.eql(2)
        }).then(done)
        .catch(done)
    })
    it('should log out a user',(done)=>{
        mock(`${url}/logout`,{
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            json:{text:'OK'}
        })
        let count=1;
        logout()((action)=>{
            try{
                if(action.type==Action.LOGOUT){
                    expect(action.username).to.eql('')
                }
                count--;
            }catch(e){
                done(e)
            }           
        }).then(()=>{
                expect(count).to.eql(0)
        }).then(done).catch(done)
    })
})