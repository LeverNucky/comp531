import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('End to End Test On Profile Page', () => {

    before('should navigate to profile page', (done) => {
        go().then(common.login).then(sleep(500))
        .then(findId('profile_btn').click())
        .then(sleep(1000))
        .then(done)
    })

    it("Update user email and verify", (done)=>{
        const newEmail = 'new@foobar.com';
        sleep(500)
        .then(findId('profile_email').clear())
        .then(findId('profile_email').sendKeys(newEmail))
        .then(findId('profile_update_btn').click())
        .then(sleep(1500))
        .then(findId('current_email').getText().then(text=>{
            expect(text).to.eql("Email Address: "+newEmail)
        }))
        .then(done)
    })

    it("Update user zipcode and verify", (done)=>{
        const newZipcode = '12358';
        sleep(500)
        .then(findId('profile_zipcode').clear())
        .then(findId('profile_zipcode').sendKeys(newZipcode))
        .then(findId('profile_update_btn').click())
        .then(sleep(1500))
        .then(findId('current_zipcode').getText().then(text=>{
            expect(text).to.eql("Zipcode: "+newZipcode)
        }))
        .then(done)
    })
    it("Update user password and verify", (done)=>{
        const password = 'new password'
        sleep(500)
        .then(findId('profile_pw').clear())
        .then(findId('profile_pwconf').clear())
        .then(findId('profile_pw').sendKeys(password))
        .then(findId('profile_pwconf').sendKeys(password))
        .then(findId('profile_update_btn').click())
        .then(sleep(1500))
        .then(findId('success_Message').getText().then(text=>{
            expect(text).to.eql("You can't change your password, sorry.")
        }))
        .then(done)
    })
})