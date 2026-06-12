FROM node:20.18-alpine

WORKDIR /app

# user with limited permissions for security
RUN addgroup -g 1001 -S app && adduser -u 1001 -S app -G app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

RUN mkdir -p uploads

RUN chown -R app:app /app

USER app

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "server.js"]