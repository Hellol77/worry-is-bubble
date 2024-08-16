import Bubble from "../components/bubble";
import bubble1 from "../assets/images/bubble1.png";
import bubble2 from "../assets/images/bubble2.png";
import bubble3 from "../assets/images/bubble3.png";
import bubble4 from "../assets/images/bubble4.png";
import io from "socket.io-client";
import bubblePop from "../assets/audio/bubblePop.mp3";
import { $ } from "../utils/querySelector";

export default class CanvasController {
  constructor() {
    this.socket = io(process.env.SOCKET_IP, { path: "/api" });
    this.canvas = $("#canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.bubblePopAudio = new Audio(bubblePop);

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    this.images = [bubble1, bubble2, bubble3, bubble4];
    this.bubbles = [];

    this.socketInit();
  }

  socketInit() {
    this.socket.on("connect", () => {
      console.log("Connected to server");
    });

    this.socket.on("getBubbles", (bubbles) => {
      this.bubbles = bubbles.map((bubble) => {
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2;
        const speed = 2;
        const dx = Math.random() * speed * 2 - speed;
        const dy = Math.random() * speed * 2 - speed;
        const imageIndex = Math.floor(Math.random() * this.images.length);

        return new Bubble(
          bubble.id,
          x,
          y,
          speed,
          dx,
          dy,
          this.images[imageIndex],
          bubble.text,
          bubble.strength
        );
      });
    });

    this.socket.on("add", (data) => {
      this.addBubble(data);
    });

    this.socket.on("delete", (id) => {
      for (let i = 0; i < this.bubbles.length; i++) {
        if (this.bubbles[i].id === id) {
          this.bubbles.splice(i, 1);
          this.bubblePopAudio.play();
          break;
        }
      }
    });
  }

  init() {
    this.start();
    this.handleClick();
    this.handleHover();
  }

  addBubble(bubble) {
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    const speed = 2;
    const dx = Math.random() * speed * 2 - speed;
    const dy = Math.random() * speed * 2 - speed;
    const imageIndex = Math.floor(Math.random() * this.images.length);
    console.log(bubble);
    const newBubble = new Bubble(
      bubble.id, // 고유 ID
      x,
      y,
      speed,
      dx,
      dy,
      this.images[imageIndex],
      bubble.text,
      bubble.strength
    );

    this.bubbles.push(newBubble);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bubbles.forEach((bubble) => {
      bubble.draw(this.ctx);
      bubble.update(this.canvas);
    });

    requestAnimationFrame(this.animate.bind(this));
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
          this.socket.emit("deleteBubble", this.bubbles[i].id);
          this.bubblePopAudio.play();
          this.bubbles.splice(i, 1);
          break;
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

      this.canvas.style.cursor = hovered ? "pointer" : "default";
    });
  }
}
