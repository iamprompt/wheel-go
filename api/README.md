# Wheel Go – Content Management System (CMS)

## Technologies

- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://nestjs.com/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Passport.js](http://www.passportjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Requirements

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB](https://www.mongodb.com/)

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:iamprompt/wheel-go-api.git
```

2. Install dependencies

```bash
pnpm install
```

3. Update environment variables

```bash
cp .env.example .env
```

Change the values in `.env.local` to match your environment.

4. Start the development server

```bash
pnpm dev
```

## Deployment

1. Build the Docker image

```bash
docker build -t wheel-go-api .
```

2. Run the Docker container

```bash
docker run -p 3000:3000 wheel-go-api
```

## GraphQL Playground + Schema

- [GraphQL Playground](https://api.wheelgo.iamprompt.me/graphql)
