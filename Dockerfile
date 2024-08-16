# Step 1: Build the React app using Node.js
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies (using --omit=dev to omit devDependencies)
RUN npm install --omit=dev

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the static files using Nginx
FROM nginx:alpine

# Copy the built files from the previous step to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
