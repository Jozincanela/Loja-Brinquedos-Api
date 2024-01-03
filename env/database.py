from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Criando um local e nosso database
SQLALCHEMY_DATABASE_URL = 'sqlite:///./Projeto_Loja_brinquedos.db'

# Criamos nossa engine('máquina') passando como parametros o database e  que apenas um comando por vez será aceito.
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})

# Criamos nossa sessão não deixando que algumas ações sejam automáticas e que sejam acionadas pela engine
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base() #Criamos um objeto que será responsável pelo database

# Fechar a sessão sempre após usar o db
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()