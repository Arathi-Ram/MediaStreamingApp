const express = require('express');
const videoRouter = express.Router();
const videoController = require('../controller/video.controller')
videoRouter.get('/video')