from fastapi import FastAPI
from pydantic import BaseModel
from core.config import settings

app = FastAPI()
title = settings.PROJECT_NAME,
version = settings.PROJECT_VERSION


class Item(BaseModel):
    name: str

@app.get('/')
def root():
    return {'message': 'Hello world'}

@app.get('/items/')
def get_items():
    return {'data': [{'id':1, 'name': 'item_1'},
                     {'id':2, 'name': 'item_2'}]}

@app.post('/items/')
def create_item(item: Item):
    return {'data': item,}