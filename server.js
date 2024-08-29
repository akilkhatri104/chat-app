require('dotenv').config();

const express = require('express')

const app = express()
const path = require('path')

const server = require('http').createServer(app)

const io = require('socket.io')(server, {
  cors: {
    origin: "https://chat-app-iota-blue-86.vercel.app", // Replace with your Vercel domain
    methods: ["GET", "POST"],
  },
  transports: ["polling"], // Add this line to use polling transport
});

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '/frontend')));

// Default route to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend', 'index.html'));
});

io.on('connection',(socket) => {
    console.log("What is socket: ",socket);
    console.log('Socket is active to be connected');
    
    socket.on('chat', (payload) => {
        console.log('What is payload: ',payload);
        io.emit('chat',payload)
    })
})


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});