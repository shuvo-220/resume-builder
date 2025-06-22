const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.protect = async(req, res, next)=>{
    try {
        let token = req.headers.authorization;
        if(token && token.startsWith('Bearer')){
            token = token.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password');
            next()
        }else{
            res.status(401).json({message:'no authorized'});
        }
    } catch (error) {
        res.status(401).json({
            message:'no token',
            error:error.message
        });
    }
}