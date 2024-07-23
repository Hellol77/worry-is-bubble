export default class Bubble {
  constructor(x, y, speed, dx, dy, imageSrc, text) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
    this.text = text;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    // tempCtx.font = "bold 20px Arial"; // 기본 폰트 설정
    const textWidth = tempCtx.measureText(text).width;
    const textHeight = 20;
    this.radius = Math.max(textWidth, textHeight); // 여백을 포함하여 계산

    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
    this.imageLoaded = false;
  }

  draw(ctx) {
    if (this.imageLoaded) {
      const imageRadius = this.radius * 2;
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = imageRadius;
      tempCanvas.height = imageRadius;

      // 원형 클리핑을 위한 원형 마스크 생성
      tempCtx.beginPath();
      tempCtx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2);
      tempCtx.clip();
      tempCtx.drawImage(this.image, 0, 0, imageRadius, imageRadius);

      // 원형 이미지 캔버스의 데이터를 메인 캔버스로 복사
      ctx.drawImage(tempCanvas, this.x - this.radius, this.y - this.radius);

      // 텍스트 그리기
      ctx.font = `0.9rem Arial`;
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.text, this.x, this.y);
    }
  }

  update(canvas) {
    // 벽과 충돌 확인
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx *= -1; // x 방향 속도 반전
      this.dy = Math.random() * this.speed * 2 - this.speed; // 새로운 랜덤 y 방향 속도
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dx = Math.random() * this.speed * 2 - this.speed; // 새로운 랜덤 x 방향 속도
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
