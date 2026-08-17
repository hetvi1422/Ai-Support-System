import uuid

class ZendeskAdapter:
    def create_ticket(self, payload: dict) -> dict:
        # Mocking the Zendesk API call
        print(f"--> [ZENDESK MOCK] Creating Ticket for: {payload.get('customerName')}")
        return {"ticketId": f"ZD-{uuid.uuid4().hex[:8].upper()}", "status": "created"}

    def send_reply(self, ticket_id: str, reply_body: str, is_auto_reply: bool) -> bool:
        # Mocking the Zendesk auto-reply
        print(f"--> [ZENDESK MOCK] Sent reply to {ticket_id}. Auto-sent: {is_auto_reply}")
        return True