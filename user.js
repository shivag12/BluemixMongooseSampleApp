const mongoose = require("mongoose");

var user = mongoose.model("user",{
    name : {
        type : String,
        required : true
    } , 
    company : {
        type : String,
        required : true
    }
})

module.exports.User = user;