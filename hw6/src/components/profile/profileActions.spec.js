import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import {fetchProfile,updateHeadline} from './profileActions'

describe('Validate Profile actions (mocked requests)', ()=> {
    let Action, resource, url , Reducer
    beforeEach(() => {
        if(mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        Action = require('../../actions').default
        resource = require('../../actions').resource
        url = require('../../actions').apiUrl
        Reducer = require('../../reducers').default
    })

    afterEach(() => { 
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it("should fetch the user's proile information", (done)=>{
        mock(`${url}/zipcode`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{zipcode:'zipcode'}
        })
        mock(`${url}/email`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{email:'email'}
        })
        mock(`${url}/dob`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{dob:'dob'}
        })

        mock(`${url}/avatars`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{avatar:'avatar'}
        })
        let count = 4
        fetchProfile()((action) => { 
            try{
                if(action.zipcode){
                    expect(action.zipcode).to.eql('zipcode');
                }
                else if(action.dob){
                    expect(action.dob).to.eql('dob');
                }
                else if(action.avatar){
                    expect(action.avatar).to.eql('avatar');
                }
                else if(action.email){
                    expect(action.email).to.eql('email');
                }
                count--;
            }catch(e){
                done(e);
            }
        })
        expect(count).to.eql(0)
        done()
    })

    
    it('should update headline',(done)=> {
        const username = 'qw13'
        const headline = 'This is a new headline.'

        
        mock(`${url}/headline`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json: {headline}
        })

        resource('PUT','headline',{headline})
        .then((r)=>{
            expect(r.headline).to.eql(headline)
        })
        .then(done)


        
    })
})