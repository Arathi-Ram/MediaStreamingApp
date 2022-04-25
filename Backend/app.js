// Middleware packages:
const express = require('express');
const cors = require('cors');
const app = new express();
// Files: 
const config = require('./src/config/config');
const modelDB = require('./src/model/db');
const usersData = require('./src/model/users');
const PORT =  process.env.PORT;
app.use(express.json());
app.use(cors());
// Routes:
    // Route for login and signup with authentication and authorization:
        const authRoute = require('./src/routes/authRoutes');
        app.use('/auth',authRoute);
    // Route for uploading video using multer:
        const uploadVideoRoute = require('./src/routes/uploadVideo');
        app.use('/upload',uploadVideoRoute);
    // Route for retrieving users and admin details from DB:
        const userRoute = require('./src/routes/userRoutes');
        app.use('/users',userRoute);
    // Route for viewing all and single videos:
        const viewVideosRoute = require('./src/routes/viewVideosRoute');
        app.use('/videos',viewVideosRoute);

// error handler
app.use((err,req,res,next)=>{
    if(err.name === 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key=>valErrors.push(err.errors[key].message));
        console.log(valErrors);
        res.status(422).send({error:valErrors})
    }
});
const fs = require('fs');
app.get('/video',(req,res) =>{
 const range = req.headers.range;
 const videoPath = './src/uploads/videos/1647338683134_videoplayback.mp4';
 const videoSize = fs.statSync(videoPath).size;
 const chunkSize = 1 * 1e+6;
// const start = Number(range.replace(/\D/g,""));
const start =  range?Number(range.replace(/\D/g,' ')): Number(' ');
const end = Math.min(start + chunkSize, videoSize -1);
const contentLength = end- start + 1;
const headers = {
    "Content-range":`bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges":"bytes",
    "Content-Length":contentLength,
    "Content-Type":"video/mp4"
}
res.writeHead(206, headers);
const stream = fs.createReadStream(videoPath,{ start, end})
stream.pipe(res);

})
app.listen(PORT, ()=> { console.log("Server ready at: " + PORT );});