import express, { json } from 'express'
import router from './Routes/userRoute.js';
import cors from 'cors'
import connectDb from "./Connection/Connect.js";
import { Server } from 'socket.io';
import http from "http";
const app = express()

//connection 

connectDb()

// Middleware setup
app.use(express.json())
app.use(cors())

//create server & socket
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // React dev port
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});


app.set("socketio", io)

app.use("/api", router);

//Start server

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`the server is running in ${PORT}`)
})