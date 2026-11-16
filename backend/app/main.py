from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import alerts, dashboard, machines

app = FastAPI(title="Smart Factory Monitor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(machines.router)
app.include_router(alerts.router)
app.include_router(dashboard.router)


@app.get("/health")
def health():
    return {"status": "ok"}
