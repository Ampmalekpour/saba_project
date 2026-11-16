# Smart Factory Monitor

Lightweight full-stack industrial monitoring dashboard (learning MVP).

Stack: Next.js + React + TypeScript + Tailwind + Ant Design + TanStack Query + Zustand + Axios (frontend), FastAPI + SQLAlchemy + Alembic + SQLite (backend).

## Local setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
python -m app.seed
uvicorn app.main:app --reload
```

API runs at http://localhost:8000.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

App runs at http://localhost:3000.

## Docker

```bash
docker compose up --build
```

The backend container runs migrations and seeds data automatically on startup.

Backend: http://localhost:8000, Frontend: http://localhost:3000.

## Features

- Dashboard with machine/alert counts and status overview
- Machine CRUD with search and status filter
- Alerts list with severity and acknowledge action
- Rule-based temperature anomaly detection (>80°C high, 65-80°C medium), triggered on machine create/update

## Status

All milestones complete: backend API, frontend dashboard, machine/alert management, and Docker setup.
