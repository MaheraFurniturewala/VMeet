const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4:uuidV4} = require('uuid');

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
//create a room and redirect user to that room 
// to  generate this roomId  use uuid function which will give us a dynamic url
res.redirect(`/${uuidV4()}`);
});

app.get('/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room});
})

io.on('connection',(socket)=>{
    socket.on('join-room',(roomId, userId)=>{
        //we are joining this new room with roomId with the current user
        socket.join(roomId);
        //send a message to the room that we are currently in
        socket.broadcast.to(roomId).emit('user-connected',userId);
        socket.on('disconnect',()=>{
            socket.broadcast.to(roomId).emit('user-disconnected',userId);
        });
        
    });
})

server.listen(8000);