import { expect } from 'chai'
import mockery from 'mockery'
import fetch from 'mock-fetch'
import {filterArticles} from './components/article/articlesView'
describe('Validate Reducer',()=>{
    let resource,url,Action,Reducer,followers, profile, common,articles;

    beforeEach(()=>{
        if(mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        resource = require('./actions').resource
        url  = require('./actions').apiUrl
        Action = require('./actions').default
        Reducer = require('./reducers').default
        common = require('./reducers').common
        followers = require('./reducers').followers
        profile = require('./reducers').profile
        articles = require('./reducers').articles
    })
    afterEach(()=>{
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }       
    })
    it('should initialize state',()=>{
        expect(Reducer(undefined,{})).to.eql({
            common:{location:'', error:'', success:''},
            followers:{followers: {}},
            profile:{username:'', headline:'', avatar:'', zipcode:'', email:'',dob:'',password: ''},
            articles:{articles: {}, searchKeyword: '', avatars: {}}
        })
    })
    it('should state success (for displaying success message to user)',()=>{
        expect(common(undefined,{type:Action.SUCCESS,success:"My success msg"}))
        .to.eql({location:'', error:'', success:"My success msg"})
    })
    it('should state error (for displaying error message to user)',()=>{
        expect(common(undefined,{type:Action.ERROR,error:"My error msg"}))
        .to.eql({location:'', error:'My error msg', success:''})
    })
    it('should set the articles',()=>{
        expect(articles(undefined,{type:Action.UPDATE_ARTICLES,
            articles:{1:{_id:1, text:'hello world!', author:'qw13',date:'Tue Mar 24 2015 19:00:00 GMT-0500 (CDT)'}}}))
        .to.eql({articles:[{_id:1, text:'hello world!', author:'qw13',date:'Tue Mar 24 2015 19:00:00 GMT-0500 (CDT)',showComments:false,showAddcomment:false,
editMode:false,comments:[]}],searchKeyword: '', avatars: {}})
    })
    it('should set the search keyword',()=>{
        expect(articles(undefined,{type:Action.SEARCH_KEYWORD,keyword:"Keyword Test"}))
        .to.eql({articles:{},searchKeyword:'Keyword Test',avatars: {}})
    })
    it('should filter displayed articles by the search keyword',()=>{
        const articles = [{_id:1, text:'test1', author:'qw13', date:'Tue Mar 24 2015 19:00:00 GMT-0500 (CDT)'},
                          {_id:2, text:'test2', author:'seq1', date:'Tue Mar 24 2015 19:00:00 GMT-0500 (CDT)'}]
        const keyword = 'qw13'
        expect(filterArticles(articles,keyword)).to.eql([{_id:1, text:'test1', author:'qw13', date:'Tue Mar 24 2015 19:00:00 GMT-0500 (CDT)'}]);
    })
})