const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    thumblineLink:{
        type:String
    },
    template:{
        theme:String,
        colorPlate:[String]
    },
    profileInfo:{
        profilePreviewUrl:String,
        fullName:String,
        designation:String,
        summery:String
    },
    contactInfo:{
        email:String,
        phone:String,
        location:String,
        linkedin:String,
        github:String,
        website:String
    },
    //work exp
    workExperience:[
        {
            company:String,
            role:String,
            startDate:String,
            endDate:String,
            description:String
        }
    ],
    education:[
        {
            degree:String,
            institution:String,
            startDate:String,
            endDate:String
        }
    ],
    skills:[
        {
            name:String,
            progress:Number
        }
    ],
    projects:[
        {
            title:String,
            description:String,
            github:String,
            liveDemo:String
        }
    ],
    certifications:[
        {
            title:String,
            issure:String,
            year:String,
        }
    ],
    languages:[
        {
            name:String,
            progress:Number
        }
    ],
    interests:[String]
},{
    timestamps:{createdAt:'createdAt', updatedAt:'updateAt'}
});

module.exports = mongoose.model('Resume', resumeSchema);