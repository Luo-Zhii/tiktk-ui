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


#COMMAND 
# docker build -t tiktk-ui . 
# docker run -d -p 5173:5173 tiktk-ui 
# docker login 
# docker tag tiktk-ui:latest luozhii/tiktk-ui:latest
# docker push luozhii/tiktk-ui:latest