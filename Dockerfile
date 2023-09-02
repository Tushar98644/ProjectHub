FROM node:18-alpine3.18 as builder
WORKDIR /app

# Install PM2 globally
RUN npm install --global pm2

COPY package.json  pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --prod
COPY . .
RUN pnpm build

FROM nginx
COPY --from=builder /app/.next /usr/share/nginx/html