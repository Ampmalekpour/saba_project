from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.machine import Machine
from app.schemas.machine import MachineCreate, MachineRead, MachineStatus, MachineUpdate
from app.services.anomaly import check_temperature

router = APIRouter(prefix="/machines", tags=["machines"])


@router.get("", response_model=list[MachineRead])
def list_machines(
    search: str | None = None,
    status: MachineStatus | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Machine)
    if search:
        query = query.filter(Machine.name.ilike(f"%{search}%"))
    if status:
        query = query.filter(Machine.status == status.value)
    return query.order_by(Machine.id).all()


@router.post("", response_model=MachineRead)
def create_machine(payload: MachineCreate, db: Session = Depends(get_db)):
    machine = Machine(**payload.model_dump())
    db.add(machine)
    db.commit()
    check_temperature(db, machine)
    db.commit()
    db.refresh(machine)
    return machine


@router.put("/{machine_id}", response_model=MachineRead)
def update_machine(machine_id: int, payload: MachineUpdate, db: Session = Depends(get_db)):
    machine = db.get(Machine, machine_id)
    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")
    for field, value in payload.model_dump().items():
        setattr(machine, field, value)
    machine.last_updated = datetime.utcnow()
    db.commit()
    check_temperature(db, machine)
    db.commit()
    db.refresh(machine)
    return machine


@router.delete("/{machine_id}")
def delete_machine(machine_id: int, db: Session = Depends(get_db)):
    machine = db.get(Machine, machine_id)
    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")
    db.delete(machine)
    db.commit()
    return {"ok": True}
