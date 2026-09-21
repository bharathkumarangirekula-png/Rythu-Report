-- ==========================================================
-- FARMER DIGITAL RECORDS PORTAL - SQLITE DATABASE SCHEMA
-- ==========================================================

-- Table: Farmers Profile
CREATE TABLE IF NOT EXISTS farmers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    farm_name TEXT NOT NULL,
    location TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    land_area_acres REAL NOT NULL,
    phone_masked TEXT NOT NULL,
    kisan_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Records Categories Lookup
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    classification TEXT NOT NULL CHECK(classification IN ('Agricultural', 'Personal', 'Other')),
    color TEXT NOT NULL
);

-- Table: Farmer Records
CREATE TABLE IF NOT EXISTS records (
    id TEXT PRIMARY KEY,
    farmer_id TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    classification TEXT NOT NULL CHECK(classification IN ('Agricultural', 'Personal', 'Other')),
    date_added DATE NOT NULL,
    year INTEGER NOT NULL,
    file_type TEXT NOT NULL CHECK(file_type IN ('PDF', 'JPG', 'PNG')),
    file_size TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Verified' CHECK(status IN ('Verified', 'Pending', 'Archived')),
    description TEXT,
    survey_or_policy_no TEXT,
    mock_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
);

-- Table: Audit & Access Log (for digital safety tracking)
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    record_id TEXT,
    action TEXT NOT NULL CHECK(action IN ('VIEW', 'DOWNLOAD', 'CREATE', 'DELETE', 'EXPORT')),
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_masked TEXT DEFAULT '127.0.0.1'
);

-- Initial Categories Seed
INSERT OR IGNORE INTO categories (name, classification, color) VALUES
('Land', 'Agricultural', '#16a34a'),
('Crops', 'Agricultural', '#059669'),
('Finance', 'Other', '#2563eb'),
('Insurance', 'Agricultural', '#d97706'),
('Government Schemes', 'Other', '#9333ea'),
('Personal', 'Personal', '#0891b2'),
('Other', 'Other', '#475569');
