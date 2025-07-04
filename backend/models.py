from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
import uuid
from datetime import datetime


class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=2000)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_read: bool = Field(default=False)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=2000)


class ContactSubmissionResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: datetime
    is_read: bool = False
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    description: str
    image_url: str
    tags: List[str] = []
    project_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_featured: bool = Field(default=False)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1, max_length=50)
    description: str = Field(..., min_length=1, max_length=500)
    image_url: str
    tags: List[str] = []
    project_url: Optional[str] = None
    is_featured: bool = Field(default=False)