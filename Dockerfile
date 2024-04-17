FROM node:20.11.1-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.11.1-alpine

WORKDIR /app

COPY --from=builder /app/dist .

EXPOSE 3000

CMD ["npm", "start"]