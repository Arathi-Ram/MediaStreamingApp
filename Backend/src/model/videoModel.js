const mongoose = require('mongoose');

const uploadVideoSchema = mongoose.Schema({
   
        
    name:{
        type:String,
    },
    title:{
        type:String
    },
    genre:{
        type:String
    },
    videoName:{
        type:String,
        
    },
    videoPath:{
        type:String
    },
    videoQuality:{
        type:String
    },
    tags:{
        type:String
    },
    rating:{
        type:String
    },
    thumbnailName:{
        type:String
    },
    thumbnailPath:{
        type:String
    },
    subtitleName:{
        type:String
    },
    subtitlePath:{
        type:String
    },
    createdAt:{
        type:String
    }
});

var videoModel = mongoose.model("uploaded_Video",uploadVideoSchema);
module.exports = videoModel;