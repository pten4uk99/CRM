from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from infrastructure.database import models
from infrastructure.database.base import engine
from infrastructure.modules.admin import admin_router

models.BaseModel.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(admin_router)

origins = [
    'http://192.168.1.196:8080',
    'http://localhost:8080',
    'http://127.0.0.1:8080'

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


