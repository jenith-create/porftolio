# porftolio
# Portfolio Website

![CI](https://github.com/jenith-create/porftolio/actions/workflows/ci.yml/badge.svg)

Personal portfolio website with a working contact form. Messages sent from the form are saved to MongoDB through a Node.js/Express API.

**Live site:** <your Render URL>

## Features

- Sections for About Me, languages I know, and certificates (PDFs open in a new tab)
- Frontend served directly by the Express server
- Contact form that saves name, email and message to MongoDB Atlas
- REST API with input validation on the contact endpoint
- Admin-only endpoint to read submitted messages
- Secrets and connection strings kept in environment variables, never in code
- Automatic build and deploy on Render for every push to `main`

## Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Frontend   | HTML, CSS, JavaScript              |
| Backend    | Node.js, Express                   |
| Database   | MongoDB Atlas, Mongoose            |
| Config     | dotenv                             |
| Hosting    | Render                             |
| CI         | GitHub Actions                     |

## Project Structure

```
.
├── backend/
│   ├── server.js            # Express app and API routes
│   └── package.json
├── frontend/
│   ├── index.html           # Page content and contact form
│   ├── style.css            # Styling
│   ├── script.js            # Sends the contact form to the API
│   └── certificates/        # Certificate PDFs linked from the site
└── .github/workflows/ci.yml
```

## API

| Method | Endpoint    | Description                                            |
| ------ | ----------- | ------------------------------------------------------ |
| POST   | `/contact`  | Saves a message. Body: `{ name, email, message }`      |
| GET    | `/messages` | Returns all messages. Requires the `x-admin-key` header |

## Run Locally

Prerequisites: Node.js 18+ and a MongoDB Atlas connection string.

```bash
git clone https://github.com/jenith-create/porftolio.git
cd porftolio/backend
npm install
cp ../.env.example .env      # then fill in your own values
node server.js
```

The app runs at `http://localhost:10000` unless `PORT` is set.

## Environment Variables

Create a `.env` file (never commit it). See `.env.example` for the template.

| Variable    | Description                                       |
| ----------- | ------------------------------------------------- |
| `MONGO_URI` | MongoDB Atlas connection string                   |
| `ADMIN_KEY` | Secret key required to read `/messages`           |
| `PORT`      | Port to listen on (Render sets this automatically) |

## Deployment

The site is deployed on [Render](https://render.com) as a web service connected to this GitHub repository.

- Every push to `main` triggers an automatic build and deploy
- Root directory: `backend`
- Build command: `npm install`
- Start command: `node server.js`
- Environment variables are set in the Render dashboard, not stored in the repo
- The server reads the port from `process.env.PORT`, as Render requires

## CI

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and pull request to `main`. It installs dependencies and runs the build and test scripts if they exist.

## Author

Jenith · [GitHub](https://github.com/jenith-create)
