from fastapi import FastAPI
from pydantic import BaseModel
import requests
import json

app = FastAPI()

class AgentRequest(BaseModel):
    prompt: str
    context: dict = {}

# Tool functions
def create_onboarding_task(employee_id, title, status, due_date):
    url = "http://localhost:5001/api/tasks"
    payload = {
        "employee_id": employee_id,
        "title": title,
        "status": status,
        "due_date": due_date
    }
    response = requests.post(url, json=payload)
    return response.json()


def upload_document(employee_id, documents):
    url = "http://localhost:5001/api/documents/upload"
    payload = {
        "employeeId": employee_id,
        "documents": documents
    }
    response = requests.post(url, json=payload)
    return response.json()


def schedule_orientation_meeting(employee_id, time):
    url = "http://localhost:5001/api/meetings/orientation"
    payload = {
        "employeeId": employee_id,
        "time": time
    }
    response = requests.post(url, json=payload)
    return response.json()

def create_user_account(employee_id, account_type):
    url = "http://localhost:5001/api/accounts"
    payload = {
        "employeeId": employee_id,
        "accountType": account_type
    }
    response = requests.post(url, json=payload)
    return response.json()

def assign_training_module(employee_id, module_id):
    url = "http://localhost:5001/api/training/assign"
    payload = {
        "employeeId": employee_id,
        "moduleId": module_id
    }
    response = requests.post(url, json=payload)
    return response.json()

def submit_it_equipment_request(employee_id, items):
    url = "http://localhost:5001/api/it/request"
    payload = {
        "employeeId": employee_id,
        "items": items
    }
    response = requests.post(url, json=payload)
    return response.json()

def get_policy_answer(query):
    url = f"http://localhost:5001/api/policies/answer?query={query}"
    response = requests.get(url)
    return response.json()

# Fallback: Ask Ollama LLM
def ask_ollama(prompt):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "llama3",
        "prompt": prompt
    }
    response = requests.post(url, json=payload, stream=True)
    answer = ""
    for line in response.iter_lines():
        if line:
            data = line.decode("utf-8")
            try:
                obj = json.loads(data)
                answer += obj.get("response", "")
                if obj.get("done", False):
                    break
            except Exception as e:
                continue
    return answer or "Sorry, I couldn't get an answer from Ollama."

# Simple prompt parser and workflow
def agent_workflow(prompt, context):
    prompt_lower = prompt.lower()
    employee_id = context.get("employee_id", 1)

    if "onboard" in prompt_lower or "create task" in prompt_lower:
        result = create_onboarding_task(
            employee_id=employee_id,
            title="Complete onboarding paperwork",
            status="pending",
            due_date="2025-10-01"
        )
        return f"Onboarding task created: {result}"

    if "upload document" in prompt_lower:
        documents = [{
            "name": "ID Proof",
            "url": "https://example.com/id-proof.pdf",
            "type": "ID"
        }]
        result = upload_document(employee_id, documents)
        return f"Document uploaded: {result}"

    if "schedule orientation" in prompt_lower:
        result = schedule_orientation_meeting(employee_id, "2025-10-02T10:00:00")
        return f"Orientation meeting scheduled: {result}"

    if "create account" in prompt_lower:
        result = create_user_account(employee_id, "email")
        return f"User account created: {result}"

    if "assign training" in prompt_lower:
        result = assign_training_module(employee_id, "Safety")
        return f"Training module assigned: {result}"

    if "it request" in prompt_lower:
        result = submit_it_equipment_request(employee_id, "Laptop")
        return f"IT equipment requested: {result}"

    if "policy" in prompt_lower:
        result = get_policy_answer("leave")
        return f"Policy answer: {result}"

    # Fallback: answer with Ollama LLM
    return ask_ollama(prompt)

@app.post("/agent/respond")
async def agent_respond(request: AgentRequest):
    response = agent_workflow(request.prompt, request.context)
    return {"response": response}