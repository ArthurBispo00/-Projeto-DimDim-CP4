
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build


FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
RUN addgroup -S stevejobs && adduser -S stevejobs -G stevejobs
USER stevejobs

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
