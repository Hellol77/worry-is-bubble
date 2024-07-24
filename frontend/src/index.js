import Bubble from "./components/bubble";
import bubble1 from "./assets/images/bubble1.png";
import bubble2 from "./assets/images/bubble2.png";
import bubble3 from "./assets/images/bubble3.png";
import bubble4 from "./assets/images/bubble4.png";
import { v4 as uuidv4 } from "uuid";
import CanvasController from "./controller/canvasController";

// 캔버스 설정
CanvasController();
const ctx = canvas.getContext("2d");

const images = [bubble1, bubble2, bubble3, bubble4];
// 여러 물방울 생성
const text = [
  "제 고민은...",
  "무엇일까요?",
  "물방울을 클릭해보세요!",
  "취업하고 싶어요!",
];
const bubbles = [];
for (let i = 0; i < 80; i++) {
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const speed = 2; // 물방울 속도
  const dx = Math.random() * speed * 2 - speed;
  const dy = Math.random() * speed * 2 - speed;
  const imageIndex = Math.floor(Math.random() * 4);
  bubbles.push(
    new Bubble(
      uuidv4(),
      x,
      y,
      speed,
      dx,
      dy,
      images[imageIndex],
      text[Math.floor(Math.random() * 4)]
    )
  );
}

// 애니메이션 함수
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
  bubbles.forEach((bubble) => {
    bubble.draw(ctx);
    bubble.update(canvas);
  });

  requestAnimationFrame(animate); // 애니메이션 프레임 요청
}

// 애니메이션 시작
animate();

// 클릭 이벤트 처리 함수

canvas.addEventListener("mousedown", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].isClicked(mouseX, mouseY)) {
      // 클릭된 물방울에 대한 동작 수행
      console.log(`Ball clicked! Color: ${bubbles[i].color}`);
      // 클릭된 물방울 제거
      bubbles.splice(i, 1);
      break; // 첫 번째 클릭된 물방울을 찾으면 루프 종료
    }
  }
});

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  let hovered = false;
  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].isClicked(mouseX, mouseY)) {
      hovered = true;
      break;
    }
  }

  if (hovered) {
    canvas.style.cursor = "pointer";
  } else {
    canvas.style.cursor = "default";
  }
});
