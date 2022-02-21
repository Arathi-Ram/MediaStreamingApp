const mongoose = require('mongoose');
var userModel = require('./users');
mongoose.connect(process.env.MONGODB_URI, (err)=>{
    if(!err){
        console.log("MongoDB Connected Successfully!");
    }
    else{
        console.log("Error in MongoDB connection: ",JSON.stringify(err, undefined,2));
    }
});
