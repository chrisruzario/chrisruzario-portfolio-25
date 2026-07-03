from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email config
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
OWNER_EMAIL = os.environ.get('OWNER_EMAIL', 'chris25cr7@gmail.com')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    email_sent: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


def _send_contact_email(payload: ContactCreate) -> bool:
    """Send notification email to the site owner via Resend."""
    html = f"""
    <table style="width:100%;font-family:Arial,Helvetica,sans-serif;color:#0A0A0A">
      <tr><td>
        <h2 style="margin:0 0 16px">New portfolio contact message</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> {payload.name}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> {payload.email}</p>
        <p style="margin:16px 0 4px"><strong>Message:</strong></p>
        <p style="margin:0;white-space:pre-wrap;color:#333">{payload.message}</p>
      </td></tr>
    </table>
    """
    params = {
        "from": SENDER_EMAIL,
        "to": [OWNER_EMAIL],
        "reply_to": payload.email,
        "subject": f"Portfolio message from {payload.name}",
        "html": html,
    }
    resend.Emails.send(params)
    return True


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    email_sent = False
    if RESEND_API_KEY:
        try:
            email_sent = await asyncio.to_thread(_send_contact_email, payload)
        except Exception as e:
            logger.error(f"Failed to send contact email: {e}")

    record = ContactMessage(**payload.model_dump(), email_sent=email_sent)
    await db.contact_messages.insert_one(record.model_dump())
    return record


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
