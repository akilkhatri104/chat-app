const express = require('express')

const app = express()
const path = require('path')

const server = require('http').createServer(app)

const io = require('socket.io')(server)

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Default route to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

io.on('connection',(socket) => {
    console.log("What is socket: ",socket);
    console.log('Socket is active to be connected');
    
    socket.on('chat', (payload) => {
        console.log('What is payload: ',payload);
        io.emit('chat',payload)
    })
})

server.listen(5000,() => {
    console.log('Server is listening at port 5000...');
    
})