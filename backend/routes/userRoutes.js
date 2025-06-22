const express = require('express');
const { 
    registerUser, 
    userLogin, 
    getUserProfile 
} = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', userLogin)
userRouter.get('/profile', protect, getUserProfile);

module.exports = userRouter;