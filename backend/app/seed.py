from datetime import datetime, timedelta

from app.database import SessionLocal
from app.models.alert import Alert
from app.models.machine import Machine


def seed():
    db = SessionLocal()
    try:
        if db.query(Machine).count() > 0:
            print("Seed data already present, skipping.")
            return

        machines = [
            Machine(name="CNC Mill 01", location="Building A - Floor 1", status="online", temperature=58.0),
            Machine(name="Hydraulic Press 02", location="Building A - Floor 2", status="online", temperature=72.5),
            Machine(name="Conveyor Belt 03", location="Building B - Floor 1", status="offline", temperature=22.0),
            Machine(name="Welding Robot 04", location="Building B - Floor 2", status="online", temperature=85.3),
            Machine(name="Packaging Unit 05", location="Building C - Floor 1", status="online", temperature=45.0),
        ]
        db.add_all(machines)
        db.commit()

        now = datetime.utcnow()
        alerts = [
            Alert(machine_id=machines[3].id, message="Welding Robot 04 temperature at 85.3°C", severity="high", created_at=now - timedelta(minutes=5)),
            Alert(machine_id=machines[1].id, message="Hydraulic Press 02 temperature at 72.5°C", severity="medium", created_at=now - timedelta(minutes=20)),
            Alert(machine_id=machines[2].id, message="Conveyor Belt 03 is offline", severity="medium", created_at=now - timedelta(hours=1)),
            Alert(machine_id=machines[0].id, message="CNC Mill 01 scheduled maintenance due", severity="low", created_at=now - timedelta(hours=3), acknowledged=True),
        ]
        db.add_all(alerts)
        db.commit()
        print("Seed data created.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
