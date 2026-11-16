from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, Field


class MachineStatus(str, Enum):
    online = "online"
    offline = "offline"


class MachineBase(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(..., min_length=1, max_length=100)
    location: str = Field(..., min_length=1, max_length=100)
    status: MachineStatus
    temperature: float = Field(..., ge=-50, le=200)


class MachineCreate(MachineBase):
    pass


class MachineUpdate(MachineBase):
    pass


class MachineRead(MachineBase):
    model_config = ConfigDict(from_attributes=True, str_strip_whitespace=True)

    id: int
    last_updated: datetime
