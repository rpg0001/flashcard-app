# Flashcard app
[![CI](https://github.com/rpg0001/flashcard-app/actions/workflows/ci.yml/badge.svg?event=pull_request)](https://github.com/rpg0001/flashcard-app/actions/workflows/ci.yml)
- To run app, run `npm i` then `npm start` in /api and in /ui.
- API requires a .env file with the following variables:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=***
DB_NAME=flashcard_app
NODE_ENV=development
LOG_LEVEL=http
PORT=8080
ADMIN_KEY=***
SECRET=***
```
