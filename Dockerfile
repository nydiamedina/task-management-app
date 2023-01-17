# Start with the official Node.js image version 19 based on Alpine Linux version 3.16
FROM node:19-alpine3.16

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json .

# Run npm install to install project dependencies
RUN npm install

# Copy all files from the host machine to the working directory in the container
COPY . .

# Build and start the project
CMD ["npm", "run", "start"]