# Use an official Node runtime as a parent image
FROM node:16-alpine

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
# RUN npm install --production 이건 지금 에러남
RUN npm install 

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application files to the container
COPY . .

# Check if tsconfig.json exists and create it if it doesn't
RUN [ ! -e tsconfig.json ] && tsc --init || echo "tsconfig.json exists"

# Build the TypeScript code
RUN tsc

# Expose the port that the app will run on
EXPOSE 80

# Start the app
CMD ["npm", "run", "dev"]