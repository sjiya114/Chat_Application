const express=require('express');
const dotenv=require('dotenv');
const app=express();
//for storing secret keys in env file
dotenv.config();
const http=require('http');
const db=require('./config/db');
const cors=require('cors');
const userSchema=require('./models/User');
const messageSchema=require('./models/Message');
//for storing data on cloudinary
const connectCloudinary=require('./config/cloudinary');
const user=require('./routes/User');
const message=require('./routes/Message');
const { initializeServer } = require('./Socket/socket');
connectCloudinary();
//we are using http module for creating server because socket supports http only
const server=http.createServer(app);
initializeServer(server);
//for connecting frontend to backend
app.use(cors());
//for getting data from frontend
app.use(express.json({limit:'4mb'}));
//Initializing routes for user
app.use("/user",user);
//Initializing routes for message
app.use("/message",message);
app.get("/",(req,res)=>
{
 res.send("API is working");
})
const PORT=3000;
//starting server
server.listen(PORT,()=>{
    console.log("app started running on port:"+PORT);
})