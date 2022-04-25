// Controllers related to sending details of videos to Frontend for viewing purpose:
const fs = require('fs');
const videosCollection = require('../model/videoModel');
const reportVideoCollection = require('../model/reportVideoComplaints');
 const singleVideoMiddleware = require('../middlewares/getSingleVideo');
const { send } = require('process');

// Controller to get datas of all videos from DB to send to frontend for displaying all available videos:
module.exports.getAllVideos = (req,res,next) => {
    videosCollection.find()
    .then((videos) => {
        res.send(videos);
    })
    .catch((err) => {
        console.log("error while getting all videos", err);
        res.send({error:err});
    })
}
// Controller to get the data of a single video using Query Params from DB to send to Frontend to know which video the user clicked on to view:
module.exports.getSingleVideo = (req,res,next) => {
    const videoId = req.params.id;
    // console.log(videoId);
    videosCollection.findById({"_id":videoId})
    .then((video) => {
        res.send(video);    
    })
   .catch((err) => {
       console.log(err);
   });
}
// Controller to stream the single video for playing by finding the video from DB using _id:
module.exports.watchSingleVideo = (req,res,next) =>{
    const videoId = req.params.id;
    videosCollection.findById({"_id":videoId})
    .then((singleVideo) => {
        const range = req.headers.range;
        
        const videoPath = `../FrontEnd/src/assets/uploads/videos/${singleVideo.videoName}`;
         // const videoPath = videoPath;
        const videoSize = fs.statSync(videoPath).size;
        const chunkSize = 1 * 1e+6;
        // const start = Number(range.replace(/\D/g,""));
        const start =  range?Number(range.replace(/\D/g,' ')): Number(' ');
        const end = Math.min(start + chunkSize, videoSize -1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range":`bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges":"bytes",
            "Content-Length":contentLength,
            "Content-Type":"video/mp4"
        }
        res.writeHead(206, headers);
        const stream = fs.createReadStream(videoPath,{ start, end})
        stream.pipe(res);
    })
    .catch((err) => {
        console.log(err);
        send({error:err});
    })
    
   
}
// Controller for delete Video by a user or admin using video ID
module.exports.deleteVideo = (req,res,next) => {
    const videoId = req.params.id;
    videosCollection.findByIdAndDelete({"_id" : videoId})
    .then(() => {
        console.log(`video ${videoId} successfully deleted!`);
        res.send({msg:"Video Deleted Successfully!"});
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
}
// Controller for report Video by a user or admin and saving the report details into report Collection using the Id
module.exports.reportVideo = (req,res,next) => {
    const videoId = req.params.id;
    const reportReason = req.body.reportReason
    // First, get the video details using ID from Video Collection
    videosCollection.findById({"_id":videoId})
    .then((videoToReport) => {
        let reportedVideo = new reportVideoCollection({
            video_ID : videoToReport._id,
            videoTitle : videoToReport.title,
            videoUploadedBy : videoToReport.name,
            reportedAt : new Date().toDateString(),
            reportReason : reportReason,
            resolveActionTaken :"Under investigation by panel."
        });
        // Second, saving all the report details into the reportVideo Collection
        try {
            reportedVideo.save();
            console.log(`${videoToReport.title} has been reported for ${reportReason}`);
            res.status(200).send({msg: `${videoToReport.title} has been reported for ${reportReason}`})
        } catch (err) {
            console.log(err);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

    // Controller to save the rating details of a video by updating the existing value in DB:
    module.exports.rateVideo = (req,res,next) => {
        const videoId = req.params.id;
        const videoRating = req.body.rating;
        videosCollection.findByIdAndUpdate({"_id":videoId},{$set:{
            "rating" : videoRating
        }
    })
    .then(() => {
        res.status(200).send({msg:`Video has been rated ${videoRating}`})
    })
    .catch((err) => {
        res.send({err: err});
    });
    
    }