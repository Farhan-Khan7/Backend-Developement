import http from 'node:http';
import path from 'node:path';

import express from 'express';
import { Server } from 'socket.io';


const CHECKBOX_COUNT = 100;

const state = {
    checkboxes : new Array(CHECKBOX_COUNT).fill(false)
}

async function main() {
    const PORT = process.env.PORT || 8080;
    const app = express();
    app.use(express.json());
    app.use(express.static(path.resolve('./public')));

    const server = http.createServer(app);

    const io = new Server()
    io.attach(server)

    io.on("connection" , (socket) => {
        console.log(`Socket connected Successfully!`)

        socket.on("client:checkbox:clicked" , (data) => {
            const {index , checked} = data
            console.log(`[Socket : ${socket.id}] : client:checkbox:clicked , index : ${index} , checkbox : ${checked}`)
            io.emit("server:checkbox:clicked" , data)

            state.checkboxes[data.index] = data.checked
        })
    })



    app.get('/health', (req, res) => {
        res.status(200).json({ health: true });
    });

    app.get('/checkboxes' , (req ,res) => {
        res.json({
            checkboxes : state.checkboxes
        })
    })


    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

main().catch((err) => {
    console.error("Error starting the server:", err);
    process.exit(1);
})