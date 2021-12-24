const express=require('express');

require('dotenv').config();

const app=express();

//My custom routes
const novice =require('./routes/novice')
const users =require('./routes/users');
const conn=require('./DB/dbConn')

//when client visits home
app.get('/', (req,res)=>{
    res.send("El' Pendejo")
    res.end()  
})

app.use('/novice',novice)
app.use('/users',users);


const PORT=process.env.PORT || 25565;
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${process.env.PORT || port}`)
})
