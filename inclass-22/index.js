const express = require('express')
const bodyParser = require('body-parser')

const middleWare = (req, res, next) => {

  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, X-Session-Id, Accept')
  res.header('Access-Control-Expose-Headers','Location, X-Session-Id')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  if (req.method === 'OPTIONS'){
  	res.status(200).send('OK')  
  }
  else {
    next()
  }
}

const app = express()
app.use(bodyParser.json())
app.use(middleWare)


require('./articles.js')(app)
require('./profile.js')(app)
require('./auth.js')(app)
require('./following.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})