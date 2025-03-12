FROM node:18
WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .
COPY .env.production .env
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


RUN npx prisma generate
RUN npm run build

EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]