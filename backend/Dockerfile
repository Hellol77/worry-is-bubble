# 1. Build the Node.js application
FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# 2. Production stage with Nginx
FROM nginx:alpine

# 3. Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 4. 빌드된 애플리케이션 복사
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# 5. Nginx 포트 노출
EXPOSE 80

# 6. Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
