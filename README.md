# iFarmer Website

This repository now contains the standalone Next.js frontend for the iFarmer Agricultural Products Services Limited website.

The backend API is no longer part of this repository. It should be deployed separately, and this frontend should point to that API through environment variables.

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Framer Motion
- Redux Toolkit
- React Hook Form

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Set `NEXT_PUBLIC_API_URL` to your deployed backend API base URL
3. Set `NEXT_PUBLIC_SITE_URL` to the public frontend domain

Example:

```bash
cp .env.example .env.local
```

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Production Notes

- Dynamic blog posts and shop products are fetched from the backend API
- Services and other lower-change content remain embedded in the frontend content layer
- The sitemap and blog/product pages are generated from live backend content where applicable
- The admin area is available at `/admin/login`
