import io from "socket.io-client";

const socket = () => {
  const socketio = io("http://localhost:3000");
  let bubbles;
  socketio.on("connect", () => {
    console.log("Connected to server");
  });

  socketio.on("getBubbles", (bubbles) => {
    bubbles = bubbles;
    console.log(bubbles);
  });
  return bubbles;
};

export default socket;
