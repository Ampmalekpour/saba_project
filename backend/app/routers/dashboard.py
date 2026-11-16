from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.alert import Alert
from app.models.machine import Machine
from app.schemas.alert import AlertRead

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary")
def summary(db: Session = Depends(get_db)):
    machines = db.query(Machine).all()
    online = sum(1 for m in machines if m.status == "online")
    active_alerts = db.query(Alert).filter(Alert.acknowledged.is_(False)).count()
    recent_alerts = (
        db.query(Alert).order_by(Alert.created_at.desc()).limit(5).all()
    )

    return {
        "total_machines": len(machines),
        "online_machines": online,
        "offline_machines": len(machines) - online,
        "active_alerts": active_alerts,
        "recent_alerts": [AlertRead.model_validate(a) for a in recent_alerts],
        "machines": [
            {"id": m.id, "name": m.name, "status": m.status} for m in machines
        ],
    }
