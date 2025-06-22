const mongoose = require('mongoose');

 const connectDB=async()=>{
    await mongoose.connect(process.env.DB).then(()=>{
        console.log('database connected')
    }).catch((error)=>{
        console.log('database not connected')
    })
}

module.exports = connectDB;