FROM node:lts-alpine
# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application
COPY . .

# Step 6: Build the application using Webpack
RUN npm run build

# Step 7: Install http-server to serve the static files
RUN npm install -g http-server

# Step 8: Expose the port
EXPOSE 8080

# Step 9: Start the http-server
CMD ["http-server", "dist", "-p", "8080"]
