from fastapi import APIRouter, HTTPException
from typing import List
from ..models import ContactSubmissionCreate
import logging
import nodemailer
import os

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/contact")
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """Submit a contact form and send email"""
    try:
        # Email configuration
        email_config = {
            'host': 'smtp.gmail.com',
            'port': 587,
            'secure': False,  # true for 465, false for other ports
            'auth': {
                'user': os.environ.get('GMAIL_USER', 'your-email@gmail.com'),
                'pass': os.environ.get('GMAIL_APP_PASSWORD', 'your-app-password')
            }
        }
        
        # Create email content
        email_content = f"""
        New Contact Form Submission
        
        Name: {contact_data.name}
        Email: {contact_data.email}
        
        Message:
        {contact_data.message}
        
        ---
        Sent from your portfolio website contact form
        """
        
        # Email options
        mail_options = {
            'from': email_config['auth']['user'],
            'to': 'mevinmnl123@gmail.com',
            'subject': f'Portfolio Contact: Message from {contact_data.name}',
            'text': email_content,
            'replyTo': contact_data.email
        }
        
        # Send email using nodemailer (we'll need to implement this in Python)
        # For now, let's use Python's smtplib instead
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = email_config['auth']['user']
        msg['To'] = 'mevinmnl123@gmail.com'
        msg['Subject'] = f'Portfolio Contact: Message from {contact_data.name}'
        msg['Reply-To'] = contact_data.email
        
        # Add body to email
        msg.attach(MIMEText(email_content, 'plain'))
        
        # Gmail SMTP configuration
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  # Enable security
        server.login(email_config['auth']['user'], email_config['auth']['pass'])
        
        # Send email
        text = msg.as_string()
        server.sendmail(email_config['auth']['user'], 'mevinmnl123@gmail.com', text)
        server.quit()
        
        logger.info(f"Email sent successfully to mevinmnl123@gmail.com from {contact_data.name}")
        
        return {
            "message": "Email sent successfully",
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")