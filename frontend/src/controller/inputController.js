import io from "socket.io-client";

export default class InputController {
  constructor() {
    this.input = document.getElementById("message_input");
    this.button = document.getElementById("message_submit_button");
    this.socket = io(process.env.SOCKET_IP, { path: "/api/*" });
  }

  init() {
    this.inputEnterKeyDown();
    this.buttonSubmit();
  }

  inputEnterKeyDown() {
    this.input.addEventListener("keydown", ({ key, isComposing }) => {
      if (key === "Enter" && !isComposing) {
        const message = this.input.value;
        this.input.value = "";
        this.socket.emit("addBubble", message);
      }
    });
  }

  buttonSubmit() {
    this.button.addEventListener("click", () => {
      const message = this.input.value;
      this.input.value = "";
      this.socket.emit("addBubble", message);
    });
  }
}
