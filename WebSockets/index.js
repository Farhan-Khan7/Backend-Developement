import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

// ES Module mein __dirname create karna padta hai
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTTP server create
const server = http.createServer(app);

// Socket.IO server initialize
const io = new Server(server);

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/room", (req, res) => {
    res.sendFile(path.join(__dirname, "room.html"));
});

// Socket connection
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // Client se message receive
    socket.on("message", (data) => {
        // Sabhi connected clients ko message send
        socket.broadcast.emit("new-message", data);
        console.log("index.js : ",data)
    });


    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on("message", ({room , msg}) => {
        socket.to(room).emit("new-message", { msg });
        console.log("Room ID : ", room , "\n" , "Message : " , msg)
    })

    // Client disconnect
    socket.on("disconnect", () => {
        console.log("Disconnected from server:", socket.id);
    });

});

const port = 5500;

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
