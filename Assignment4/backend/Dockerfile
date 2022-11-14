FROM node:lts-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD ["sleep", "1d"]