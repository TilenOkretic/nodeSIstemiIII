const express=require('express')
const novice= express.Router()


const DB=require('../DB/dbConn');


novice.get('/',async (req,res)=>{
	try {
	let queryResult = await DB.allNovice();
	res.json(queryResult);
	} catch (err) {
		console.log("Error: " + err);
		res.sendStatus(500);
	}

});

novice.get('/:id',async (req,res)=>{    
        try {
        let queryResult = await DB.oneNovica(req.params.id);
        res.json(queryResult);
        } catch (err) {
                console.log("Error: " + err);
                res.sendStatus(500);
        }

});

novice.post('/',async (req,res)=>{
	let title = req.body.title;
	let slug  = req.body.slug;
	let text = req.body.text;
	let isACompleteNovica = title && slug && text;
	if(isACompleteNovica) {
	try
	{
		let queryResult = await DB.createNovica(title, slug, text);
        	if(queryResult.affectedRows)
		{
			console.log('new article added');
		} else {
			console.log('article not added');
		}
	} catch (err) {
                console.log("Error: " + err);
                res.sendStatus(500);
	}
	} else {
		console.log('Something is missing');
	}
        res.end();
});

module.exports=novice
