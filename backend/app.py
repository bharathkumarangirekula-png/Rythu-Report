"""
Farmer Digital Records Portal - Python FastAPI + SQLite Backend
This server implements the complete REST API for rural agricultural records management.
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import os

app = FastAPI(
    title="Farmer Digital Records API",
    description="Backend API for digitizing, organizing, and securing farmer records",
    version="1.0.0"
)

# Enable CORS for React frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "farmer_records.db"

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
    if os.path.exists(schema_path):
        with open(schema_path, "r", encoding="utf-8") as f:
            sql = f.read()
        conn = get_db()
        conn.executescript(sql)
        conn.commit()
        conn.close()

# Pydantic Schemas
class RecordCreate(BaseModel):
    name: str
    category: str
    classification: str
    dateAdded: str
    year: int
    fileType: str
    fileSize: str
    status: str = "Verified"
    description: Optional[str] = ""
    surveyOrPolicyNo: Optional[str] = ""
    mockContent: Optional[str] = ""

class FarmerProfileModel(BaseModel):
    name: str
    farmName: str
    location: str
    district: str
    state: str
    mainCrops: List[str]
    landAreaAcres: float
    phoneMasked: str
    kisanId: str

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "FastAPI Farmer Digital Records"}

@app.get("/api/profile")
def get_profile():
    return {
        "name": "Ramesh",
        "farmName": "Green Valley Farm",
        "location": "Tenali Mandal, Guntur District",
        "district": "Guntur",
        "state": "Andhra Pradesh",
        "mainCrops": ["Rice (వరి)", "Chilli (మిరప)", "Cotton (పత్తి)"],
        "landAreaAcres": 4.5,
        "phoneMasked": "+91 98765 *****",
        "kisanId": "AP-GNT-2026-8841"
    }

@app.get("/api/records")
def list_records(category: Optional[str] = Query(None), search: Optional[str] = Query(None)):
    conn = get_db()
    cursor = conn.cursor()
    query = "SELECT * FROM records WHERE 1=1"
    params = []

    if category and category != "All":
        query += " AND category = ?"
        params.append(category)

    if search:
        query += " AND (name LIKE ? OR description LIKE ? OR survey_or_policy_no LIKE ?)"
        term = f"%{search}%"
        params.extend([term, term, term])

    query += " ORDER BY date_added DESC"
    rows = cursor.execute(query, params).fetchall()
    conn.close()

    return [
        {
            "id": r["id"],
            "name": r["name"],
            "category": r["category"],
            "classification": r["classification"],
            "dateAdded": r["date_added"],
            "year": r["year"],
            "fileType": r["file_type"],
            "fileSize": r["file_size"],
            "status": r["status"],
            "description": r["description"],
            "surveyOrPolicyNo": r["survey_or_policy_no"],
            "mockContent": r["mock_content"]
        }
        for r in rows
    ]

@app.post("/api/records", status_code=201)
def create_record(item: RecordCreate):
    import uuid
    new_id = f"rec-{uuid.uuid4().hex[:8]}"
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO records (id, farmer_id, name, category, classification, date_added, year, file_type, file_size, status, description, survey_or_policy_no, mock_content)
        VALUES (?, 'farmer-ramesh', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        new_id, item.name, item.category, item.classification, 
        item.dateAdded, item.year, item.fileType, item.fileSize, 
        item.status, item.description, item.surveyOrPolicyNo, item.mockContent
    ))
    conn.commit()
    conn.close()
    return {"id": new_id, **item.dict()}

@app.delete("/api/records/{record_id}")
def delete_record(record_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM records WHERE id = ?", (record_id,))
    deleted = cursor.rowcount
    conn.commit()
    conn.close()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Record not found")
    return {"success": True, "deleted_id": record_id}

@app.get("/api/records/{record_id}/download")
def download_record(record_id: str):
    conn = get_db()
    row = conn.cursor().execute("SELECT * FROM records WHERE id = ?", (record_id,)).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Record not found")
    
    content = f"FARMER DIGITAL CERTIFICATE\nTitle: {row['name']}\nCategory: {row['category']}\nDate: {row['date_added']}\nRef: {row['survey_or_policy_no']}\n\nContent:\n{row['mock_content'] or row['description']}"
    return PlainTextResponse(content, headers={"Content-Disposition": f'attachment; filename="{row["name"]}.txt"'})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
