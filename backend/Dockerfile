FROM node:lts-alpine
WORKDIR /usr/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD [ "node", "src/index.js" ]
