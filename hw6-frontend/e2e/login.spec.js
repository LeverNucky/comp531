import { expect } from 'chai'
import { go, sleep, findId, findClass, findCSS, By } from './selenium'
import common from './common'


describe('End to End Test On Landing Page', () => {

    before('should log in to the main page', (done) => {
        go().then(done)
    })
    it("should register a new user",(done)=>{
        sleep(500)
        .then(findId("username").clear())
        .then(findId("password").clear())
        .then(findId("email").clear())
        .then(findId("zipcode").clear())
        .then(findId("dob").clear())
        .then(findId("pwconf").clear())
        .then(findId("username").sendKeys('tianwe'))
        .then(findId("email").sendKeys('qw13@rice.edu'))
        .then(findId("zipcode").sendKeys('77005'))
        .then(findId("dob").sendKeys('02/03/1994'))
        .then(findId("password").sendKeys('123abc'))
        .then(findId("pwconf").sendKeys('123abc'))
        .then(findId('submitButton').click())
        .then(sleep(2000))
        .then(findId('successMessage').getText().then(text=>{
            expect(text).to.eql("Register succeed!")
        }))
        .then(done)

    })
    it('should log in as the test user', (done) => {
        sleep(500)
        .then(common.login).then(done)
        
    })
    it('should log out',(done) => {
        sleep(500).then(common.logout).then(sleep(500)).then(done)
    })
})