const mongoose = require("mongoose");
const fs = require("fs");

var uri = undefined;

if(process.env.VCAP_SERVICES){
    uri = process.env.VCAP_SERVICES["compose-for-mongodb"][0].credentials.uri
} else {
    uri = "mongodb://admin:SHELCRQEZEDRKNFG@sl-us-south-1-portal.1.dblayer.com:24065,sl-us-south-1-portal.8.dblayer.com:24065/admin?ssl=true";
}
 
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
    mongos: {
        ssl: true,
        sslValidate: true,
        sslCA: [new Buffer(fs.readFileSync(__dirname+"/sslca.crt"),"base64")],
        poolSize: 1,
        reconnectTries: 1
    }
});

mongoose.connection.on("connected",()=>{
    console.log("Connected to Mongoose DB");
})

mongoose.connection.on("disconnected",()=>{
    console.log("Disconnected from Mongoose DB");
})




