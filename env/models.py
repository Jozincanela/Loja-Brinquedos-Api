from database import Base
from sqlalchemy import Column, Float, Integer, String
from pydantic import BaseModel

class Brinquedos(Base):
    __tablename__ = 'Brinquedos'

    id = Column(Integer, primary_key=True, index=True)
    Brinquedo = Column(String)
    Preco = Column(Float)
    Quantidade = Column(Integer)
    Descricao = Column(String)
    
class BrinquedoRequest (BaseModel):
    Brinquedo: str
    Preco: float
    Quantidade : int
    Descricao: str

    class Config:
        json_schema_extra = {   # schema_extra
            'example': {
                "Brinquedo": "Bola",
                "Preco": 10.99,
                "Quantidade": 10,
                "Descricao": "Bola com varias colorações"
            }
        }



class Estoque (Base):
    __tablename__ = 'Estoque'

    id = Column(Integer, primary_key=True, index=True)
    Brinquedos_id = Column(String)
    Data = Column(String)
    Valor = Column(Float)
  
class EstoqueRequest (BaseModel):
    Brinquedos_id: list
    Data: str
    

    class Config:
        json_schema_extra = {   # schema_extra
            'example': {
                "Brinquedos_id": [1,3,1],
                "Data": "DD/MM/AA",
            
            }
        }


class EstoqueRequest2 (BaseModel):
    Brinquedos_id: list
    Data: str
    Valor: float
    

    class Config:
        json_schema_extra = {   # schema_extra
            'example': {
                "Brinquedos_id": "1,3,1",
                "Data": "DD/MM/AA",
                "Valor": 10.99
            
            }
        }