const Message=require('../models/Message');
const {v2 }=require('cloudinary');
const {getIO,userSocketMap}=require('../Socket/socket');
module.exports.getAllMessages=async(req,res)=>
{
    try {
        const io=getIO();
        const sender=req.user._id;
        const reciever=req.params.id;
        const message=await Message.find({$or:[
            {senderId:sender,recieverId:reciever},
            {senderId:reciever,recieverId:sender}
        ]})
        console.log(message);
        if(!message)
        {
            return res.json({success:false,error:"error while fetching messages"});
        }
        await Message.updateMany({senderId:reciever,recieverId:sender},{seen:true});
        res.json({success:true,message:message});
    } catch (error) {
        res.json({success:false,error:error});
    }
}
module.exports.sendMessage=async(req,res)=>{
    try { 
         const io=getIO();
         console.log("step 1");
        console.log("step 2"+req.body.text);
         const sender=req.user._id;
        const reciever=req.params.id;
        
        const {text}=req.body;
        const image=req.file;
        let upload;
        console.log("step 3"+req.file.path);
        if(image){
        upload=await v2.uploader.upload(req.file.path);
        upload=upload.secure_url;
        }
        const newmessage=await Message.create({senderId:sender,
           recieverId:reciever,
           text:text,
           image:upload,
           seen:false
        })
        console.log("step 4"+upload);
        if(!newmessage)
        {
            return res.json({success:false,error:"error while sending message"});
        }
        console.log("step 5");
        const recieverSocket=userSocketMap[reciever];
        try {
           if(recieverSocket)
        {
            io.to(recieverSocket).emit("newMessage",newmessage);
        }  
        } catch (error) {
            console.log(error);
        }
        
        console.log("step 6");
        res.json({success:true,message:"message sent successfully",newmessage:newmessage});
    } catch (error) {
         res.json({success:false,error:error});
    }
}
module.exports.MarkAsSeen=async(req,res)=>
{
    try {
    const {messageId}=req.params;
    await Message.updateOne({_id:messageId},{seen:true});
    res.json({success:true,message:"marked as seen successfully"}); 
    } catch (error) {
        res.json({success:false,message:error});
    }
}