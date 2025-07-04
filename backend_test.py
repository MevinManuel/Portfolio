#!/usr/bin/env python3
import requests
import json
import unittest
import os
import time
import random
import string

# Get the backend URL from the frontend .env file
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BACKEND_URL = line.strip().split('=')[1].strip('"\'')
            break

# Ensure the URL doesn't have quotes
BACKEND_URL = BACKEND_URL.strip('"\'')
API_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_URL}")

def random_string(length=10):
    """Generate a random string for testing"""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

class BackendTest(unittest.TestCase):
    """Test suite for the portfolio backend API"""
    
    def setUp(self):
        """Set up test data"""
        self.contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message from the automated test suite."
        }
        
        self.project_data = {
            "title": f"Test Project {random_string(5)}",
            "category": "Testing",
            "description": "This is a test project created by the automated test suite.",
            "image_url": "https://via.placeholder.com/300",
            "tags": ["test", "automation"],
            "project_url": "https://example.com",
            "is_featured": True
        }
        
        # Store IDs for cleanup
        self.contact_ids = []
        self.project_ids = []
    
    def tearDown(self):
        """Clean up test data"""
        # Delete test contact submissions
        for contact_id in self.contact_ids:
            try:
                requests.delete(f"{API_URL}/contact/{contact_id}")
            except:
                pass
        
        # Delete test projects
        for project_id in self.project_ids:
            try:
                requests.delete(f"{API_URL}/portfolio/{project_id}")
            except:
                pass
    
    def test_01_api_root(self):
        """Test the API root endpoint"""
        response = requests.get(f"{API_URL}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        print("✅ API root endpoint working")
    
    # Contact Form API Tests
    
    def test_02_contact_form_submission(self):
        """Test contact form submission with valid data"""
        response = requests.post(f"{API_URL}/contact", json=self.contact_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("id", data)
        self.assertEqual(data["name"], self.contact_data["name"])
        self.assertEqual(data["email"], self.contact_data["email"])
        self.assertEqual(data["message"], self.contact_data["message"])
        self.assertFalse(data["is_read"])
        
        # Store ID for cleanup
        self.contact_ids.append(data["id"])
        print("✅ Contact form submission working")
        
        return data["id"]
    
    def test_03_contact_form_validation(self):
        """Test contact form validation"""
        # Test empty name
        invalid_data = self.contact_data.copy()
        invalid_data["name"] = ""
        response = requests.post(f"{API_URL}/contact", json=invalid_data)
        self.assertNotEqual(response.status_code, 200)
        
        # Test invalid email
        invalid_data = self.contact_data.copy()
        invalid_data["email"] = "not-an-email"
        response = requests.post(f"{API_URL}/contact", json=invalid_data)
        self.assertNotEqual(response.status_code, 200)
        
        # Test empty message
        invalid_data = self.contact_data.copy()
        invalid_data["message"] = ""
        response = requests.post(f"{API_URL}/contact", json=invalid_data)
        self.assertNotEqual(response.status_code, 200)
        
        # Test very long message (should pass)
        invalid_data = self.contact_data.copy()
        invalid_data["message"] = "A" * 1999  # Just under the 2000 char limit
        response = requests.post(f"{API_URL}/contact", json=invalid_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.contact_ids.append(data["id"])
        
        # Test too long message
        invalid_data = self.contact_data.copy()
        invalid_data["message"] = "A" * 2001  # Over the 2000 char limit
        response = requests.post(f"{API_URL}/contact", json=invalid_data)
        self.assertNotEqual(response.status_code, 200)
        
        print("✅ Contact form validation working")
    
    def test_04_get_contact_submissions(self):
        """Test retrieving contact submissions"""
        # First create a submission
        contact_id = self.test_02_contact_form_submission()
        
        # Get all submissions
        response = requests.get(f"{API_URL}/contact")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        
        # Check if our submission is in the list
        submission_found = False
        for submission in data:
            if submission["id"] == contact_id:
                submission_found = True
                break
        
        self.assertTrue(submission_found)
        print("✅ Get contact submissions working")
    
    def test_05_get_specific_contact_submission(self):
        """Test retrieving a specific contact submission"""
        # First create a submission
        contact_id = self.test_02_contact_form_submission()
        
        # Get the specific submission
        response = requests.get(f"{API_URL}/contact/{contact_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["id"], contact_id)
        self.assertEqual(data["name"], self.contact_data["name"])
        self.assertEqual(data["email"], self.contact_data["email"])
        self.assertEqual(data["message"], self.contact_data["message"])
        
        # Test with non-existent ID
        response = requests.get(f"{API_URL}/contact/nonexistent-id")
        self.assertEqual(response.status_code, 404)
        
        print("✅ Get specific contact submission working")
    
    def test_06_mark_contact_as_read(self):
        """Test marking a contact submission as read"""
        # First create a submission
        contact_id = self.test_02_contact_form_submission()
        
        # Mark as read
        response = requests.put(f"{API_URL}/contact/{contact_id}/read")
        self.assertEqual(response.status_code, 200)
        
        # Verify it's marked as read
        response = requests.get(f"{API_URL}/contact/{contact_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["is_read"])
        
        # Test with non-existent ID
        response = requests.put(f"{API_URL}/contact/nonexistent-id/read")
        self.assertEqual(response.status_code, 404)
        
        print("✅ Mark contact as read working")
    
    def test_07_delete_contact_submission(self):
        """Test deleting a contact submission"""
        # First create a submission
        contact_id = self.test_02_contact_form_submission()
        
        # Delete the submission
        response = requests.delete(f"{API_URL}/contact/{contact_id}")
        self.assertEqual(response.status_code, 200)
        
        # Verify it's deleted
        response = requests.get(f"{API_URL}/contact/{contact_id}")
        self.assertEqual(response.status_code, 404)
        
        # Remove from cleanup list since we already deleted it
        self.contact_ids.remove(contact_id)
        
        # Test with non-existent ID
        response = requests.delete(f"{API_URL}/contact/nonexistent-id")
        self.assertEqual(response.status_code, 404)
        
        print("✅ Delete contact submission working")
    
    # Portfolio API Tests
    
    def test_08_create_project(self):
        """Test creating a portfolio project"""
        response = requests.post(f"{API_URL}/portfolio", json=self.project_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("id", data)
        self.assertEqual(data["title"], self.project_data["title"])
        self.assertEqual(data["category"], self.project_data["category"])
        self.assertEqual(data["description"], self.project_data["description"])
        self.assertEqual(data["image_url"], self.project_data["image_url"])
        self.assertEqual(data["tags"], self.project_data["tags"])
        self.assertEqual(data["project_url"], self.project_data["project_url"])
        self.assertEqual(data["is_featured"], self.project_data["is_featured"])
        
        # Store ID for cleanup
        self.project_ids.append(data["id"])
        print("✅ Create portfolio project working")
        
        return data["id"]
    
    def test_09_project_validation(self):
        """Test project validation"""
        # Test empty title
        invalid_data = self.project_data.copy()
        invalid_data["title"] = ""
        response = requests.post(f"{API_URL}/portfolio", json=invalid_data)
        self.assertNotEqual(response.status_code, 200)
        
        # Test empty category
        invalid_data = self.project_data.copy()
        invalid_data["category"] = ""
        response = requests.post(f"{API_URL}/portfolio", json=invalid_data)
        self.assertNotEqual(response.status_code, 200)
        
        # Test empty description
        invalid_data = self.project_data.copy()
        invalid_data["description"] = ""
        response = requests.post(f"{API_URL}/portfolio", json=invalid_data)
        self.assertNotEqual(response.status_code, 200)
        
        # Test very long description (should pass)
        valid_data = self.project_data.copy()
        valid_data["description"] = "A" * 499  # Just under the 500 char limit
        response = requests.post(f"{API_URL}/portfolio", json=valid_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.project_ids.append(data["id"])
        
        # Test too long description
        invalid_data = self.project_data.copy()
        invalid_data["description"] = "A" * 501  # Over the 500 char limit
        response = requests.post(f"{API_URL}/portfolio", json=invalid_data)
        self.assertNotEqual(response.status_code, 200)
        
        print("✅ Portfolio project validation working")
    
    def test_10_get_projects(self):
        """Test retrieving portfolio projects"""
        # First create a project
        project_id = self.test_08_create_project()
        
        # Get all projects
        response = requests.get(f"{API_URL}/portfolio")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        
        # Check if our project is in the list
        project_found = False
        for project in data:
            if project["id"] == project_id:
                project_found = True
                break
        
        self.assertTrue(project_found)
        print("✅ Get portfolio projects working")
    
    def test_11_filter_projects(self):
        """Test filtering portfolio projects"""
        # First create a project
        project_id = self.test_08_create_project()
        
        # Create another project with different category
        different_project = self.project_data.copy()
        different_project["category"] = "Different"
        different_project["is_featured"] = False
        response = requests.post(f"{API_URL}/portfolio", json=different_project)
        self.assertEqual(response.status_code, 200)
        different_id = response.json()["id"]
        self.project_ids.append(different_id)
        
        # Filter by category
        response = requests.get(f"{API_URL}/portfolio?category=Testing")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        
        # All projects should have category "Testing"
        for project in data:
            self.assertEqual(project["category"], "Testing")
        
        # Filter by featured
        response = requests.get(f"{API_URL}/portfolio?featured=true")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        
        # All projects should be featured
        for project in data:
            self.assertTrue(project["is_featured"])
        
        print("✅ Filter portfolio projects working")
    
    def test_12_get_project_categories(self):
        """Test retrieving project categories"""
        # First create projects with different categories
        self.test_08_create_project()  # Category: Testing
        
        different_project = self.project_data.copy()
        different_project["category"] = "Different"
        response = requests.post(f"{API_URL}/portfolio", json=different_project)
        self.assertEqual(response.status_code, 200)
        self.project_ids.append(response.json()["id"])
        
        # Get categories
        response = requests.get(f"{API_URL}/portfolio/categories")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("categories", data)
        self.assertIsInstance(data["categories"], list)
        
        # Check if our categories are in the list
        self.assertIn("Testing", data["categories"])
        self.assertIn("Different", data["categories"])
        
        print("✅ Get project categories working")
    
    def test_13_get_specific_project(self):
        """Test retrieving a specific project"""
        # First create a project
        project_id = self.test_08_create_project()
        
        # Get the specific project
        response = requests.get(f"{API_URL}/portfolio/{project_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["id"], project_id)
        self.assertEqual(data["title"], self.project_data["title"])
        self.assertEqual(data["category"], self.project_data["category"])
        
        # Test with non-existent ID
        response = requests.get(f"{API_URL}/portfolio/nonexistent-id")
        self.assertEqual(response.status_code, 404)
        
        print("✅ Get specific project working")
    
    def test_14_update_project(self):
        """Test updating a project"""
        # First create a project
        project_id = self.test_08_create_project()
        
        # Update data
        update_data = self.project_data.copy()
        update_data["title"] = "Updated Title"
        update_data["description"] = "Updated description"
        
        # Update the project
        response = requests.put(f"{API_URL}/portfolio/{project_id}", json=update_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["id"], project_id)
        self.assertEqual(data["title"], "Updated Title")
        self.assertEqual(data["description"], "Updated description")
        
        # Verify the update
        response = requests.get(f"{API_URL}/portfolio/{project_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["title"], "Updated Title")
        
        # Test with non-existent ID
        response = requests.put(f"{API_URL}/portfolio/nonexistent-id", json=update_data)
        self.assertEqual(response.status_code, 404)
        
        print("✅ Update project working")
    
    def test_15_delete_project(self):
        """Test deleting a project"""
        # First create a project
        project_id = self.test_08_create_project()
        
        # Delete the project
        response = requests.delete(f"{API_URL}/portfolio/{project_id}")
        self.assertEqual(response.status_code, 200)
        
        # Verify it's deleted
        response = requests.get(f"{API_URL}/portfolio/{project_id}")
        self.assertEqual(response.status_code, 404)
        
        # Remove from cleanup list since we already deleted it
        self.project_ids.remove(project_id)
        
        # Test with non-existent ID
        response = requests.delete(f"{API_URL}/portfolio/nonexistent-id")
        self.assertEqual(response.status_code, 404)
        
        print("✅ Delete project working")

if __name__ == "__main__":
    # Add a small delay to ensure the backend is fully started
    time.sleep(1)
    
    # Run the tests
    unittest.main(verbosity=2)