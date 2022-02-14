# README - Lizzo’s Juicy Juice Bar - The Server

## Prerequisites

- Node
- npm
- A good heart

## Getting Started

Before attempting anything, ensure you have run `npm i` in this directory to install all dependencies.

## Testing

All tests are in the `test` directory. We use `jest` and `supertest` to test our server. Run `npm t` to execute tests.

## Running Dev Server

Run `npm run dev` to run the development server. It is configured to run on localhost:9090 by default.

## Endpoints

- `/api`

  - GET - Returns a 200 and an `ok` message when the server is online

- `/api/recipes`

  - GET - Returns a 200 when all available recipes has been received.
  - GET Returns a 200 when all available recipes where the ingredients are excluded, are returned.

- `/api/recipes/:id`

  - GET - Responds with a 200 for a single recipe corresponding with recipe id.

- `/api/recipes/`
  - POST - responds with a 201 for a new posted recipe

(P.S. If you're looking for the instructions, check out INSTRUCTIONS.md)
