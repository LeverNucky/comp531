import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import {fetchArticles,searchKeyword} from './articleActions'

describe('Validate Article actions', ()=> {
    
    let Action, resource, url, Reducer 
    
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


    it('should fetch articles (mocked request)', (done)=>{
        mock(`${url}/articles`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{articles:[]}
        })
        

        resource('GET', 'articles')
        .then((res) => {
            expect(res).to.eql({articles:[]})
        })
        .then(done)
        .catch(done)
       
    })

    it('should update the search keyword',()=> {
        const searchWord = 'hello'
        
        let state = undefined
        const dispatch = (action) => {
            state = Reducer(state, action)
        }
        dispatch(searchKeyword(searchWord))
        expect(state.articles.searchKeyword).to.eql('hello')
        
    })
})