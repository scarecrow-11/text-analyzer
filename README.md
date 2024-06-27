## Description

A Text Analyzer app written in NestJS, PostgreSQL and Prisma

## Pre-requisites

Install Node JS. Las known working version `20.13.1`

Install PostgreSQL

Add a `.env` file in the root directory with the environment variables as demonstrated below.

```env
PORT=4000
DATABASE_URL="postgresql://username:password@localhost:5432/db-name?schema=public"
```

## Installation

```bash
$ npm ci
```

## Database Migration

```bash
# migration
$ npx prisma migrate dev

# type generation
$ npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

You should be able to access the API on `http://localhost:4000` or on the given PORT. All the APIs requested are prefixed with `/texts`. An example API is given below.

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"content": "Dummy Text"}' http://localhost:4000/texts
```
