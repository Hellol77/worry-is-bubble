import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import cron from "node-cron";

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

  const [rows] = await connection.execute("SELECT * FROM messages ORDER BY created_at ASC");

  socket.emit("getBubbles", rows);

  socket.on("addBubble", async (data) => {
    const text = data.trim();
    console.log("Received input server: ", text);
    if (text.length < 4) {
      console.log("메시지는 4자 이상으로 입력해주세요.");
      return;
    }
    const id = uuidv4();
    const createdAt = new Date();
    const deleteAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
    await connection.query("INSERT INTO messages (id,text,created_at,delete_at) VALUES (?,?,?,?)", [
      id,
      text,
      createdAt,
      deleteAt,
    ]);
    io.emit("add", {
      id: id,
      text,
      created_at: createdAt,
      delete_at: deleteAt,
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

cron.schedule("*/60 * * * *", async () => {
  console.log("60분 마다 만료된 메시지를 삭제합니다.");
  try {
    const now = new Date();
    // 삭제할 메시지의 id들을 가져옴
    const [rows] = await connection.query("SELECT id FROM messages WHERE delete_at <= ?", [now]);

    // 삭제할 메시지가 있는 경우
    if (rows.length > 0) {
      const idsToDelete = rows.map((row) => row.id);
      await connection.query("DELETE FROM messages WHERE id IN (?)", [idsToDelete]);

      // 삭제된 메시지들의 id를 클라이언트들에게 알림
      idsToDelete.forEach((id) => {
        io.emit("delete", id);
      });

      console.log(`${idsToDelete.length}개의 메시지가 삭제되었습니다.`);
    } else {
      console.log("삭제할 메시지가 없습니다.");
    }
  } catch (err) {
    console.error("메시지 삭제 중 오류 발생:", err);
  }
});

server.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
