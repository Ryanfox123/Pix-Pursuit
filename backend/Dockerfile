# Use the official Node.js 22 image as a base
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 9090 for the application
EXPOSE 9090
# Run the seed script and then start the application
CMD ["sh", "-c", "npm start"]
