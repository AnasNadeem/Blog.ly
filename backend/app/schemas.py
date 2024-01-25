from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import List


class PostBase(BaseModel):
    title: str
    body: str


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    pass


class Post(PostBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class AllPost(BaseModel):
    total: int
    limit: int
    offset: int
    posts: List[Post]
