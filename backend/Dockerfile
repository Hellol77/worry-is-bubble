# 베이스 이미지 설정
FROM node:14

# 작업 디렉토리 생성
WORKDIR /app

# 의존성 파일을 복사하고 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# Nginx 설치 및 설정 복사
RUN apt-get update && apt-get install -y nginx
COPY nginx.conf /etc/nginx/conf.d/

# 포트 설정
EXPOSE 3000

# Nginx와 Node.js 서버를 모두 실행
CMD ["sh", "-c", "service nginx start && node src/index.js"]
