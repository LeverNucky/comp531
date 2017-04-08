import { expect } from 'chai'
import mockery from 'mockery'
import fetch,{mock} from 'mock-fetch'
import {updateSuccess,updateError,navToProfile,navToMain,navToLanding} from './actions'
describe('Validate Action',()=>{
    let resource,url,Action,common

    beforeEach(()=>{
        if(mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        resource = require('./actions').resource
        url  = require('./actions').apiUrl
        Action = require('./actions').default
        common = require('./reducers').common
    })
    afterEach(()=>{
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }       
    })
    it('resource should be a resource (i.e., mock a request)',(done)=>{
        mock(`${url}/test`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: {hello:'world'}
        })
        resource('GET','test').then((r)=>{
            expect(r.hello).to.eql('world')
        }).then(done)
        .catch(done)
    })
    it('resource should give me the http error',(done)=>{
        resource('GET','random_stuff').catch((err)=>{
            expect(err).to.exist
        }).then(done)
        .catch(done)
    })
    it('should update error message (for displaying error mesage to user)',()=>{
        const errorMsg = 'error message'
        const action = {
            type: Action.ERROR,
            error: errorMsg
        }
        expect(updateError(errorMsg)).to.eql(action)
    })
    it('should update success message (for displaying success message to user)',()=>{
        const successMsg = 'success message'
        const action = {
            type: Action.SUCCESS,
            success: successMsg
        }
        expect(updateSuccess(successMsg)).to.eql(action)
    })
    it('Test Actions: should navigate (to profile, main, or landing)',()=>{
        expect(navToMain()).to.eql({type: Action.NAV_MAIN})
        expect(navToLanding()).to.eql({type: Action.NAV_LANDING})
        expect(navToProfile()).to.eql({type: Action.NAV_PROFILE})
        expect(common(undefined,navToMain())).to.eql({location:'main', error:'', success:''})
        expect(common(undefined,navToLanding())).to.eql({location:'landing', error:'', success:''})
        expect(common(undefined,navToProfile())).to.eql({location:'profile', error:'', success:''})
    })
})