// This DB Model is to store the details while reporting a video by user or admin 
const mongoose = require('mongoose');
const reportVideoSchema = mongoose.Schema({
    video_ID: {
        type:String
    },
    videoTitle: {
        type:String
    },
    videoUploadedBy: {
        type: String
    },
    v_reportedBy : {
        type:String
    },
    reportedAt:{
        type:String
    },
    reportReason : {
        type:String
    },
    resolveActionTaken : {
        type:String
    }
});
var reportVideoModel = mongoose.model("report_video",reportVideoSchema);
module.exports = reportVideoModel;
