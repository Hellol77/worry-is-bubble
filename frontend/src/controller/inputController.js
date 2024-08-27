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

  disableInput() {
    this.input.disabled = true; // input 비활성화
    this.button.disabled = true; // button 비활성화
    setTimeout(() => {
      this.input.disabled = false; // 0.5초 후 input 활성화
      this.button.disabled = false; // 0.5초 후 button 활성화
    }, 1000);
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
        this.disableInput();
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
      this.disableInput();
    });
  }
}
