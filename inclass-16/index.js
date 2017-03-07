
const express = require('express')
const bodyParser = require('body-parser')

let articles={articles:[
		{
			id:1,
			author:"Scott",
			text:"This is my first article"
		},
		{
			id:2,
			author:"Max",
			text:"This is Max's article"
		},
		{
			id:3,
			author:"Leo",
			text:"This is Leo's article"
		}]
}

const addArticle = (req, res) => {
     const article={
     	id:articles.articles.length+1,
     	author: "root",
     	text: req.body.text
     }
     articles={articles:[...articles.articles,article]}  
     res.send(article)
}

const hello = (req, res) => res.send({ hello: 'world' })

const getArticle=(req,res)=>res.send(articles)

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles',getArticle)


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})