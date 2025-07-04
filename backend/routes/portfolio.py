from fastapi import APIRouter, HTTPException
from typing import List, Optional
from ..models import Project, ProjectCreate
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

# MongoDB connection
from ..server import db

@router.post("/portfolio", response_model=Project)
async def create_project(project_data: ProjectCreate):
    """Create a new portfolio project"""
    try:
        # Create project object
        project = Project(**project_data.dict())
        
        # Convert to dict for MongoDB
        project_dict = project.dict()
        
        # Insert into database
        result = await db.projects.insert_one(project_dict)
        
        if result.inserted_id:
            logger.info(f"Project created with ID: {project.id}")
            return Project(**project_dict)
        else:
            raise HTTPException(status_code=500, detail="Failed to create project")
            
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/portfolio", response_model=List[Project])
async def get_projects(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    limit: int = 50,
    skip: int = 0
):
    """Get portfolio projects with optional filtering"""
    try:
        # Build query
        query = {}
        if category:
            query["category"] = category
        if featured is not None:
            query["is_featured"] = featured
        
        # Get projects from database
        cursor = db.projects.find(query).sort("created_at", -1).skip(skip).limit(limit)
        projects = await cursor.to_list(length=limit)
        
        # Convert to response objects
        return [Project(**project) for project in projects]
        
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/portfolio/categories")
async def get_project_categories():
    """Get all unique project categories"""
    try:
        # Get distinct categories from database
        categories = await db.projects.distinct("category")
        
        return {"categories": categories}
        
    except Exception as e:
        logger.error(f"Error fetching categories: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/portfolio/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a specific project"""
    try:
        # Find project by ID
        project = await db.projects.find_one({"id": project_id})
        
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
            
        return Project(**project)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.put("/portfolio/{project_id}", response_model=Project)
async def update_project(project_id: str, project_data: ProjectCreate):
    """Update a specific project"""
    try:
        # Update the project
        update_data = project_data.dict()
        
        result = await db.projects.update_one(
            {"id": project_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
            
        # Return updated project
        updated_project = await db.projects.find_one({"id": project_id})
        return Project(**updated_project)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.delete("/portfolio/{project_id}")
async def delete_project(project_id: str):
    """Delete a specific project"""
    try:
        # Delete the project
        result = await db.projects.delete_one({"id": project_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
            
        return {"message": "Project deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting project: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")