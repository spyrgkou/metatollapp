FROM node:16.13.2-alpine

WORKDIR /backend

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 9103

VOLUME ["/backend/node_modules"]

# CMD ["npm", "start", "dev"]
CMD ["npm", "run", "dev"]