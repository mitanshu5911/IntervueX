import "./config/env.js";
import connectDB from "./config/db.js";
import app from "./app.js";
import { socketHandler } from "./socket/socketHandler.js";
import http from 'http';

const server = http.createServer(app);

const port = process.env.PORT || 5000;

connectDB();
socketHandler(server);

server.listen(port,() =>{
    console.log("Server is started at PORT: ", port );
})