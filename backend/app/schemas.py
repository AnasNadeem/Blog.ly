from pydantic import BaseModel
from datetime import datetime


class PostBase(BaseModel):
    title: str
    body: str


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    pass


class Post(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True