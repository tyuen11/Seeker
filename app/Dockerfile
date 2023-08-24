
# Use the official Node.js image as the base image for building
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

COPY package.json package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli
RUN npm install -g typescript@4.9.4

# Install dependencies
RUN npm install

# Copy the entire frontend project to the container
COPY . .

# Build the Angular app
RUN npm run build

# Use a smaller image for serving
FROM nginx:alpine

# Copy the NGINX configuration file
COPY /nginx/default.conf /etc/nginx/default.conf

# Copy the build output from the previous stage to the nginx server
COPY --from=build /app/dist/app/ /usr/share/nginx/html/

EXPOSE 80

