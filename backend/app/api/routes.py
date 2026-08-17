from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.schema import Ticket
from app.schemas.pydantic_models import TicketIngestRequest
from app.services.ai_engine import process_inbound_ticket
from app.services.zendesk_adapter import ZendeskAdapter

router = APIRouter()
zendesk = ZendeskAdapter()

@router.post("/tickets/ingest")
def ingest_ticket(request: TicketIngestRequest, db: Session = Depends(get_db)):
    try:
        # 1. Run AI Analysis
        ai_result = process_inbound_ticket(request.raw_message, request.customer_name, request.language)
        
        # 2. Save to Database
        db_ticket = Ticket(
            customer_name=request.customer_name,
            customer_email=request.customer_email,
            channel=request.channel.upper(),
            language=request.language,
            original_message=request.raw_message,
            category=ai_result["category"],
            priority=ai_result["priority"],
            sentiment=ai_result["sentiment"],
            is_sensitive=ai_result["is_sensitive"],
            confidence_score=ai_result["confidence_score"],
            assigned_team=ai_result["category"],
            status="RESOLVED" if ai_result["auto_reply_allowed"] else "OPEN"
        )
        db.add(db_ticket)
        db.commit()
        db.refresh(db_ticket)

        # 3. Zendesk Sync
        if ai_result["auto_reply_allowed"]:
            zendesk.send_reply(db_ticket.id, ai_result["suggested_response"], True)
        else:
            zd_res = zendesk.create_ticket({"customerName": request.customer_name})
            db_ticket.external_ticket_id = zd_res["ticketId"]
            db.commit()

        return {"success": True, "ticket_id": db_ticket.id, "ai_analysis": ai_result}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))