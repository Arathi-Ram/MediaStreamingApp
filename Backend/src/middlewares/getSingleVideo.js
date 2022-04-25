module.exports.uploadVideoToServer = (req,res,videoPath)=>{
    const range = req.headers.range;
        // const videoPath = './src/uploads/videos/';
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
}