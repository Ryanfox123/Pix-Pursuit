# Pix-Pursuit

Pix pursuit backend handles pursuits and user information.

## Prerequisites

- [node v22](https://nodejs.org/en/blog/announcements/v22-release-announce)
- [Docker](https://www.docker.com/)

## Install dependencies

```sh
pix-pursuit/backend $ npm install
```

## Running the application

Start Postgres container using Docker compose.

```sh
pix-pursuit/backend $ docker compose up -d
```

Before running the application, you'll need to ensure the database has been `migrated` and `seeded`

```sh
pix-pursuit/backend $ npm run setup-dbs
pix-pursuit/backend $ npm run setup-seed
```

Once completed, to start the application:

```sh
pix-pursuit/backend $ npm start
```

## Creating .ENV files

```
PG_USER=ryan
PG_PASSWORD=ryans_pass
PG_HOST=localhost
PG_PORT=6000
PG_DB=postgres
S3_ACCESS_SECRET=
S3_KEY=
S3_REGION=eu-north-1
S3_BUCKET=pix-pursuit
```
