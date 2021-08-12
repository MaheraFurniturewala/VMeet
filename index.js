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

server.listen(8000);