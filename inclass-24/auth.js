const md5=require('md5')
const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

let arr=[]
let sid = 1
let currentUser=''
let redis = require('redis').createClient("redis://h:p125633bd33922f578e4e6d43214c39ba86235a85da9e9dd110a84bd2de5fd2b5@ec2-34-206-56-122.compute-1.amazonaws.com:35589")
const cookieKey = 'sid'


const callbackURL = 'http://localhost:3000/callback'
const clientSecret = 'd2e15cfe5a7a931da4f1456370adee56'
const clientID = '1936523593234430'
const config = {clientSecret, clientID, callbackURL}


let users = []
// serialize the user for the session
passport.serializeUser(function(user, done) {
    users[user.id] = user
    done(null, user.id)
})

// deserialize the user from the session
passport.deserializeUser(function(id, done) {
    var user = users[id]
    done(null, user)
})

passport.use(new FacebookStrategy(config, 
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile)
        })
    }))

const register=(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const salt = new Date().getTime() + username
    const hash = md5(salt + password)

    arr.push({username: username, salt: salt, hash: hash})
    res.status(200).send({result:'success', username:username})

}

const login=(req,res)=>{
    
    const username=req.body.username
    const password=req.body.password

    if (!username || !password){
        res.sendStatus(400)
        return
    }
    const userObj = getUser(username)
    
    if (!userObj || !isAuthorized(userObj, req)){
        res.sendStatus(401)
        return
    }

    redis.hmset(sid, userObj)

    res.cookie(cookieKey, generateCode(userObj), {maxAge: 3600*1000, httpOnly: true})
    currentUser=username
    res.status(200).send({username: username, result: 'success'})
}

const logout=(req,res)=>{
    req.logout()
    currentUser = ''
    sid=0
    res.cookie(cookieKey, null, {maxAge: -1, httpOnly: true})
    res.redirect('/')
    
}

const isLoggedIn = (req, res, next) => {

    let sid = req.cookies[cookieKey]
    if(!sid){
        return res.status(401)
    }
    else{
        redis.hgetall(sid, function(err, userObj){
            if(userObj){
                next()
            }
            else{
                res.redirect('/login');
            }
        })
    }
}

const profile = (req, res) => {
    res.send('ok now what?', req.user)
}

const putPassword=(req,res)=>{
    res.status(200).send({username: currentUser,status: 'will not change'})
}

const getUser=(username)=>{
    return arr.filter(r=>{return r.username==username})[0]
}

const isAuthorized=(userObj, req)=>{
    const salt = userObj.salt
    const password = req.body.password
    const hash = md5(salt + password)
    return (hash === userObj.hash)
}

const generateCode=(userObj)=>{
    return sid++
}

module.exports=function(app){
    app.use(cookieParser())
    app.use(session({ secret: clientSecret}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.post('/register',register)
    app.post('/login',login)
    app.use('/login/facebook', passport.authenticate('facebook', {scope: 'email'}))
    app.use('/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
    app.put('/password', putPassword)
    app.put('/logout', logout)
    app.use('/profile', isLoggedIn, profile)
    app.use('/fail', fail)
}


