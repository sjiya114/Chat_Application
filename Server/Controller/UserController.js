const { default: isEmail } = require('validator/lib/isEmail');
const User=require('../models/User');
const validator =require('validator');
const bcrypt=require('bcryptjs');
const json=require('jsonwebtoken');
const {v2} =require('cloudinary');
const generateToken=async(id)=>
{
return json.sign({id},process.env.JWT_KEY);
}
module.exports.Login=async(req,res)=>
{
    const {email,password}=req.body;
    if(!isEmail(email))
    {
        return res.json({success:"false",error:"please enter a valid email address"});
    }
    const user=await User.findOne({email:email});
    if(!user)
    {
        return res.json({sucess:false,error:"user do not exist"});
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match)
    {
        return res.json({success:false,error:"incorrect user id or password"});
    }
    const token=await generateToken(user._id);
     res.json({success:true,token:token,user:user});
}
module.exports.signup=async(req,res)=>
{
    try {
    const {name,email,password,bio}=req.body;
    if(!isEmail(email))
    {
        return res.json({success:false,error:"please enter a valid email address"});
    }
    const img=req.file.path;
    console.log(img);
    let upload;
    try
    {
     upload=await v2.uploader.upload(img);
     upload=upload.secure_url;
    }
    catch(err)
    {
        console.log(err);
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user=new User({
        name:name,
        email:email,
        password:hashedPassword,
        bio:bio,
        profile:upload
    });
    await user.save();
    if(!user)
    {
       return res.json({success:false,error:"error while creating user"});
    }
    const token=await generateToken(user._id);
    res.json({success:true,user:user,token:token});
    
    } catch (error) {
         res.json({success:false,error:error});
    }
}
module.exports.checkAuth=async(req,res)=>
{
     res.json({success:true,user:req.user});
}