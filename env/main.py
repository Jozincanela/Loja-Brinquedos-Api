from fastapi import FastAPI
import models
from database import engine
from fastapi.middleware.cors import CORSMiddleware

from typing import Annotated
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db


from models import Brinquedos, BrinquedoRequest
from models import Estoque, EstoqueRequest, EstoqueRequest2

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",  
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

db_dependency = Annotated[Session, Depends(get_db)]

@app.get('/brinquedo')
async def all_toys(db: db_dependency):
    return db.query(Brinquedos).all()

@app.get('/brinquedo/{id}')
async def select_toy (db: db_dependency, id: int):
    brinquedo_model = db.query(Brinquedos).filter(Brinquedos.id == id).first()
    if brinquedo_model is not None:
        return brinquedo_model
    raise HTTPException(status_code=404, detail='brinquedo not found')


@app.post('/brinquedo')
async def create_toy (db: db_dependency, brinquedo_request: BrinquedoRequest):
    brinquedo_model = Brinquedos(**brinquedo_request.model_dump())
    db.add(brinquedo_model)
    db.commit()

@app.put('/brinquedo/{id}')
async def update_brinquedo(db: db_dependency, brinquedo_request: BrinquedoRequest, id: int):
    brinquedo_model = db.query(Brinquedos).filter(Brinquedos.id == id).first()
    if brinquedo_model is None:
        raise HTTPException(status_code=404, detail='brinquedo not found')
    brinquedo_model.Brinquedo = brinquedo_request.Brinquedo
    brinquedo_model.Preco = brinquedo_request.Preco
    brinquedo_model.Quantidade = brinquedo_request.Quantidade
    brinquedo_model.Descricao = brinquedo_request.Descricao

    db.add(brinquedo_model)
    db.commit()

@app.delete('/brinquedo/{id}')
async def delete_brinquedo(db: db_dependency,id: int):
    brinquedo_model = db.query(Brinquedos).filter(Brinquedos.id == id).first()
    if brinquedo_model is None:
        raise HTTPException(status_code=404, detail='brinquedo not found')    
    db.query(Brinquedos).filter(Brinquedos.id == id).delete()
    db.commit()


@app.get('/vendas')
async def todas_vendas (db:db_dependency):
    return db.query(Estoque).all()

@app.get('/venda/{id}')
async def select_venda (db: db_dependency, id: int):
    Estoque_model = db.query(Estoque).filter(Estoque.id == id).first()
    if Estoque_model is not None:
        return Estoque_model
    raise HTTPException(status_code=404, detail='Venda not found')

@app.post('/Venda')
async def Nova_venda (db: db_dependency, EstoqueRequest: EstoqueRequest):
    Estoque_model = Estoque(**EstoqueRequest.model_dump())
    Estoque_model.Valor = 0.0
    id_brinquedos_reformulado = ""
    for brinq_id in Estoque_model.Brinquedos_id:
        id_brinquedos_reformulado += str(brinq_id) +","
        brinquedo_model = db.query(Brinquedos).filter(Brinquedos.id == brinq_id).first()
        if brinquedo_model is None:
            raise HTTPException(status_code=404, detail='brinquedo not found')
        brinquedo_model.Quantidade = brinquedo_model.Quantidade -1
        Estoque_model.Valor += brinquedo_model.Preco

    
    Estoque_model.Brinquedos_id = id_brinquedos_reformulado[:-1]
    db.add(brinquedo_model)
    db.add(Estoque_model)
    db.commit()

@app.put('/Venda/{id}')
async def update_venda(db: db_dependency, EstoqueRequest: EstoqueRequest2, id: int):
    Estoque_model = db.query(Brinquedos).filter(Brinquedos.id == id).first()
    if Estoque_model is None:
        raise HTTPException(status_code=404, detail='venda not found')
    Estoque_model.Brinquedos_id = EstoqueRequest.Brinquedos_id
    Estoque_model.Data = EstoqueRequest.Data
    Estoque_model.Valor = EstoqueRequest.Valor

    db.add(Estoque_model)
    db.commit()

@app.delete('/Estoque/{id}')
async def delete_venda(db: db_dependency,id: int):
    Estoque_model = db.query(Estoque).filter(Estoque.id == id).first()
    if Estoque_model is None:
        raise HTTPException(status_code=404, detail='Estoque not found')    
    db.query(Estoque).filter(Estoque.id == id).delete()
    db.commit()

