from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, models
from ..database import get_db

router = APIRouter(
    prefix="/posts",
    tags=["posts"]
)


@router.get("/", response_model=List[schemas.Post])
def get_all_posts(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    """GET - Posts with pagination"""
    posts = db.query(models.Post).offset(skip).limit(limit).all()
    return posts


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_post(request: schemas.PostCreate, db: Session = Depends(get_db)):
    """POST - Post"""
    try:
        new_post = models.Post(title=request.title, body=request.body)
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return new_post
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {e}")


@router.get("/{id}", response_model=schemas.Post)
def get_post(id: int, db: Session = Depends(get_db)):
    """GET <id> - Post"""
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post not found with id - {id}")
    return post


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_post(id: int, request: schemas.PostUpdate, db: Session = Depends(get_db)):
    """PUT <id> - Post"""
    post = db.query(models.Post).filter(models.Post.id == id)
    if not post.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post not found with id - {id}")

    post.update({"title": request.title, "body": request.body})
    db.commit()
    return {"message": "Post updated successfully"}


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    """DELETE <id> - Post"""
    post = db.query(models.Post).filter(models.Post.id == id)
    if not post.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post not found with id - {id}")

    post.delete(synchronize_session=False)
    db.commit()
    return {"message": "Post deleted successfully"}