FROM node:lts-iron
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .
RUN npm i
RUN npm cache clean --force
RUN npm install -g dotenv-cli
RUN dotenv -e .env -- npx prisma db pull
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]