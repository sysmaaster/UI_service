#Build stage
FROM node:18 AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock\ .

#RUN  npm install -g npm@10.8.0

RUN yarn install

COPY . .

RUN yarn build

#Production stage
#FROM node:18 AS production
#WORKDIR /app
#COPY package.json .
#COPY package-lock.json .
#RUN  npm install -g npm@10.8.0
#RUN npm ci --only=production
#COPY --from=build /app/dist ./dist
#CMD ["node", "dist/index.js"]