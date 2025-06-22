const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//generate token
const generateToken=(userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {
        expiresIn:'7d'
    })
}

//user register
exports.registerUser = async(req, res)=>{
    try {
        const{name, email, password} = req.body;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:'user already exist, please login'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password:hashPassword
        });
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({
            message:'server error',
            error:error.message
        })
    }
}

//user login
exports.userLogin = async(req, res)=>{
    try {
        const{email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({message:'invalid email or password'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(500).json({message:'invalid email or password'});
        }
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        });
    } catch (error) {
        return res.status(500).json({
            message:'server error',
            error:error.message
        })
    }
}

//get user profile
exports.getUserProfile = async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message:'server error',
            error:error.message
        })
    }
}

