
var { getVideoDuration } = require('get-video-duration');
const multer = require('multer');
const uploadVideoMiddleware = require('../middlewares/uploadVideo')
const { getVideoDurationInSeconds } = require('get-video-duration');
const fs = require('fs');
// MODELS:
const uploadVideoDB = require('../model/videoModel');
const userModel = require('../model/users');

// DELETE FILE :
const util = require('util');
const deleteFile = util.promisify(fs.unlink);
// Upload Video Function
  module.exports.uploadVideo = (req,res,next) => {
    // store the multer file and get the fields ,
    const upload = multer({
        storage: uploadVideoMiddleware.files.videoStorage() //upload Middleware contains storage loc
      }).fields([{name:"video",maxCount:1},{name:"subtitle",maxCount:1},{name:'thumbnail',maxCount:1}]); //Fields that multer uses
      // call the multer upload function to catch any errors if any errors or run multer 
                        upload (req, res, (err) => {
                          if(err instanceof multer.MulterError) throw err
                          else if (err) throw err;
                          else{                           
                                const stream = fs.createReadStream(req.files['video'][0].path);
                                getVideoDurationInSeconds(stream)
                                    .then(async(duration) => {
                                        durationHours = Math.floor(duration / 60 / 60);
                                        durationMinutes = Math.floor(duration / 60) - (durationHours * 60);
                                        // If duration is LESS than 25 mins
                                        if(durationMinutes < 25){
                                          console.log("Video less than 25 mins.");
                                          console.log(req.files['video'][0].filename);
                                          let User;
                                          // Getting user ID from frontend to find the user who uploaded video
                                          var userID = req.body.userID;
                                          console.log(req.body.tags);
                                          //Finding from User model the user who is uploading the video
                                              userModel.findById({_id:userID},async(err,user)=>{
                                                if(!err){
                                                  User = user;
                                                  let uploadedVideo = new uploadVideoDB({
                                                    name:user.name,
                                                    title:req.body.title,
                                                    genre:req.body.genre,
                                                    videoName:req.files['video'][0].filename,
                                                    videoPath:req.files['video'][0].path,
                                                    videoQuality:req.body.quality,
                                                    rating : "0",
                                                    tags:req.body.tags,
                                                    thumbnailName:req.files['thumbnail'][0].filename,
                                                    thumbnailPath:req.files['thumbnail'][0].path,
                                                    subtitleName:req.files['subtitle'][0].filename,
                                                    subtitlePath:req.files['subtitle'][0].path,
                                                    createdAt: new Date().toDateString()
                                                  });
                                                  try {
                                                    uploadedVideo = await uploadedVideo.save()
                                                    console.log(uploadedVideo);
                                                  } catch (error) {
                                                    console.log(error);
                                                  }
                                                }
                                              else{
                                                console.log(err);
                                              }
                                            });
                                            res.status(200).send({msg:"Video Uploaded successfully"});
                                        }
                                        // If video duration is MORE than 25 min: 
                                        else{
                                          console.log(`Deleting ${req.files['video'][0].filename}`);
                                          await deleteFile(req.files['video'][0].path);
                                          console.log(`Deleting ${req.files['subtitle'][0].filename}`);
                                          await deleteFile(req.files['subtitle'][0].path);
                                          console.log(`Deleting ${req.files['thumbnail'][0].filename}`);
                                          await deleteFile(req.files['thumbnail'][0].path)
                                          res.status(422).send({error:"Video must not exceed 25 mins."});
                                      
                                    }
                                  });
                              
                                
                                
                                
                                                  
                            }
      });
  }

// now the video duration res.send is under res and not error in frontend
// any way to check the video duration in frontend before sending formdata or
// figure out to place the video duration checking before multer uploads in backend
