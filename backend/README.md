# Backend - monstack-excel-search

Simple Express + MongoDB API to import Excel and search/paginate records.

## Setup

1. Copy `.env.example` to `.env` and adjust values.
2. Install deps: `npm install`
3. Start server: `npm run dev` (with nodemon) or `npm start`

## Scripts
- `npm run import-excel` to import `./data.xlsx` into `Record` collection (expects columns: source, age, salary).
