import Bubble from "../components/bubble";
import bubble1 from "../assets/images/bubble1.png";
import bubble2 from "../assets/images/bubble2.png";
import bubble3 from "../assets/images/bubble3.png";
import bubble4 from "../assets/images/bubble4.png";
import { v4 as uuidv4 } from "uuid";
import socket from "../apis/socket";

export default class CanvasController {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    this.images = [bubble1, bubble2, bubble3, bubble4];
    this.text = [
      "제 고민은...",
      "무엇일까요?",
      "물방울을 클릭해보세요!",
      "취업하고 싶어요!",
      "개발 잘하고 싶어요!",
    ];
    this.bubbles = [];
  }
  init() {
    // this.getBubbles();
    this.start();
    this.handleClick();
    this.handleHover();
    this.generateBubbles();
  }

  getBubbles() {
    this.bubbles = socket();
  }

  generateBubbles() {
    for (let i = 0; i < 80; i++) {
      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;
      const speed = 2; // 물방울 속도
      const dx = Math.random() * speed * 2 - speed;
      const dy = Math.random() * speed * 2 - speed;
      const imageIndex = Math.floor(Math.random() * 5);

      this.bubbles.push(
        new Bubble(
          uuidv4(),
          x,
          y,
          speed,
          dx,
          dy,
          this.images[imageIndex],
          this.text[Math.floor(Math.random() * 4)]
        )
      );
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 캔버스 초기화
    this.bubbles.forEach((bubble) => {
      bubble.draw(this.ctx);
      bubble.update(this.canvas);
    });

    requestAnimationFrame(this.animate.bind(this)); // 애니메이션 프레임 요청
  }

  start() {
    this.animate();
  }

  handleClick() {
    this.canvas.addEventListener("mousedown", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      for (let i = this.bubbles.length - 1; i >= 0; i--) {
        if (this.bubbles[i].isClicked(mouseX, mouseY)) {
          // 클릭된 물방울에 대한 동작 수행
          console.log(`Ball clicked! Color: ${this.bubbles[i].color}`);

          // 클릭된 물방울 제거
          this.bubbles.splice(i, 1);
          break; // 첫 번째 클릭된 물방울을 찾으면 루프 종료
        }
      }
    });
  }

  handleHover() {
    this.canvas.addEventListener("mousemove", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      let hovered = false;
      for (let i = 0; i < this.bubbles.length; i++) {
        if (this.bubbles[i].isClicked(mouseX, mouseY)) {
          hovered = true;
          break;
        }
      }

      if (hovered) {
        this.canvas.style.cursor = "pointer";
      } else {
        this.canvas.style.cursor = "default";
      }
    });
  }
}
