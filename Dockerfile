# Use the latest LTS version of Node.js
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Define the command to run your app
CMD ["npm", "run", "dev", "--", "--host"]
