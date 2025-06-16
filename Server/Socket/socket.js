const { Server } = require('socket.io');
//Initializing socket.io
let io;
//Store all online users using socket.io
const userSocketMap={};
function initializeServer(server) {
    io=new Server(server,{
    //* : so that it is accessible by all
    cors:{origin:"*"}
}) 

//Initalizing socket.io connection
io.on("connection",(socket)=>
{
    const userId=socket.handshake.query.userId;
    console.log("User connected:"+userId);
    if(userId)
    userSocketMap[userId]=socket.id;
//emit online users to all conneted clients
io.emit("getOnlineUsers",Object.keys(userSocketMap));
socket.on("disconnect",()=>
{
    console.log("user disconnected"+userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
})
})
}
function getIO() {
    return io;
}
module.exports={getIO,userSocketMap,initializeServer};