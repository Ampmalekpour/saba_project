from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.machine import Machine


def check_temperature(db: Session, machine: Machine) -> Alert | None:
    """Raise an alert if the machine's temperature crosses a threshold.

    Skips creating a new alert if an unacknowledged alert for the same
    machine and severity is already active, so repeated updates while the
    temperature stays in the same band don't spam duplicate alerts.
    """
    if machine.temperature > 80:
        severity = "high"
    elif machine.temperature >= 65:
        severity = "medium"
    else:
        return None

    existing = (
        db.query(Alert)
        .filter(
            Alert.machine_id == machine.id,
            Alert.severity == severity,
            Alert.acknowledged.is_(False),
        )
        .first()
    )
    if existing:
        return None

    alert = Alert(
        machine_id=machine.id,
        message=f"{machine.name} temperature at {machine.temperature}°C",
        severity=severity,
    )
    db.add(alert)
    return alert
