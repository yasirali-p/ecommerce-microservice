# Use Node.js LTS version as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the app
COPY . .

# Expose a port (optional, but good practice)
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]
