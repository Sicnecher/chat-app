import { Server } from "socket.io";
import http from "http"
import axios from "axios";

const server = http.createServer()
const io = new Server(server)

io.on("connection", (socket) => {
    console.log("connected")

    io.on("disconnect", () => {
        console.log("disconnected")
    })

    socket.on("message", (message) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/chats`, message).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {})

        io.emit("message", message)
    })
})

server.listen(3000, () => {
    console.log("listening on port 3000")
})