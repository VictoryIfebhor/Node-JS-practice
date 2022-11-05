require("dotenv").config()

const http = require("http")
const path = require("path")

const express = require("express")
const { Server } = require("socket.io")
const cors = require("cors")
const morgan = require("morgan")

const connectDB = require("./db")
const SocketInit = require("./socketio")
const videoRouter = require("./routes/video")


const app = express()

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

new SocketInit(io);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("api/download", videoRouter);

app.get("/", (req, res) => {
    res.send('ok')
});

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

const start = async () => {
    await connectDB(MONGO_URI)
    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}

start()