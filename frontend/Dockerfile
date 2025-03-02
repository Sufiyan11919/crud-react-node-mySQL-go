FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
# Running the dev server with --host so that it listens on 0.0.0.0 (All IPs)
CMD ["npm", "run", "preview"]
