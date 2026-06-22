# Stage Hand

A full-stack rehearsal scheduling app for small theatre companies. Directors and stage managers can create productions, add cast and crew, set rehearsal slots, and mark who's called for each one. Cast members can log in to view their own schedule.

## Features

- Create an account and log in, with JWT authentication persisted across page refreshes
- Create and manage productions with title and show dates
- Add and remove cast and crew members from a production
- Create rehearsal slots with date, time, location, and notes
- Call specific cast members to specific rehearsals
- Cast members can view their own upcoming schedule
- Confirm or send apologies for a rehearsal call

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- A running instance of the Stage Hand API

### Installation

1. Clone the repo:

```bash
git clone https://github.com/espiers13/stagehand-fe.git
cd stagehand-fe
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
VITE_API_URL=your_backend_url
```

4. Run the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── api/             # Axios calls to the Stage Hand API
├── components/      # Reusable UI: RehearsalCard, CallList, ProductionMemberList, etc.
├── context/         # UserContext for auth state (user, token, login/logout)
├── pages/           # Route-level pages: Dashboard, Production, Schedule, Login, Register
├── utils/           # Helper functions
├── App.jsx          # Route definitions and protected route wrapper
└── main.jsx         # App entry point
```

## Pages

| Page          | Route                              | Description                                              |
| ------------- | ---------------------------------- | -------------------------------------------------------- |
| Login         | `/login`                           | Log in to your account                                   |
| Register      | `/register`                        | Create a new account                                     |
| Dashboard     | `/dashboard`                       | View all your productions as an admin or cast member     |
| Production    | `/productions/:id`                 | Manage rehearsals, cast, and production details          |
| New Rehearsal | `/productions/:id/rehearsals/new`  | Create a new rehearsal slot                              |
| Schedule      | `/schedule`                        | Personal view of your upcoming rehearsal calls           |

## Tech Stack

- **React** — UI framework
- **Vite** — build tool
- **React Router** — client-side routing
- **Axios** — API requests
- **Tailwind CSS** — styling
- **Node.js / Express** — backend API
- **PostgreSQL** — database
- **JWT** — authentication
- **Bcrypt** — password hashing
