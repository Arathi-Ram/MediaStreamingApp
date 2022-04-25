// The route handling all user and admin data retireval :
const express = require('express');
const userRouter = express.Router();
const userDataController = require('../controller/userData.controller');
const adminDataController = require('../controller/adminData.controller');
// Routes:

// Get all users from DB to send to frontend for users list:
userRouter.get('/userslist',userDataController.getUsers);
// Get a user by ID from DB to update role from user to admin for promoting the user to admin:
userRouter.put('/promoteUser',userDataController.promoteUser)
// Get all admins from DB to send to frontend for admins list:
userRouter.get('/adminsList', adminDataController.getAdmins);
// Get a admin by ID from DB to update role from admin to user for demoting the admin to user:  
userRouter.put('/demoteAdmin',adminDataController.demoteAdmin)
userRouter.get('/role/:id',userDataController.getRole);
userRouter.get('/user/:id',userDataController.getUser);
module.exports = userRouter;