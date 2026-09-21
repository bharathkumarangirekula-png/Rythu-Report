export type Language = 'en' | 'te' | 'hi';

export type RecordCategory = 
  | 'Land'
  | 'Crops'
  | 'Finance'
  | 'Insurance'
  | 'Government Schemes'
  | 'Personal'
  | 'Other';

export type RecordClassification = 'Agricultural' | 'Personal' | 'Other';

export interface FarmerRecord {
  id: string;
  name: string;
  category: RecordCategory;
  classification: RecordClassification;
  dateAdded: string;
  year: number;
  fileType: 'PDF' | 'JPG' | 'PNG';
  fileSize: string;
  status: 'Verified' | 'Pending' | 'Archived';
  description: string;
  surveyOrPolicyNo?: string;
  mockContent?: string;
  farmerName?: string;
  kisanId?: string;
  landArea?: string;
  issuingAuthority?: string;
  khataNumber?: string;
  cropVariety?: string;
}

export interface FarmerProfile {
  name: string;
  farmName: string;
  location: string;
  district: string;
  state: string;
  mainCrops: string[];
  landAreaAcres: number;
  phoneMasked: string;
  kisanId: string;
}

export interface QuizQuestion {
  id: number;
  question: {
    en: string;
    te: string;
    hi: string;
  };
  options: {
    en: string[];
    te: string[];
    hi: string[];
  };
  correctIndex: number;
  explanation: {
    en: string;
    te: string;
    hi: string;
  };
  category: 'safety' | 'documents' | 'backup';
}

export interface CategoryStats {
  category: RecordCategory;
  count: number;
  color: string;
}
