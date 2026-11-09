import http from 'node:http';
import path from 'node:path';

import express from 'express';
import { Server } from 'socket.io';


async function main() {
    const app = express();
    app.use(express.json());
    app.use(express.static(path.resolve('./public')));

    const server = http.createServer(app);



    app.get('/health', (req, res) => {
        res.status(200).json({ health: true });
    });

    const PORT = process.env.PORT || 8080;

    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

main().catch((err) => {
    console.error("Error starting the server:", err);
    process.exit(1);
})