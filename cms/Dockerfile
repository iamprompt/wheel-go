FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat python3 g++ make
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN yarn global add pnpm && pnpm i

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

ARG NEXT_PUBLIC_WHEELGO_API
ENV NEXT_PUBLIC_WHEELGO_API=$NEXT_PUBLIC_WHEELGO_API

RUN yarn build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]