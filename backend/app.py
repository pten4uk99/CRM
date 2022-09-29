from fastapi import FastAPI

from infrastructure.database import models
from infrastructure.database.base import engine
from infrastructure.modules.admin import admin_router

models.BaseModel.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(admin_router)



