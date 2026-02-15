FROM node:lts-slim
WORKDIR /usr/src/app
COPY . .
CMD ["sh", "-c", "npm install && npm run dev"]
#CMD ["sh", "-c", "npm run dev"]