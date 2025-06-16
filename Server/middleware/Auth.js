const json=require('jsonwebtoken');
const User = require('../models/User');
module.exports.isLoggedIn=async(req,res,next)=>
{
console.log("tokgg");
const token=req.headers.token;
if(!token)
{
    return res.json({success:false,message:"token not found"});
}
const decoded=json.verify(token,process.env.JWT_KEY);
console.log(token);
const user=await User.findOne({_id:decoded.id});
console.log(token);
if(!user)
{
    return res.json({success:false,message:"user do not exist"});
}
console.log("hiii");
req.user=user;
next();
}