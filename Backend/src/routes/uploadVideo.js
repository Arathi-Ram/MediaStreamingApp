const express = require('express');
const uploadVideoRouter = express.Router();
const multer = require('multer');
const ctrlUploadVideo = require('../controller/uploadVideo.controller');
const uploadVideoMiddleware = require('../middlewares/uploadVideo');
const RolesList = require('../config/roles_list');
const verifyRoles = require('../middlewares/verifyRoles');
// POST Route for uploading video for which the controller is ctrlUploadVideo -> uploadVideo.controller.js 
uploadVideoRouter.post('/new-video',ctrlUploadVideo.uploadVideo);

module.exports = uploadVideoRouter;
