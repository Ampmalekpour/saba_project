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

Backend: http://localhost:8000, Frontend: http://localhost:3000.

## Status

Milestone 1 complete: project scaffolding, configuration, and Docker setup.
