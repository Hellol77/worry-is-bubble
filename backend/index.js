import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
let connection;
async function connectDB() {
  try {
    connection = await mysql2.createConnection(dbConfig);
    console.log("DB 연결 성공");
  } catch (err) {
    console.error("DB 연결 실패:", err);
  }
}

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
io.on("connection", (socket) => {
  console.log("User connected");

  socket.emit("getBubbles");
});

app.get("/", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM messages");
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error("쿼리 실행 실패:", err.stack);
    res.status(500).send("서버 오류");
  }
});

server.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});