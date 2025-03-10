from fastapi import FastAPI
from core.config import settings


def start_application():
    application = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.PROJECT_VERSION)
    return application


app = start_application()


@app.get("/")
def home():
    return {"msg": "Hello"}
