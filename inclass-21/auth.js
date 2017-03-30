const md5=require('md5');
const cookieParser = require('cookie-parser');

let arr=[];
let sid = 1;
const cookieKey = 'sid';


module.exports=function(app){
	app.use(cookieParser());
	app.post('/register',register);
	app.post('/login',login);
}

function register(req,res){
	const username=req.body.username;
	const password=req.body.password;
	const salt = new Date().getTime() + username;
	const hash = md5(salt + password);

	arr.push({username: username, salt: salt, hash: hash});
	const msg={username: username, result: 'success'};
	res.send(msg);

}

function login(req,res){
	
	const username=req.body.username;
	const password=req.body.password;

	if (!username || !password){
		res.sendStatus(400);	
		return;
	}
	const userObj = getUser(username);
	
	if (!userObj || !isAuthorized(userObj, req)){
		res.sendStatus(401);	
		return;
	}

	res.cookie(cookieKey, generateCode(userObj), {maxAge: 3600*1000, httpOnly: true});

	const msg = {username: username, result: 'success'};
	res.send(msg);
}

function getUser(username){
	return arr.filter(r=>{return r.username==username})[0];
}

function isAuthorized(userObj, req){
	const salt = userObj.salt;
	const password = req.body.password;
	const hash = md5(salt + password);
	return (hash === userObj.hash);
}

function generateCode (userObj){
	return sid++;
}

