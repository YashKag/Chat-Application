import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { readMessages, addMessage } from "./utils/fileStore.js";

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
  cors: {
    origin: "*",}
})

app.get("/", (req, res)=>{
  res.send("Chat server running")
})

io.on("connection", async(socket)=>{
  console.log("User connected:", socket.id)

  try {
    const messages=await readMessages()
    socket.emit("messageHistory",messages)
  } catch (err) {
    console.error("Error loading messages:",err)
  }
  socket.on("sendMessage", async (data)=>{
    try {
      if (!data?.text||!data?.user)return
      const newMessage = {
        text: data.text,
        user: data.user,
        createdAt: new Date().toISOString(),
      };

      const savedMessage = await addMessage(newMessage)

      io.emit("receiveMessage",savedMessage)
    } catch (err){
      console.error("Error saving message:",err)
    }
  })

  socket.on("disconnect",()=>{
    console.log("User disconnected:", socket.id)
  })
})

const PORT = 5000
server.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
});