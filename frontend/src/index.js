import Bubble from "./components/bubble";
import bubble1 from "./assets/images/bubble1.png";
import bubble2 from "./assets/images/bubble2.png";
import bubble3 from "./assets/images/bubble3.png";
import bubble4 from "./assets/images/bubble4.png";
// 캔버스 설정
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [bubble1, bubble2, bubble3, bubble4];
// 여러 물방울 생성
const bubbles = [];
for (let i = 0; i < 30; i++) {
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const speed = 1; // 물방울 속도
  // const angle = Math.random() * 2 * Math.PI; // 랜덤한 각도
  const dx = Math.random() * speed * 2 - speed;
  const dy = Math.random() * speed * 2 - speed;
  const imageIndex = Math.floor(Math.random() * 4);
  bubbles.push(
    new Bubble(
      x,
      y,
      speed,
      dx,
      dy,
      images[imageIndex],
      "안녕하세요qwdqwdqwdwwqwd"
    )
  );
}

// 애니메이션 함수
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
  bubbles.forEach((ball) => {
    ball.draw(ctx);
    ball.update(canvas);
  });

  requestAnimationFrame(animate); // 애니메이션 프레임 요청
}

// 애니메이션 시작
animate();

// 창 크기 조정 시 캔버스 크기 업데이트
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

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
