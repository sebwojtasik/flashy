FROM node:16.13.0-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN npx prisma generate

EXPOSE 4000

CMD ["node", "src/app.js"]