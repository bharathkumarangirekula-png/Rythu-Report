# Farmer Digital Records Portal (రైతు డిజిటల్ రికార్డుల పోర్టల్)

> A simple, modern, mobile-friendly educational resource and record management portal designed especially for farmers in rural areas (with dedicated support for Andhra Pradesh farmers in Telugu, English, and Hindi).

---

## 🌾 Project Overview

The **Farmer Digital Records Portal** bridges the digital divide for rural farming communities by providing an intuitive, accessible, and safe platform to:

1. **Digitize Agricultural & Personal Records**: Photograph land records (Pahani / 1B Adangal), soil health cards, seed and fertilizer purchase bills, and crop insurance policies using a smartphone.
2. **Organize Documents Systematically**: Categorize records into Land, Crops, Finance, Insurance, Government Schemes, and Personal documents with readable file names and date tagging.
3. **Safely Store & Access Records**: Understand safe cloud lockers (DigiLocker, MeeSeva), encrypted phone storage, and offline SD card backups.
4. **Learn Digital & Cyber Safety**: Build vigilance against fake subsidy phone calls, bank OTP theft, phishing links, and shared computer vulnerabilities at village CSC centers.
5. **Interactive Learning & Practice**: Hands-on camera scanning simulator, fake SMS scam spotter, interactive safety quiz, and completion badge.

---

## 🛠️ Technology Stack

- **Frontend**: React 18+ (Vite), TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Accessibility**: Web Speech API for native Text-to-Speech (Telugu, Hindi, English voice synthesis) and Dynamic Font Size Scaler (Normal, Large, Extra Large)
- **Backend Options**:
  - **Full-stack Express + Node.js (Bundled)**: Integrated Vite development middleware with REST endpoints on port 3000.
  - **Python FastAPI + SQLite Backend**: Located in `/backend` with standard SQLite database schema, Pydantic data validation, and CORS support.
- **Database**: SQLite 3 schema with relational tables for farmers, records, categories, and audit logs.

---

## 📁 Project Structure

```text
├── backend/
│   ├── app.py              # FastAPI application with REST endpoints
│   ├── requirements.txt    # Python dependencies (fastapi, uvicorn, pydantic)
│   ├── schema.sql          # Complete SQLite table schemas & seed categories
│   └── seed.py             # Script to initialize database with 12 sample records
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx        # Project mission, 5 pillars & helplines
│   │   ├── AwarenessProgram.tsx    # 4-stage village demonstration guide
│   │   ├── DashboardStats.tsx      # Ramesh's profile & category distribution
│   │   ├── DigitalSafetySection.tsx# 8 Golden safety rules & fake SMS detector
│   │   ├── Footer.tsx              # Emergency helplines (1551, 1930) & quick links
│   │   ├── HeroSection.tsx         # Modern hero with illustration & primary CTAs
│   │   ├── HowToDigitizeGuide.tsx  # 6-step visual guide & camera scanning simulator
│   │   ├── Navbar.tsx              # Language switcher (EN/TE/HI) & text resizer
│   │   ├── QuizSection.tsx         # 6 interactive safety questions & badge download
│   │   ├── RecordOrganizer.tsx     # Searchable, filterable vault with add/view/download
│   │   ├── WhatRecordsToDigitize.tsx# Agricultural vs Personal records comparison
│   │   └── WhyDigitalRecords.tsx   # 6 core benefits explained in simple language
│   ├── data/
│   │   ├── quizQuestions.ts        # Trilingual quiz data with explanations
│   │   ├── sampleRecords.ts        # Farmer Ramesh (Guntur, AP) sample records
│   │   └── translations.ts         # English, Telugu, Hindi dictionary
│   ├── utils/
│   │   └── speech.ts               # Web Speech API text-to-speech engine
│   ├── App.tsx                     # Main layout & reactive state management
│   ├── index.css                   # Tailwind CSS styling imports
│   ├── main.tsx                    # React application entry point
│   └── types.ts                    # TypeScript interfaces and enum models
├── index.html                      # HTML entry point with Telugu/Devanagari fonts
├── package.json                    # Node dependencies and scripts
├── server.ts                       # Express + Vite server implementation
├── metadata.json                   # AI Studio applet configuration
└── README.md                       # Comprehensive documentation
```

---

## 🚀 Running Locally

### Option 1: Full-Stack React + Express (Default)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

### Option 2: Python FastAPI Backend + React Frontend

1. **Setup Python Virtual Environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Initialize and Seed SQLite Database:**
   ```bash
   python seed.py
   ```

3. **Start FastAPI server:**
   ```bash
   uvicorn app:app --reload --port 8000
   ```
   FastAPI interactive API docs are available at `http://localhost:8000/docs`.

---

## 🔒 Digital Safety & Privacy Notice

- **Educational Practice Prototype**: This system is designed for community workshops, farmer literacy training, and personal record organization practice.
- **No Sensitive ID Storage**: The portal uses synthetic demo IDs (e.g. masked Aadhaar `XXXX-XXXX-4819`). Real sensitive identity cards should only be stored in verified government vaults such as **DigiLocker** or state **MeeSeva** portals.
- **National Helplines**:
  - **Kisan Call Center**: `1551` (Toll-Free Agricultural Advice)
  - **National Cyber Crime Helpline**: `1930` (Report Financial Frauds)

---

## 🌐 Multilingual Support (తెలుగు / हिंदी / English)

Targeting rural farmers in Andhra Pradesh, the portal features extensive Telugu localization alongside Hindi and English:
- High-contrast visual cards with native typography (`Noto Sans Telugu`, `Noto Sans Devanagari`).
- Audio text-to-speech for farmers with limited literacy.
- Culturally relevant sample records (Pahani, 1B Adangal, PM-KISAN, Rythu Bharosa, PACS receipts, MTU-1061 seed varieties).
