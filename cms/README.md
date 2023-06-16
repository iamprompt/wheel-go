# Wheel Go – Content Management System (CMS)

## Technologies

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mantine](https://mantine.dev/)

## Requirements

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:iamprompt/wheel-go-cms.git
```

2. Install dependencies

```bash
pnpm install
```

3. Update environment variables

```bash
cp .env .env.local
```

Change the values in `.env.local` to match your environment.

4. Start the development server

```bash
pnpm dev
```

## Deployment

1. Build the Docker image

```bash
docker build --build-arg NEXT_PUBLIC_WHEELGO_API={{WHEELGO_API_URL}} --build-arg NEXT_PUBLIC_GOOGLE_MAPS_API_KEY={{GOOGLE_MAPS_API_KEY}} -t wheel-go-cms .
```

2. Run the Docker container

```bash
docker run -p 3000:3000 wheel-go-cms
```
