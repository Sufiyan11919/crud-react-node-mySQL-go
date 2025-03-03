FROM node:18
RUN apt-get update && apt-get install -y netcat
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8800
CMD ["npm", "start"]