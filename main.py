from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

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