from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..models import ContactSubmission, ContactSubmissionCreate, ContactSubmissionResponse
import logging

# Import database module
from ..database import db

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """Submit a contact form"""
    try:
        # Create contact submission object
        contact_submission = ContactSubmission(**contact_data.dict())
        
        # Convert to dict for MongoDB
        contact_dict = contact_submission.dict()
        
        # Insert into database
        result = await db.contact_submissions.insert_one(contact_dict)
        
        if result.inserted_id:
            logger.info(f"Contact submission created with ID: {contact_submission.id}")
            return ContactSubmissionResponse(**contact_dict)
        else:
            raise HTTPException(status_code=500, detail="Failed to create contact submission")
            
    except Exception as e:
        logger.error(f"Error creating contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/contact", response_model=List[ContactSubmissionResponse])
async def get_contact_submissions(limit: int = 50, skip: int = 0):
    """Get all contact submissions (admin endpoint)"""
    try:
        # Get contact submissions from database
        cursor = db.contact_submissions.find().sort("created_at", -1).skip(skip).limit(limit)
        contact_submissions = await cursor.to_list(length=limit)
        
        # Convert to response objects
        return [ContactSubmissionResponse(**submission) for submission in contact_submissions]
        
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/contact/{submission_id}", response_model=ContactSubmissionResponse)
async def get_contact_submission(submission_id: str):
    """Get a specific contact submission"""
    try:
        # Find contact submission by ID
        submission = await db.contact_submissions.find_one({"id": submission_id})
        
        if not submission:
            raise HTTPException(status_code=404, detail="Contact submission not found")
            
        return ContactSubmissionResponse(**submission)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.put("/contact/{submission_id}/read")
async def mark_as_read(submission_id: str):
    """Mark a contact submission as read"""
    try:
        # Update the submission to mark as read
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"is_read": True}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact submission not found")
            
        return {"message": "Contact submission marked as read"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking submission as read: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.delete("/contact/{submission_id}")
async def delete_contact_submission(submission_id: str):
    """Delete a contact submission"""
    try:
        # Delete the submission
        result = await db.contact_submissions.delete_one({"id": submission_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Contact submission not found")
            
        return {"message": "Contact submission deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")