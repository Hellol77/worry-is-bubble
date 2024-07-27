# Step 1: Use a Node.js base image to build the application
FROM node:lts-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application using Webpack
RUN npm run build

# Step 2: Use an Nginx base image to serve the static files
FROM nginx:alpine

# Copy the build output to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
