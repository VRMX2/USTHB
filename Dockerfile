# Pull base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build for web (Expo)
RUN npx expo export -p web

# Verify build
RUN ls -la dist

# Expose port
EXPOSE 8080

# Serve static files
CMD ["npx", "serve", "dist", "-l", "8080"]
