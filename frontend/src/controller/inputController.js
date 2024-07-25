import io from "socket.io-client";

export default class InputController {
  constructor() {
    this.input = document.getElementById("message_input");
  }

  init() {
    const socketio = io("http://localhost:3000");
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        console.log("enter");
        const message = this.input.value;
        socketio.emit("addBubble", message);

        this.input.value = "";
      }
    });
  }
}
