import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
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
  path: "/api",
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log("User connected");

  const [rows] = await connection.execute(
    "SELECT * FROM messages ORDER BY created_at ASC"
  );

  socket.emit("getBubbles", rows);

  socket.on("addBubble", async (data) => {
    console.log("Received input server: ", data);
    const id = uuidv4();
    const createdAt = new Date();
    await connection.query(
      "INSERT INTO messages (id,text,created_at) VALUES (?,?,?)",
      [id, data, createdAt]
    );
    io.emit("add", {
      id: id,
      text: data,
      created_at: createdAt,
    });
  });

  socket.on("deleteBubble", async (id) => {
    console.log("Received delete request for id: ", id);
    await connection.query("DELETE FROM messages WHERE id = ?", [id]);
    io.emit("delete", id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
