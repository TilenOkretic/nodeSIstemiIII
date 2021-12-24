const express=require('express');
const users=express.Router();

const DB = require('../DB/dbConn');

users.post('/login', async (req, res) => {
let {username, password}=req.body;

if(username&&password)
{
try
{
	let queryResult = await DB.authUser(username);
	if(queryResult.lenght > 0)
	{
		if(password===queryResult[0].user_password)
		{
			
		} else
		{
			console.log('incorrect password');
		}
	}else
	{
	console.log('User does not exist!');
	}
}catch(err)
{
console.log(err);
res.sendStatus(500);
}
}else
{
console.log('a filed is missing, username of password');
}

res.end();
});

users.post('/register', async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	
	let isCompleteUser = username&&password&&email;
	if(isACompleteUser)
	{
		try {
			let queryResult = await DB.insertUser(username, email, password);
			if(queryResult.affectedRows)
			{
				console.log('new user added');
			}
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	}
	else {
		console.log('not a complete user');
	}
res.end();
});

module.exports=users;
