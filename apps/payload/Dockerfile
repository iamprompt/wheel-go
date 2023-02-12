FROM node:alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@wheel-go/payload --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
RUN yarn global add pnpm
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/.husky .
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG PAYLOAD_PUBLIC_APP_URL
ENV PAYLOAD_PUBLIC_APP_URL=$PAYLOAD_PUBLIC_APP_URL

ARG PAYLOAD_PUBLIC_SERVER_URL
ENV PAYLOAD_PUBLIC_SERVER_URL=$PAYLOAD_PUBLIC_SERVER_URL

RUN pnpm turbo run build --filter=@wheel-go/payload

FROM node:alpine AS runner
WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/payload/node_modules ./apps/payload/node_modules
COPY --from=installer /app/apps/payload/build ./apps/payload/build
COPY --from=installer /app/apps/payload/dist ./apps/payload/dist

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=apps/payload/dist/payload.config.js

ENV PORT 3000
EXPOSE 3000

CMD node apps/payload/dist/server.js