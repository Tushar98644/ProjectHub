FROM node:18-alpine3.18
WORKDIR /
COPY package.json pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install --prod
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]