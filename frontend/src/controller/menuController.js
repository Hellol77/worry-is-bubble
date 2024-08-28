import { $ } from "../utils/querySelector";
import io from "socket.io-client";
import MenuText from "../components/menu/menuText";

export default class MenuController {
  constructor() {
    this.socket = io(process.env.SOCKET_IP, { path: "/api" });
    this.menuContent = $("#menu_content");
    this.menuOl = $("#menu_ol");
    this.socketInit();
    this.bubbles = [];
  }

  socketInit() {
    this.socket.on("connect", () => {
      console.log("Connected to server");
    });

    this.socket.on("getBubbles", (bubbles) => {
      bubbles.map((bubble) => {
        const li = new MenuText(bubble.id, bubble.text, bubble.created_at).render();
        this.menuOl.appendChild(li);
      });
    });

    this.socket.on("add", (bubble) => {
      const li = new MenuText(bubble.id, bubble.text, bubble.created_at).render();
      this.menuOl.appendChild(li);
    });

    this.socket.on("delete", (id) => {
      const divs = this.menuOl.childNodes;
      for (let i = 0; i < divs.length; i++) {
        if (divs[i].id === id) {
          this.menuOl.removeChild(divs[i]);
          break;
        }
      }
    });
  }

  init() {
    const menuImg = $("#menu_svg");

    menuImg.addEventListener("click", () => {
      this.menuContent.classList.toggle("show_menu");

      const menuImgPath = $("#menu_svg_path");
      menuImgPath.classList.toggle("change_menu_svg_color");
    });

    document.addEventListener("click", (event) => {
      // 클릭한 요소가 menuContent 또는 menuImg가 아니면 메뉴 닫기
      if (!this.menuContent.contains(event.target) && !menuImg.contains(event.target)) {
        this.menuContent.classList.remove("show_menu");
        const menuImgPath = $("#menu_svg_path");
        menuImgPath.classList.remove("change_menu_svg_color");
      }
    });
  }
}
