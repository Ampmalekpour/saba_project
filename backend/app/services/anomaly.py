from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.machine import Machine


def check_temperature(db: Session, machine: Machine) -> Alert | None:
    """Raise an alert if the machine's temperature crosses a threshold."""
    if machine.temperature > 80:
        severity = "high"
    elif machine.temperature >= 65:
        severity = "medium"
    else:
        return None

    alert = Alert(
        machine_id=machine.id,
        message=f"{machine.name} temperature at {machine.temperature}°C",
        severity=severity,
    )
    db.add(alert)
    return alert
