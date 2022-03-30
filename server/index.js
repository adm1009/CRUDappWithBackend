const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app=express();
const mysql =require("mysql");

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'password',
    database:'cruddatabase'
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res)=>{
    const sqlSelect = 'SELECT * FROM movie_reviews'
     db.query(sqlSelect,(err,result)=>{
         res.send(result);
     })
})

app.post('/api/insert',(req,res)=>{

    const moviename=req.body.moviename;
    const moviereview=req.body.moviereview;

     const sqlInsert = 'INSERT INTO movie_reviews (moviename, moviereview) VALUES (?,?)'
     db.query(sqlInsert,[moviename,moviereview],(err,result)=>{
         console.log(result);
     })
});
app.delete('/api/delete/:moviename' ,(req,res) =>{
    const name = req.params.moviename;
    const sqlDelete = "DELETE FROM movie_reviews WHERE moviename=?";
    db.query(sqlDelete,name,(err,result)=>{
        if(err) console.log(err);
    })
});
app.put('/api/update' ,(req,res) =>{
    const name = req.body.moviename;
    const review = req.body.moviereview;
    const sqlUpdate = "UPDATE  movie_reviews SET moviereview = ? WHERE moviename = ?";
    db.query(sqlUpdate,[review,name],(err,result)=>{
        if(err) console.log(err);
    })
})

// app.get('/',(req,res)=>{
//     const sqlInsert ='INSERT INTO movie_reviews (MovieName,MovieReview) VALUES ("inception","goodmovie");'
//     db.query(sqlInsert,(err,result)=>{
//         res.send("Hello 3001")
//     })   
// });

app.listen(3001,()=>{
    console.log("u r in port 3001");
});