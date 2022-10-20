# Getting Started

Please follow the instructions below to get started

## Install dependencies

```bash
yarn install
```

## Configure environment variables

Create development and production .env configuration files from the env.example template

```bash
cp env.example .env.development.local

cp env.example .env.production.local

```

**.env.development.local** is used in development environments and **.env.production.local** is used when creating production builds.

This project was bootstrapped with [Next.js](https://nextjs.org/docs), which specifies variable naming conventions

Below are the defaults

* PORT -> alternate development port
* NEXT_PUBLIC_GATEWAY_CLIENT_API_URL ->  Gateway client API url

## Start development server

```bash
yarn dev
```

Open [http://localhost:18500](http://localhost:18500) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:18500/api/hello](http://localhost:18500/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Create a production build

Create an optimized production build that can be hosted on servers. This step uses the variables in **.env.production.local**

```bash
yarn build
```

Check the `build` folder for deployable files once complete.

## Deployment

For a Linux/Ubuntu server running apache2 web server, follow these steps to deploy the site
