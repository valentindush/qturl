# URL Shortener

A full-stack URL shortener application built with Next.js (client) and NestJS (server).

## Project Structure

```
url-shortener/
├── client/        # Next.js frontend
└── server/        # NestJS backend
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm, pnpm, or yarn
- Docker and Docker Compose (for containerized setup)

### Environment Setup

Before running the application, you need to set up environment variables:

1. For the server:
   ```bash
   cd server
   cp .env.example .env
   ```

2. For the client:
   ```bash
   cd client
   cp .env.example .env.local
   ```

## Running the Application

### Option 1: Using Docker Compose (Recommended)

From the root directory:

```bash
docker compose up
```

This will start both the client and server services. The client will be available at http://localhost:3000 and the server at http://localhost:3001.

To stop the services:

```bash
docker compose down
```

### Option 2: Running Manually

#### Server

Navigate to the server directory and run:

Using npm:
```bash
cd server
npm install
npx prisma migrate dev # or npx prisma db push
npm run dev
```

Using yarn:
```bash
cd server
yarn
npx prisma migrate dev # or npx prisma db push
yarn dev
```

Using pnpm:
```bash
cd server
pnpm install
pnpm dlx prisma migrate dev # or npx prisma db push
pnpm dev
```

#### Client

Navigate to the client directory and run:

Using npm:
```bash
cd client
npm install
npm run dev
```

Using yarn:
```bash
cd client
yarn
yarn dev
```

Using pnpm:
```bash
cd client
pnpm install
pnpm dev
```

