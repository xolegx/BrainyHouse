from sqlalchemy.orm import Session
from schemas.blog import CreateBlog, UpdateBlog
from db.models.blog import Blog


def create_new_blog(blog: CreateBlog, db: Session, author_id: int = 1):
    blog = Blog(**blog.dict(), author_id=author_id)
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


def update_blog(id: int, blog: UpdateBlog, db: Session, author_id: int):
    blod_in_db = db.query(Blog).filter(Blog.id == id).first()
    if not blod_in_db:
        return
    blod_in_db.title = blog.title
    blod_in_db.content = blog.content
    db.add(blod_in_db)
    db.commit()
    return blod_in_db


def retreive_blog(id: int, db: Session):
    blog = db.query(Blog).filter(Blog.id == id).first()
    return blog


def list_blogs(db: Session):
    blogs = db.query(Blog).filter(Blog.is_active is True).all()
    return blogs
