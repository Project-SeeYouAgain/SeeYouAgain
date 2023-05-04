# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
# RUN npm install --production 이건 지금 에러남
RUN npm install 

# Copy the rest of the application files to the container
COPY . .

# Build the production version of the app
RUN npm run build

# Expose the port that the app will run on2332
EXPOSE 80

# Start the app 이거는 docker run이 될때 이 명령어가 불리는거임
CMD ["npm", "start"]