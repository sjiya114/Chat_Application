const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    senderId: { type:mongoose.Schema.Types.ObjectId,ref:"User",required: true },
    recieverId: { type:mongoose.Schema.Types.ObjectId,ref:"User",required: true },
    text: { type: String },
    image: { type: String},
    seen:{type:Boolean,default:false}
}, { timestamps: true });
module.exports = mongoose.model("Message",messageSchema);