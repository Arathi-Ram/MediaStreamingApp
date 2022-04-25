const multer = require('multer');
// DIRECTORIES FOR STORING VIDEO FILE, SUBTITLE FILE & THUMBNAIL FILE
// const video_DIR =  __dirname +'../../uploads/videos'
// const subtitle_DIR = __dirname + '../../uploads/subtitle';
// const thumbnail_DIR =  __dirname +'../../uploads/thumbnail';
const video_DIR =  __dirname +'../../../../Frontend/src/assets/uploads/videos'
const subtitle_DIR = __dirname + '../../../../Frontend/src/assets/uploads/subtitles';
const thumbnail_DIR =  __dirname +'../../../../Frontend/src/assets/uploads/thumbnail';

module.exports.files = {
    videoStorage: () => {
        var videoStorage = multer.diskStorage({
            destination: (req,file,cb) =>{
                if(file.fieldname === "video"){
                    cb(null,video_DIR);
                }
                else if(file.fieldname === "subtitle"){
                    cb(null,subtitle_DIR);
                }
                else if(file.fieldname === "thumbnail"){
                    cb(null,thumbnail_DIR);
                }
                // cb(null,DIR)
            }, 
            filename: (req, file, cb) => {
                cb(null,  Date.now()+ '_' +file.originalname );
            },
            // fileLimit: () => {
            //     fileSize:24214400.0 
            //     cb(null,false)
            // }
        })
        return videoStorage;
    }
    // allowedFiles: (req,file,cb) => {

    // }
}
// https://codingstatus.com/upload-multiple-files-using-multer-in-node-js-and-express/
// https://www.bacancytechnology.com/blog/file-upload-using-multer-with-nodejs-and-express
// https://blog.angular-university.io/angular-file-upload/