"""
Seed script to populate SQLite database with realistic Andhra Pradesh farmer records.
"""

import sqlite3
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "farmer_records.db")

def seed():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Read schema
    schema_file = os.path.join(os.path.dirname(__file__), "schema.sql")
    with open(schema_file, "r", encoding="utf-8") as f:
        cursor.executescript(f.read())

    # Insert farmer Ramesh
    cursor.execute("""
        INSERT OR REPLACE INTO farmers (id, name, farm_name, location, district, state, land_area_acres, phone_masked, kisan_id)
        VALUES ('farmer-ramesh', 'Ramesh', 'Green Valley Farm', 'Tenali Mandal', 'Guntur', 'Andhra Pradesh', 4.5, '+91 98765 *****', 'AP-GNT-2026-8841')
    """)

    sample_records = [
        ("rec-01", "Land Record (Pahani / 1B Adangal)", "Land", "Agricultural", "2026-03-12", 2026, "PDF", "1.4 MB", "Survey 142/2A"),
        ("rec-02", "Soil Test Report (N-P-K Health Card)", "Crops", "Agricultural", "2026-02-18", 2026, "PDF", "890 KB", "SHC-2026-AP-994"),
        ("rec-03", "Crop Insurance Policy (PMFBY Kharif)", "Insurance", "Agricultural", "2026-01-25", 2026, "PDF", "1.1 MB", "PMFBY/2026/AP/00912"),
        ("rec-04", "Seed Purchase Bill (Paddy MTU-1061)", "Crops", "Agricultural", "2026-04-05", 2026, "JPG", "620 KB", "INV-SEED-8812"),
        ("rec-05", "Fertilizer Purchase Receipt (Urea & DAP)", "Crops", "Agricultural", "2026-04-20", 2026, "JPG", "540 KB", "PACS-POS-4401"),
        ("rec-06", "Organic Bio-Pesticide Application Record", "Crops", "Agricultural", "2026-05-10", 2026, "PDF", "410 KB", "LOG-PEST-2026-02"),
        ("rec-07", "Drip Irrigation Subsidy Sanction Order", "Crops", "Agricultural", "2026-01-10", 2026, "PDF", "1.3 MB", "APMIP/GNT/2026/512"),
        ("rec-08", "Aadhaar Masked Copy (Demo Sample)", "Personal", "Personal", "2026-02-01", 2026, "PDF", "780 KB", "XXXX-XXXX-4819"),
        ("rec-09", "Bank Passbook Front Page (AP Grameena Bank)", "Finance", "Personal", "2026-01-15", 2026, "JPG", "910 KB", "A/C: ****5542"),
        ("rec-10", "Rural Health & Life Micro-Insurance", "Insurance", "Personal", "2026-03-01", 2026, "PDF", "680 KB", "PMSBY/AP/88219"),
        ("rec-11", "Kisan Credit Card (KCC) Loan Sanction Slip", "Finance", "Other", "2026-02-10", 2026, "PDF", "1.2 MB", "KCC-2026-AP-0192"),
        ("rec-12", "Rythu Bharosa / PM-KISAN Beneficiary Receipt", "Government Schemes", "Other", "2026-05-02", 2026, "PDF", "520 KB", "PMK-AP-2026-4412")
    ]

    for rec in sample_records:
        cursor.execute("""
            INSERT OR REPLACE INTO records (id, farmer_id, name, category, classification, date_added, year, file_type, file_size, status, survey_or_policy_no)
            VALUES (?, 'farmer-ramesh', ?, ?, ?, ?, ?, ?, ?, 'Verified', ?)
        """, rec)

    conn.commit()
    conn.close()
    print("Database successfully seeded with 12 Andhra Pradesh farmer records!")

if __name__ == "__main__":
    seed()
