from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session
from schemas.user import UserCreate
from db.session import get_db
from db.repository.user import creatr_new_user

router = APIRouter()

@router.post("/")
def create_user(user : UserCreate, db: Session = Depends(get_db)):
    user = creatr_new_user(user=user, db=db)
    return user
