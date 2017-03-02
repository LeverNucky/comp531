const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     let payload

     if (req.url==="/"&& req.method==='GET'){
          payload = { 'hello': 'world' }
     }

     if (req.url==="/articles"&& req.method==='GET'){
          payload={ "articles": [{ "id":1, "author": 'Scott', "body":'A post' },
                              { "id":2, "author": 'Trump', "body":'Haha' },
                              { "id":3, "author": 'Obama',"body":'Wow' }]}
     }
     if(req.url==="/login"&& req.method==='POST'){
          payload={}
          payload.username=JSON.parse(req.body).username
          payload.result="success"
     }
     if (req.url==="/logout"&& req.method==='PUT'){
          payload="OK"
     }
     if (payload){
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200 
     }
     else{
          payload="Bad Request"
          res.setHeader('Content-Type', 'text/plain')
          res.statusCode = 402 
     }
     res.end(JSON.stringify(payload))
     
}