class Ball {
  constructor(x, y, radius, dx, dy, color, text) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.text = text;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    ctx.font = `${this.radius}px Arial`;
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, this.x, this.y);
  }

  update(canvas) {
    // 벽과 충돌 확인
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx *= -1; // x 방향 속도 반전
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy *= -1; // y 방향 속도 반전
    }

    // 물방울 위치 업데이트
    this.x += this.dx;
    this.y += this.dy;
  }

  isClicked(mouseX, mouseY) {
    const dist = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
    return dist < this.radius;
  }
}

// 캔버스 설정
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 여러 물방울 생성
const balls = [];
for (let i = 0; i < 30; i++) {
  const radius = 70;
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const speed = 2; // 물방울 속도
  const angle = Math.random() * 2 * Math.PI; // 랜덤한 각도
  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  balls.push(new Ball(x, y, radius, dx, dy, color, "안녕"));
}

// 애니메이션 함수
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
  balls.forEach((ball) => {
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

  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].isClicked(mouseX, mouseY)) {
      // 클릭된 물방울에 대한 동작 수행
      console.log(`Ball clicked! Color: ${balls[i].color}`);
      // 클릭된 물방울 제거
      balls.splice(i, 1);
      break; // 첫 번째 클릭된 물방울을 찾으면 루프 종료
    }
  }
});
