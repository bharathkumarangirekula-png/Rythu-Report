import { FarmerProfile, FarmerRecord, CategoryStats } from '../types';

export const initialFarmerProfile: FarmerProfile = {
  name: "Farmer",
  farmName: "My Farm",
  location: "Village / Mandal",
  district: "District",
  state: "State",
  mainCrops: [],
  landAreaAcres: 0,
  phoneMasked: "+91 ***** *****",
  kisanId: "KL-NEW-0000"
};

// All initial history and records start at zero until the user adds records
export const initialRecords: FarmerRecord[] = [];

// Optional sample templates available for quick demonstration or practice if needed
export const sampleTemplates: FarmerRecord[] = [
  {
    id: "rec-01",
    name: "Land Record (Pahani / 1B Adangal)",
    category: "Land",
    classification: "Agricultural",
    dateAdded: "2026-03-12",
    year: 2026,
    fileType: "PDF",
    fileSize: "1.4 MB",
    status: "Verified",
    description: "Official survey record showing land extent of 4.5 Acres under Survey No. 142/2A.",
    surveyOrPolicyNo: "Survey No: 142/2A",
    mockContent: "REVENUE DEPARTMENT - GOVT OF ANDHRA PRADESH\nForm 1B (RoR) / Pahani Record\nOwner: Ramesh\nVillage: Angalakuduru, Mandal: Tenali, District: Guntur\nSurvey No: 142/2A | Extent: 4.50 Acres | Classification: Wet Land (Kalyani Ayacut)\nWater Source: Krishna Canal | Mutation Status: Approved (Digitally Signed)"
  },
  {
    id: "rec-02",
    name: "Soil Test Report (N-P-K Health Card)",
    category: "Crops",
    classification: "Agricultural",
    dateAdded: "2026-02-18",
    year: 2026,
    fileType: "PDF",
    fileSize: "890 KB",
    status: "Verified",
    description: "Soil nutrient analysis recommending balanced zinc and potassium for high-yield paddy.",
    surveyOrPolicyNo: "SHC-2026-AP-994",
    mockContent: "KRISHI VIGYAN KENDRA & DEPT OF AGRICULTURE\nSoil Health Card\nFarmer: Ramesh | Sample Date: Feb 2026\nSoil Type: Black Cotton Sandy Loam\npH: 7.2 (Optimal) | Organic Carbon: 0.58% (Medium)\nNitrogen (N): 210 kg/ha (Low) | Phosphorus (P): 28 kg/ha (Adequate) | Potassium (K): 310 kg/ha (High)\nRecommendation: Apply 120kg Urea in 3 splits + Zinc Sulphate 25kg/ha."
  },
  {
    id: "rec-03",
    name: "Crop Insurance Policy (PMFBY Kharif)",
    category: "Insurance",
    classification: "Agricultural",
    dateAdded: "2026-01-25",
    year: 2026,
    fileType: "PDF",
    fileSize: "1.1 MB",
    status: "Verified",
    description: "Pradhan Mantri Fasal Bima Yojana coverage against drought, excess rainfall, and pest attack.",
    surveyOrPolicyNo: "PMFBY/2026/AP/00912",
    mockContent: "AGRICULTURE INSURANCE COMPANY OF INDIA\nPMFBY Kharif Season Crop Insurance Certificate\nInsured: Ramesh | Bank: AP Grameena Vikas Bank, Tenali\nInsured Crop: Paddy (MTU 1061) | Sum Insured: ₹1,80,000\nFarmer Premium Paid: ₹3,600 (2%) | Govt Subsidy: ₹14,400\nCoverage Period: June 2026 - Nov 2026"
  },
  {
    id: "rec-04",
    name: "Seed Purchase Bill (Paddy / Rice MTU-1061)",
    category: "Crops",
    classification: "Agricultural",
    dateAdded: "2026-04-05",
    year: 2026,
    fileType: "JPG",
    fileSize: "620 KB",
    status: "Verified",
    description: "Certified disease-resistant paddy (rice / వరి) seed invoice with germination test certificate and subsidy acknowledgment.",
    surveyOrPolicyNo: "INV-SEED-8812",
    mockContent: "AP STATE SEEDS DEVELOPMENT CORP LTD\nGOVERNMENT OF ANDHRA PRADESH\nTax Invoice & Certified Seed Quality Slip\n\nInvoice No: INV-SEED-8812 | Date: 05-Apr-2026\nSold to: Ramesh (Farmer Code: AP-GNT-4819)\nCrop: Paddy / Rice (వరి / धान)\nVariety: Foundation Seeds MTU-1061 (Indra / Cotton Dora Sannalu)\nClass of Seed: Certified Class-I\nLot Number: K-88120/26 | Purity: 98.4%\nGermination Rate: 94% (Min Standard: 80%)\nMoisture Content: 12.1%\nQuantity: 4 Bags (30 kg each) = 120 kg (for 3.0 Acres)\nMarket Rate: ₹1,600 / bag = ₹6,400\nGovt Subsidy: ₹1,600 (25% Direct Subsidy)\nTotal Amount Paid: ₹4,800 (Cash/UPI)\nIssued By: Rythu Bharosa Kendra (RBK) Seed Depot, Tenali"
  },
  {
    id: "rec-05",
    name: "Fertilizer Purchase Receipt (Urea & DAP)",
    category: "Crops",
    classification: "Agricultural",
    dateAdded: "2026-04-20",
    year: 2026,
    fileType: "JPG",
    fileSize: "540 KB",
    status: "Verified",
    description: "Official POS machine receipt from Primary Agricultural Cooperative Society (PACS).",
    surveyOrPolicyNo: "PACS-POS-4401",
    mockContent: "PRIMARY AGRICULTURAL COOPERATIVE SOCIETY (PACS)\ne-POS Fertilizer Sales Receipt (Aadhaar Authenticated)\nBuyer: Ramesh | Date: 20-Apr-2026\nItem 1: Neem Coated Urea (45kg bag) x 4 = ₹1,066\nItem 2: DAP (50kg bag) x 2 = ₹2,700\nTotal Amount: ₹3,766 | Paid via UPI QR"
  },
  {
    id: "rec-06",
    name: "Organic Bio-Pesticide Application Record",
    category: "Crops",
    classification: "Agricultural",
    dateAdded: "2026-05-10",
    year: 2026,
    fileType: "PDF",
    fileSize: "410 KB",
    status: "Verified",
    description: "Spray schedule log for chilli thrips and caterpillar biological management.",
    surveyOrPolicyNo: "LOG-PEST-2026-02",
    mockContent: "FARM MANAGEMENT LOG - GREEN VALLEY FARM\nField Unit: North Plot (Chilli)\nTreatment: Neem Oil (10,000 ppm) + Beauveria Bassiana\nTarget Pest: Chilli Thrips & Whitefly\nWeather Conditions: Clear morning (28°C, low wind)\nSafety Equipment Used: Mask, gloves, gumboots\nNext Evaluation Date: 20-May-2026"
  },
  {
    id: "rec-07",
    name: "Drip Irrigation Subsidy Sanction Order",
    category: "Crops",
    classification: "Agricultural",
    dateAdded: "2026-01-10",
    year: 2026,
    fileType: "PDF",
    fileSize: "1.3 MB",
    status: "Verified",
    description: "Andhra Pradesh Micro Irrigation Project (APMIP) 90% subsidy sanction for 2 acres chilli.",
    surveyOrPolicyNo: "APMIP/GNT/2026/512",
    mockContent: "AP MICRO IRRIGATION PROJECT (APMIP)\nSanction & Inspection Order\nBeneficiary: Ramesh | Scheme: PMKSY Micro-Irrigation\nTotal Cost: ₹92,000 | Govt Subsidy (90%): ₹82,800\nFarmer Share Paid: ₹9,200\nFitted: Lateral pipes, drippers, screen filter, venturi injector."
  },
  {
    id: "rec-08",
    name: "Aadhaar Masked Copy (Demo Sample)",
    category: "Personal",
    classification: "Personal",
    dateAdded: "2026-02-01",
    year: 2026,
    fileType: "PDF",
    fileSize: "780 KB",
    status: "Verified",
    description: "Masked identity document showing only last 4 digits (XXXX-XXXX-4819) for safe farmer records.",
    surveyOrPolicyNo: "XXXX-XXXX-4819",
    mockContent: "UNIQUE IDENTIFICATION AUTHORITY OF INDIA\nMASKED AADHAAR CARD (DEMO COPY ONLY)\nName: Ramesh | Gender: Male | Year of Birth: 1982\nAadhaar Number: XXXX XXXX 4819\nAddress: Angalakuduru Village, Tenali, Guntur, AP - 522211\nNotice: First 8 digits masked for digital privacy protection."
  },
  {
    id: "rec-09",
    name: "Bank Passbook Front Page (AP Grameena Bank)",
    category: "Finance",
    classification: "Personal",
    dateAdded: "2026-01-15",
    year: 2026,
    fileType: "JPG",
    fileSize: "910 KB",
    status: "Verified",
    description: "Account number and IFSC verification page required for direct benefit transfers (DBT).",
    surveyOrPolicyNo: "A/C: ****5542",
    mockContent: "ANDHRA PRAGATHI GRAMEENA BANK\nSavings Account Passbook\nAccount Holder: Ramesh\nA/C No: 7392 0100 0055 42 (Masked for demo)\nIFSC Code: APGB0001048 | Branch: Tenali Market Yard\nLinked for Direct Benefit Transfer (DBT) & PM-KISAN payments."
  },
  {
    id: "rec-10",
    name: "Rural Health & Life Micro-Insurance",
    category: "Insurance",
    classification: "Personal",
    dateAdded: "2026-03-01",
    year: 2026,
    fileType: "PDF",
    fileSize: "680 KB",
    status: "Verified",
    description: "Pradhan Mantri Suraksha Bima Yojana (PMSBY) annual policy document.",
    surveyOrPolicyNo: "PMSBY/AP/88219",
    mockContent: "PRADHAN MANTRI SURAKSHA BIMA YOJANA\nAnnual Accidental Insurance Certificate\nPolicyholder: Ramesh | Nominee: Laxmi (Wife)\nSum Insured: ₹2,00,000 | Annual Premium: ₹20\nAuto-debited from Savings Account on 31-May."
  },
  {
    id: "rec-11",
    name: "Kisan Credit Card (KCC) Loan Sanction Slip",
    category: "Finance",
    classification: "Other",
    dateAdded: "2026-02-10",
    year: 2026,
    fileType: "PDF",
    fileSize: "1.2 MB",
    status: "Verified",
    description: "Annual crop operational credit limit of ₹2,50,000 with 4% prompt repayment interest subvention.",
    surveyOrPolicyNo: "KCC-2026-AP-0192",
    mockContent: "KCC CROP LOAN SANCTION ADVICE\nLender: Andhra Pragathi Grameena Bank, Tenali\nBorrower: Ramesh | KCC Account: KCC-88192\nSanctioned Limit: ₹2,50,000 (Paddy ₹1,50,000 + Chilli ₹1,00,000)\nBase Interest: 7% p.a. | Effective Interest on Timely Repayment: 4% p.a."
  },
  {
    id: "rec-12",
    name: "Rythu Bharosa / PM-KISAN Beneficiary Receipt",
    category: "Government Schemes",
    classification: "Other",
    dateAdded: "2026-05-02",
    year: 2026,
    fileType: "PDF",
    fileSize: "520 KB",
    status: "Verified",
    description: "Direct bank transfer credit confirmation slip from Agriculture Department.",
    surveyOrPolicyNo: "PMK-AP-2026-4412",
    mockContent: "GOVERNMENT OF ANDHRA PRADESH - AGRICULTURE DEPARTMENT\nRythu Bharosa / PM-KISAN Direct Transfer Acknowledgment\nBeneficiary: Ramesh | Farmer Code: GNT-TEN-8841\nPayment Reference: UTR #SBIN00299104882\nAmount Credited: ₹7,500 (Kharif Installment)\nStatus: Direct Credit Successful (Aadhaar Payment Bridge System)"
  },
  {
    id: "rec-13",
    name: "e-Crop Booking Certificate (Paddy / వరి సాగు నమోదు)",
    category: "Crops",
    classification: "Agricultural",
    dateAdded: "2026-06-12",
    year: 2026,
    fileType: "PDF",
    fileSize: "840 KB",
    status: "Verified",
    description: "Official Joint Azmoish e-Crop Adangal verification certificate for Rice / Paddy cultivation with geo-tagging and VAA digital signature.",
    surveyOrPolicyNo: "eCROP-AP-2026-99214",
    mockContent: "DEPARTMENT OF AGRICULTURE & REVENUE - GOVT OF ANDHRA PRADESH\ne-CROP BOOKING / JOINT AZMOISH CULTIVATION CERTIFICATE\n(వరి పంట సాగు నమోదు ధృవీకరణ పత్రం)\n\nCertificate No: eCROP-AP-2026-99214 | Season: Kharif 2026\nFarmer Name: Ramesh (S/o Venkataswamy)\nAadhaar (Masked): XXXX-XXXX-4819 | Pattadar Passbook: T080901244\nDistrict: Guntur | Mandal: Tenali | Village: Angalakuduru\nSurvey No: 248/3B | Total Extent Sown: 3.00 Acres\nCrop Name: Paddy / Rice (వరి / ధాన్యం) | Variety: MTU-1061 (Indra)\nSowing Date: 28-May-2026 | Stage: Tillering to Vegetative\nIrrigation Source: Krishna Western Delta Canal (Canal Irrigated)\nGeo-Tag Coordinates: 16.2431° N, 80.6402° E\nInspected & Digitally Certified By: Village Agriculture Assistant (VAA), RBK\nEntitlements Linked: PMFBY Crop Insurance, Free Crop Insurance, MSP Procurement, Input Subsidy"
  },
  {
    id: "rec-14",
    name: "Paddy MSP Procurement & Grain Delivery Slip",
    category: "Crops",
    classification: "Agricultural",
    dateAdded: "2026-11-28",
    year: 2026,
    fileType: "PDF",
    fileSize: "920 KB",
    status: "Verified",
    description: "AP State Civil Supplies paddy sale receipt with grain moisture test, weighing bridge weight slip, and MSP direct bank credit advice.",
    surveyOrPolicyNo: "PADDY-MSP-2026-4402",
    mockContent: "AP STATE CIVIL SUPPLIES CORPORATION LTD\nFARMER PADDY PROCUREMENT RECEIPT & WEIGHMENT SLIP\n(రైతు భరోసా కేంద్రం - వరి ధాన్యం కొనుగోలు రసీదు)\n\nPPC Center: Angalakuduru RBK / PACS #482 | Date: 28-Nov-2026\nFarmer Name: Ramesh | Bank A/C: APGB ****5542\ne-Crop Booking ID: eCROP-AP-2026-99214\nCrop: Paddy Grade 'A' (Common Rice Grain - MTU 1061)\nMoisture Analysis: 16.2% (Permissible limit: <=17.0%)\nForeign Matter / Impurities: 0.8% (Pass)\nNumber of Gunny Bags: 150 Bags (75 kg each)\nGross Weight: 11,400 kg | Tare Weight: 150 kg | Net Grain Weight: 11,250 kg (112.5 Quintals)\nMinimum Support Price (MSP Rate): ₹2,320 per Quintal\nTotal Value: ₹2,61,000\nPayment Method: Direct Benefit Transfer (DBT) to Bank Account\nStatus: Successfully Processed into Treasury Account"
  }
];

export const initialCategoryStats: CategoryStats[] = [
  { category: "Land", count: 0, color: "#16a34a" },
  { category: "Crops", count: 0, color: "#059669" },
  { category: "Finance", count: 0, color: "#2563eb" },
  { category: "Insurance", count: 0, color: "#d97706" },
  { category: "Government Schemes", count: 0, color: "#9333ea" },
  { category: "Personal", count: 0, color: "#0891b2" },
  { category: "Other", count: 0, color: "#475569" }
];
