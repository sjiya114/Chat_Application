const Message = require('../models/Message');
const user=require('../models/User');
module.exports.getAllUsers=async(req,res)=>
{
    console.log("heyyy");
    const users=await user.find({_id:{$ne:req.user._id}});
    let filter={};
     await Promise.all(users.map(async (user)=>
    {
     let msg=await Message.find({senderId:user._id,recieverId:req.user._id,seen:false});
      if(!msg)filter[user._id]=0;
     else
     filter[user._id]=msg.length;
}));
  
     if(!users)
    {
       return res.json({success:false,error:"error while fetching users"});
    }
    console.log(users);
    res.json({success:true,users:users,seenlength:filter});
}