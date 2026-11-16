from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MachineBase(BaseModel):
    name: str
    location: str
    status: str
    temperature: float


class MachineCreate(MachineBase):
    pass


class MachineUpdate(MachineBase):
    pass


class MachineRead(MachineBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    last_updated: datetime
