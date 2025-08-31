# front-produtos/Dockerfile
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
ARG NEXT_PUBLIC_API_BASE
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app ./
RUN addgroup -S stevejobs && adduser -S stevejobs -G stevejobs
RUN apk add --no-cache curl
USER stevejobs
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
