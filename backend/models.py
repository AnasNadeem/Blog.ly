# Post - title, body, created_at, updated_at
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from .database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
