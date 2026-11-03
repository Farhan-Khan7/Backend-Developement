import express from "express";
import { Server } from "socket.io";

const app = express();

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = new Server(server);