const express = require('express');
const viewVideoRouter = express.Router();
const viewVideoController = require('../controller/viewVideos.controller');
const verifyJWT = require('../middlewares/verifyJwt');
const roles_List = require('../config/roles_list');
const verifyRoles = require('../middlewares/verifyRoles');
// Route to get all videos from DB to send to Angular:
viewVideoRouter.get('/all-videos',verifyJWT,verifyRoles(roles_List.User , roles_List.Admin, roles_List.Root_User),viewVideoController.getAllVideos);

// Route to get single video  data from DB:
viewVideoRouter.get('/watch/:id',viewVideoController.getSingleVideo);

// Route to display or stream the single video based on params _id from DB:
viewVideoRouter.get('/watching/:id',viewVideoController.watchSingleVideo);

// Delete video Route:
viewVideoRouter.delete('/delete/:id',viewVideoController.deleteVideo);

// Report Video Route: 
viewVideoRouter.post('/report/:id',viewVideoController.reportVideo);

// Video Rating Route:
viewVideoRouter.put('/rate/:id',viewVideoController.rateVideo)
        
module.exports = viewVideoRouter;