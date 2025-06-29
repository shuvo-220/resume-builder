const Resume = require('../models/resumeModel');

exports.createResume = async(req, res)=>{
     try {
        const{title} = req.body;
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume = await Resume.create({
            userId:req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })
        res.status(201).json(newResume)
     } catch (error) {
        res.status(500).json({messsage:'failed', error:error.message})
     }
}
    

exports.getUserResume = async(req, res)=>{
    try {
        const resumes = await Resume.find({userId:req.user._id}).sort({
            updateAt:-1
        })
        res.josn(resumes);
    } catch (error) {
        res.status(500).json({messsage:'failed', error:error.message})
    }
}

exports.getResumeById = async(req, res)=>{
    try {
        const resume = await Resume.findOne({_id:req.params.id, userId:req.user._id})
        if(!resume){
            res.status(401).json({message:'resume not found'});
        }
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({messsage:'failed', error:error.message})
    }
}

exports.updateResume = async(req, res)=>{
    try {
        const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!resume){
            res.status(401).json({message:'resume not found'});
        }
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({messsage:'failed', error:error.message})
    }
}

exports.deleteResume = async(req, res)=>{
    try {
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        });
        if(!resume){
            res.status(500).json({message:'resume not found'});
        }
    } catch (error) {
        res.status(500).json({messsage:'failed', error:error.message})
    }
}

