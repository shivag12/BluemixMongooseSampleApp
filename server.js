require("./dbconnection");
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const {User} = require("./user");

var app = express();

app.use(bodyparser.json());

app.post("/insertuser",(req,res)=>{

    var newUser = new User({
        name : req.body.name,
        company : req.body.company
    });

    newUser.save().then((data)=>{
        res.send({_id : data._id}).status(200);
    }).catch((err)=>{
        res.send(err).status(400);
    })

})


app.get("/getuser",(req,res)=>{ 
    User.findById(req.query.id).then((data)=>{
        res.send(data).status(200);
    }).catch((err)=>{
        res.send(err).status(400);
    })
})

app.listen(3000,()=>{
    console.log("Application started at port 3000");
})

