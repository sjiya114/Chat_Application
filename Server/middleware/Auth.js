const json=require('jsonwebtoken');
const User = require('../models/User');
module.exports.isLoggedIn=async(req,res,next)=>
{
const token=req.headers.token;
if(!token)
{
    return res.json({success:false,message:"token not found"});
}
const decoded=json.verify(token,process.env.JWT_KEY);
const user=await User.findOne({_id:decoded.id});
if(!user)
{
    return res.json({success:false,message:"user do not exist"});
}
req.user=user;
next();
}