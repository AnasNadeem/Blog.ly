from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..schemas import (
    PostCreate,
    PostUpdate,
    Post,
    AllPost,
)
from ..models import (
    Post as PostModel,
)
from ..database import get_db

router = APIRouter(
    prefix="/api/posts",
    tags=["posts"]
)


@router.get("/", response_model=AllPost)
def get_all_posts(db: Session = Depends(get_db), limit: int = 10, offset: int = 0, search: str = None):
    """GET - Posts with pagination"""
    posts = (db.query(PostModel)
             .filter(PostModel.title.icontains(search if search else ""))
             )
    total = posts.count()
    posts = (posts
             .limit(limit)
             .offset(offset)
             .all()
             )
    return AllPost(total=total, limit=limit, offset=offset, posts=posts)


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_post(request: PostCreate, db: Session = Depends(get_db)):
    """POST - Post"""
    try:
        new_post = PostModel(title=request.title, body=request.body)
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return new_post
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error: {e}")


@router.get("/{id}", response_model=Post)
def get_post(id: int, db: Session = Depends(get_db)):
    """GET <id> - Post"""
    post = db.query(PostModel).filter(PostModel.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post not found with id - {id}")
    return post


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_post(id: int, request: PostUpdate, db: Session = Depends(get_db)):
    """PUT <id> - Post"""
    post = db.query(PostModel).filter(PostModel.id == id)
    if not post.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post not found with id - {id}")

    post.update({"title": request.title, "body": request.body})
    db.commit()
    return {"message": "Post updated successfully"}


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    """DELETE <id> - Post"""
    post = db.query(PostModel).filter(PostModel.id == id)
    if not post.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post not found with id - {id}")

    post.delete(synchronize_session=False)
    db.commit()
    return {"message": "Post deleted successfully"}
