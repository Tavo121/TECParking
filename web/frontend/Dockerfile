FROM node:20.18-alpine AS BUILD

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install


COPY index.html vite.config.js ./
COPY src ./src
COPY styles ./styles
COPY postcss.config.js tailwind.config.js ./

ARG VITE_APP_API_URL=http://localhost:3001
ENV VITE_APP_API_URL=${VITE_APP_API_URL}

RUN npm run build


#Runtime 
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY --from=BUILD --chown=101:101 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 8080