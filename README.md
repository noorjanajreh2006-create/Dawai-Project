# Dawai Project

Dawai is a React + Express medication tracker. The frontend runs on Create React App, and the backend uses Express, Sequelize, JWT authentication, and MySQL.

## Project Structure

```text
backend/
  config/db.js
  controllers/
  middleware/
  models/
  routes/
  server.js
src/
  Pages/
  Components/
  data/
  api.js
```

## Setup

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
npm --prefix backend install
```

Create `backend/.env` from `backend/.env.example` and set the MySQL credentials:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
DB_HOST=localhost
DB_NAME=dawai
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=change-this-secret
```

The backend creates the `dawai` database automatically if the MySQL user has permission.

## Run

Run frontend only:

```bash
npm start
```

Run backend only:

```bash
npm run backend
```

Run frontend and backend together:

```bash
npm run dev
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:5000`

## Features

- Register and login with JWT.
- View and update profile.
- Add, edit, delete medications.
- Log taken doses.
- View weekly adherence statistics.
