const express = require('express');
const authRouter = express.Router();

const ctrlAuth = require('../controller/auth.controller');
authRouter.post('/signup',ctrlAuth.register);
authRouter.post('/signin', ctrlAuth.login);
module.exports = authRouter;