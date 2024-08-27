import io from "socket.io-client";
import { $ } from "../utils/querySelector";
import Toast from "../components/toast";

export default class InputController {
  constructor() {
    this.input = $("#message_input");
    this.button = $("#message_submit_button");
    this.socket = io(process.env.SOCKET_IP, { path: "/api" });
    this.toast = new Toast();
  }

  init() {
    this.inputEnterKeyDown();
    this.buttonSubmit();
  }

  inputEnterKeyDown() {
    this.input.addEventListener("keydown", ({ key, isComposing }) => {
      if (key === "Enter" && !isComposing) {
        const message = this.input.value.trim();
        if (message.length < 6) {
          this.toast.render("메시지는 6자 이상으로 입력해주세요.");
          console.log("메시지는 6자 이상으로 입력해주세요.");
          return;
        }
        this.input.value = "";
        this.socket.emit("addBubble", message);
      }
    });
  }

  buttonSubmit() {
    this.button.addEventListener("click", () => {
      const message = this.input.value.trim();
      if (message.length < 6) {
        this.toast.render("메시지는 6자 이상으로 입력해주세요.");
        console.log("메시지는 6자 이상으로 입력해주세요.");
        return;
      }
      this.input.value = "";
      this.socket.emit("addBubble", message);
    });
  }
}
