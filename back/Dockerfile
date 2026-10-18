FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
EXPOSE 3000
COPY . .
CMD ["npm","start"]