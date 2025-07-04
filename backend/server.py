from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
import logging
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import database module
from .database import db, create_indexes, close_db_connection

# Create the main app without a prefix
app = FastAPI(
    title="Mevin Manuel Portfolio API",
    description="Backend API for Mevin Manuel's portfolio website",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models (keeping the original status check for backward compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Original routes (keeping for backward compatibility)
@api_router.get("/")
async def root():
    return {"message": "Hello World - Portfolio API is running!"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Portfolio API starting up...")
    await create_indexes()
    
    # Import route modules here to avoid circular imports
    from .routes import contact, portfolio
    
    # Include the route modules
    api_router.include_router(contact.router, tags=["contact"])
    api_router.include_router(portfolio.router, tags=["portfolio"])
    
    # Include the router in the main app
    app.include_router(api_router)
    
    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_db_connection()