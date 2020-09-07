const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const {BlockChain, Block} = require('./BlockChain');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


//using root as static provider
app.use(express.static(path.join(__dirname,'/')));


//new connection
io.on('connection', socket => {
    

    let Message = new BlockChain();

    socket.on('user', (username) => {
        
       
        socket.emit('msg', `welcome ${username}`);
        socket.broadcast.emit('msg', `${username} joined`);

        socket.on("disconnect", () => {
            io.emit('msg', `${username} has left`);
   
        });

        //message from client
     socket.on('chatMessage', (msg) =>{
        
       let index = Message.getLatestBlock().index;

        Message.addBlock(new Block(index+1,`${username}: ${msg}`,Date.now()));
        io.emit('msg',`${username}: ${msg}`);
        console.log(JSON.stringify(Message, null, 4));

        

     });

    });
    
  
  


    
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`server up and running on PORT ${PORT}`));