from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from dotenv import load_dotenv
from pathlib import Path

# Setup logging
logger = logging.getLogger(__name__)

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

async def create_indexes():
    """Create database indexes for better performance"""
    try:
        await db.contact_submissions.create_index("created_at")
        await db.contact_submissions.create_index("id")
        await db.projects.create_index("created_at")
        await db.projects.create_index("category")
        await db.projects.create_index("is_featured")
        logger.info("Database indexes created successfully")
    except Exception as e:
        logger.error(f"Error creating indexes: {str(e)}")

async def close_db_connection():
    """Close the database connection"""
    client.close()
    logger.info("Database connection closed")