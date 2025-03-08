import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app=express();
const server=http.createServer(app);
const io= new Server(server,{
    cors: {
        origin: ["http://localhost:5173"],
    }
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

io.on('disconnect',(socket)=>{
    console.log('user disconnected')
})

export {app,server,io} ;