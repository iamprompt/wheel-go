FROM node:18-alpine AS base
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM base AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY ./data ./data
COPY --from=build /app/node_modules ./node_modules

RUN mkdir -p /uploads

VOLUME [ "/app/uploads" ]

CMD ["node", "dist/main.js"]