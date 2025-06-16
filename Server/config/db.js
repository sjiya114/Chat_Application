const mongoose=require('mongoose');
const connectDB= mongoose.connect(process.env.MONGODB_URL).then(()=>
    {
        console.log("connected to database successfully");
    })
module.exports=connectDB;