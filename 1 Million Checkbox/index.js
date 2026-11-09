import http from "node:http";
import path from "node:path";

import express from "express";
import { Server } from "socket.io";


import { publisher, subscriber, redis } from "./redis.connection.js";
// import { channel } from 'node:diagnostics_channel';

const CHECKBOX_COUNT = 99;


const CHECKBOX_STATE_KEY = 'checkbox-state'
// const state = {
//     checkboxes: new Array(CHECKBOX_COUNT).fill(false),
// };

async function main() {
    const PORT = process.env.PORT || 8080;
    const app = express();
    app.use(express.json());
    app.use(express.static(path.resolve("./public")));

    const server = http.createServer(app);

    const io = new Server();
    io.attach(server);

    await subscriber.subscribe("internal-server:checkbox:change");
    subscriber.on("message", (channel, message) => {
        if (channel === "internal-server:checkbox:change") {
            const { index, checked } = JSON.parse(message);
            io.emit("server:checkbox:clicked", { index, checked });

            // state.checkboxes[index] = checked;
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected Successfully!`);

        socket.on("client:checkbox:clicked", async (data) => {
            const { index, checked } = data;
            console.log(`[Socket : ${socket.id}] : client:checkbox:clicked , index : ${index} , checkbox : ${checked}`);

            const existingState = await redis.get(CHECKBOX_STATE_KEY)

            if (existingState) {
                const remoteData = JSON.parse(existingState)
                remoteData[data.index] = data.checked
                await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(remoteData))
            } else {
                const remoteData = new Array(CHECKBOX_COUNT).fill(false);

                remoteData[index] = checked;

                await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(remoteData));
            }

            await publisher.publish(
                "internal-server:checkbox:change",
                JSON.stringify(data),
            );
        });
    });

    app.get("/health", (req, res) => {
        res.status(200).json({ health: true });
    });

    app.get("/checkboxes", async (req, res) => {
        const existingState = await redis.get(CHECKBOX_STATE_KEY)

        if (existingState) {
            const remoteData = JSON.parse(existingState)
            return res.json({ checkboxes: remoteData })
        }

        res.json({
            checkboxes: new Array(CHECKBOX_COUNT).fill(false)
        });
    });

    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

main().catch((err) => {
    console.error("Error starting the server:", err);
    process.exit(1);
});
