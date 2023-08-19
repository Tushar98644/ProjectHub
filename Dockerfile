FROM node:18-alpine3.18
WORKDIR /apps
COPY package.json  .
RUN npm install -g pnpm
RUN pnpm install --prod
COPY . .
CMD ["pnpm", "dev"]