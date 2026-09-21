import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Eye, Download, Trash2, 
  FileText, Calendar, ShieldCheck, X, CheckCircle, 
  AlertCircle, UploadCloud, FileSpreadsheet, Lock, User, MapPin, Building, Sprout 
} from 'lucide-react';
import { FarmerRecord, FarmerProfile, Language, RecordCategory } from '../types';
import { translations } from '../data/translations';
import { generateRecordPDF } from '../utils/pdfGenerator';

interface RecordOrganizerProps {
  currentLang: Language;
  records: FarmerRecord[];
  profile?: FarmerProfile;
  onAddRecord: (newRecord: Omit<FarmerRecord, 'id'>) => void;
  onDeleteRecord: (id: string) => void;
  selectedCategoryFilter?: string;
  onClearCategoryFilter?: () => void;
  onResetToZero?: () => void;
  onLoadSampleRecords?: () => void;
}

export const RecordOrganizer: React.FC<RecordOrganizerProps> = ({
  currentLang,
  records,
  profile,
  onAddRecord,
  onDeleteRecord,
  selectedCategoryFilter,
  onClearCategoryFilter,
  onResetToZero,
  onLoadSampleRecords
}) => {
  const t = translations[currentLang];

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>(selectedCategoryFilter || 'All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [yearFilter, setYearFilter] = useState<string>('All');

  // Modal State
  const [previewRecord, setPreviewRecord] = useState<FarmerRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<FarmerRecord | null>(null);

  // New Record Form State
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<RecordCategory>('Land');
  const [newDocType, setNewDocType] = useState<'PDF' | 'JPG' | 'PNG'>('PDF');
  const [newDocDesc, setNewDocDesc] = useState('');
  const [newDocSurvey, setNewDocSurvey] = useState('');
  const [simulatedFileName, setSimulatedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Synchronize category filter if passed from parent
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setCategoryFilter(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  const categories: RecordCategory[] = [
    'Land',
    'Crops',
    'Finance',
    'Insurance',
    'Government Schemes',
    'Personal',
    'Other'
  ];

  // Filtered Records calculation
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        rec.name.toLowerCase().includes(q) ||
        rec.category.toLowerCase().includes(q) ||
        (rec.surveyOrPolicyNo && rec.surveyOrPolicyNo.toLowerCase().includes(q)) ||
        rec.description.toLowerCase().includes(q) ||
        (rec.mockContent && rec.mockContent.toLowerCase().includes(q));

      // Category match
      const matchesCategory = categoryFilter === 'All' || rec.category === categoryFilter;

      // Type match
      const matchesType = typeFilter === 'All' || rec.fileType === typeFilter;

      // Year match
      const matchesYear = yearFilter === 'All' || rec.year.toString() === yearFilter;

      return matchesSearch && matchesCategory && matchesType && matchesYear;
    });
  }, [records, searchQuery, categoryFilter, typeFilter, yearFilter]);

  // Handle Mock File Selection & Validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(currentLang === 'te' ? 'ఫైల్ సైజు 5MB కంటే తక్కువ ఉండాలి.' : currentLang === 'hi' ? 'फाइल का आकार 5MB से कम होना चाहिए।' : 'File size must be under 5MB.');
      return;
    }

    // Validate type
    const ext = file.name.split('.').pop()?.toUpperCase();
    if (ext !== 'PDF' && ext !== 'JPG' && ext !== 'JPEG' && ext !== 'PNG') {
      setUploadError(currentLang === 'te' ? 'దయచేసి PDF, JPG లేదా PNG ఫైల్ మాత్రమే ఎంచుకోండి.' : currentLang === 'hi' ? 'कृपया केवल PDF, JPG या PNG फाइल चुनें।' : 'Allowed types are PDF, JPG, PNG only.');
      return;
    }

    setSimulatedFileName(file.name);
    setNewDocType(ext === 'JPEG' ? 'JPG' : (ext as 'PDF' | 'JPG' | 'PNG'));
    if (!newDocName) {
      setNewDocName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleSaveNewRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const classification = 
      newDocCategory === 'Personal' ? 'Personal' :
      (newDocCategory === 'Land' || newDocCategory === 'Crops') ? 'Agricultural' : 'Other';

    const farmerName = profile?.name || 'Bharath kumar Angirekula';
    const kisanId = profile?.kisanId || 'AP-GNT-2026-8841';
    const farmHolding = profile?.farmName || 'My Farm';
    const landArea = profile?.landAreaAcres ? `${profile.landAreaAcres} Acres` : '4.5 Acres';
    const locationStr = `${profile?.location || 'Tenali Mandal'}, ${profile?.district || 'Guntur'}, ${profile?.state || 'Andhra Pradesh'}`;
    const surveyNo = newDocSurvey.trim() || `REF-${Math.floor(1000 + Math.random() * 9000)}`;
    const issueDate = new Date().toISOString().split('T')[0];

    const detailedMockLines = [
      `RYTHU DIGITAL LOCKER | OFFICIAL RECORD ARCHIVE`,
      `=================================================================================`,
      `SECTION 1: REGISTERED FARMER PARTICULARS`,
      `* Farmer Name    : ${farmerName}`,
      `* Kisan ID       : ${kisanId}`,
      `* Farm Holding   : ${farmHolding} (${landArea})`,
      `* Village/Mandal : ${locationStr}`,
      `* Phone / Aadhaar: ${profile?.phoneMasked || '+91 98765 *****'} (e-KYC Verified UIDAI)`,
      ``,
      `SECTION 2: RECORD REGISTRATION DETAILS`,
      `* Document Title : ${newDocName.trim()}`,
      `* Category       : ${newDocCategory} (${classification})`,
      `* Survey / Ref No: ${surveyNo}`,
      `* Issue Date     : ${issueDate}`,
      `* Status         : [VERIFIED] Official copy stored in encrypted farmer vault`,
      ``,
      `SECTION 3: SPECIFICATIONS & PARTICULARS`,
      `* Remarks/Desc   : ${newDocDesc.trim() || 'Official agricultural document archived for farmer records and scheme availment.'}`,
      newDocCategory === 'Crops' ? `* Crop Details   : Sown Variety Paddy/Cotton/Chilli | High-Yield Lot APSSDC-2026` : '',
      newDocCategory === 'Land'  ? `* Land Tenure    : Pattadar Rythu 1B Adangal Title Verified | Clean Ayacut Land` : '',
      newDocCategory === 'Finance' || newDocCategory === 'Insurance' ? `* Scheme Info    : PMFBY Crop Insurance / Kisan Credit Facility Active` : '',
      ``,
      `SECTION 4: DIGITAL AUTHENTICATION & SIGNATURE`,
      `* Hash Checksum  : SHA-256 [9F83-B402-7E11-88AA-C409-5210-F18E]`,
      `* Issuing Office : Rythu Bharosa Kendra (RBK) & Dept. of Agriculture, AP`,
      `* Certified By   : Village Agriculture Assistant & VRO (Digitally Signed)`
    ].filter(Boolean).join('\n');

    onAddRecord({
      name: newDocName.trim(),
      category: newDocCategory,
      classification,
      dateAdded: issueDate,
      year: new Date().getFullYear(),
      fileType: newDocType,
      fileSize: "1.2 MB",
      status: "Verified",
      description: newDocDesc.trim() || "Farmer uploaded verified record with full agricultural particulars.",
      surveyOrPolicyNo: surveyNo,
      farmerName,
      kisanId,
      landArea,
      mockContent: detailedMockLines
    });

    // Reset Form & Close
    setNewDocName('');
    setNewDocDesc('');
    setNewDocSurvey('');
    setSimulatedFileName('');
    setIsAddModalOpen(false);
  };

  // Document PDF Download
  const handleDownload = (rec: FarmerRecord) => {
    try {
      generateRecordPDF(rec, profile);
    } catch (err) {
      console.error('Error generating PDF:', err);
      // Fallback in case of unexpected error
      const textContent = `FARMER DIGITAL RECORDS PORTAL\n${rec.name}\n${rec.mockContent || rec.description}`;
      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${rec.name.replace(/\s+/g, '_')}_${rec.dateAdded}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <section id="records" className="py-12 sm:py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{currentLang === 'te' ? 'పత్రాల నిర్వాహకుడు' : currentLang === 'hi' ? 'दस्तावेज प्रबंधन' : 'Secure Document Vault'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t.organizerTitle}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-1">
              {t.organizerSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {records.length > 0 && onResetToZero && (
              <button
                onClick={onResetToZero}
                className="flex items-center justify-center gap-1.5 px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-2xl font-bold text-xs transition cursor-pointer"
                title="Reset all records to zero"
              >
                <Trash2 className="w-4 h-4" />
                <span>{currentLang === 'te' ? 'అన్నీ క్లియర్ చేయండి (0)' : currentLang === 'hi' ? 'सभी साफ़ करें (0)' : 'Clear to Zero (0)'}</span>
              </button>
            )}

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-2xl font-bold text-sm shadow-md transition cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>{t.btnAddRecord}</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar (Section 6 requirement) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs mb-6 space-y-4 text-left">
          
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-10 py-3 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-stone-400 mr-1">
              {currentLang === 'te' ? 'త్వరిత శోధన:' : currentLang === 'hi' ? 'त्वरित खोज:' : 'Quick Search:'}
            </span>
            {[
              { label: currentLang === 'te' ? 'వరి / Rice' : currentLang === 'hi' ? 'चावल / Rice' : 'Rice / Paddy', query: 'rice' },
              { label: currentLang === 'te' ? 'విత్తన రసీదు' : currentLang === 'hi' ? 'बीज बिल' : 'Seed Bill', query: 'seed' },
              { label: currentLang === 'te' ? 'భూమి పట్టా' : currentLang === 'hi' ? 'भूमि पट्टा' : 'Land Patta', query: 'patta' },
              { label: currentLang === 'te' ? 'నేల ఆరోగ్యం' : currentLang === 'hi' ? 'मृदा स्वास्थ्य' : 'Soil Test', query: 'soil' },
              { label: currentLang === 'te' ? 'పంట బీమా' : currentLang === 'hi' ? 'फसल बीमा' : 'PMFBY', query: 'insurance' }
            ].map((tag) => (
              <button
                key={tag.query}
                type="button"
                onClick={() => {
                  setSearchQuery(tag.query);
                  setCategoryFilter('All');
                }}
                className={`text-xs px-2.5 py-1 rounded-full border transition cursor-pointer font-medium ${
                  searchQuery.toLowerCase() === tag.query.toLowerCase()
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Filter Dropdowns Row */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 whitespace-nowrap">
                {currentLang === 'te' ? 'వర్గం:' : currentLang === 'hi' ? 'श्रेणी:' : 'Category:'}
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="All">{t.allCategories}</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Document Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 whitespace-nowrap">
                {currentLang === 'te' ? 'రకం:' : currentLang === 'hi' ? 'प्रकार:' : 'Type:'}
              </span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="All">{t.allTypes}</option>
                <option value="PDF">PDF</option>
                <option value="JPG">JPG</option>
                <option value="PNG">PNG</option>
              </select>
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 whitespace-nowrap">
                {currentLang === 'te' ? 'సంవత్సరం:' : currentLang === 'hi' ? 'वर्ष:' : 'Year:'}
              </span>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="All">{currentLang === 'te' ? 'అన్ని సంవత్సరాలు' : currentLang === 'hi' ? 'सभी वर्ष' : 'All Years'}</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>

            {/* Active Filters Clear Indicator */}
            {(categoryFilter !== 'All' || typeFilter !== 'All' || yearFilter !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setCategoryFilter('All');
                  setTypeFilter('All');
                  setYearFilter('All');
                  setSearchQuery('');
                  if (onClearCategoryFilter) onClearCategoryFilter();
                }}
                className="ml-auto text-xs font-bold text-rose-600 hover:text-rose-800 underline transition"
              >
                {currentLang === 'te' ? 'ఫిల్టర్లు క్లియర్ చేయండి' : currentLang === 'hi' ? 'फ़िल्टर हटाएं' : 'Reset All Filters'}
              </button>
            )}

          </div>
        </div>

        {records.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center shadow-xs">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-100">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">
              {currentLang === 'te' ? 'వాల్ట్ ప్రస్తుతానికి ఖాళీగా ఉంది (0 రికార్డులు)' : currentLang === 'hi' ? 'वॉल्ट वर्तमान में खाली है (0 रिकॉर्ड)' : 'Vault is Empty (0 Records)'}
            </h3>
            <p className="text-sm text-stone-600 max-w-lg mx-auto mb-6 leading-relaxed">
              {currentLang === 'te'
                ? 'మీరు పత్రాలను లేదా వివరాలను నమోదు చేసే వరకు మొత్తం చరిత్ర 0 విలువలుగా ఉంటుంది. మీ మొదటి వ్యవసాయ లేదా వ్యక్తిగత రికార్డును జోడించడానికి క్రింది బటన్ నొక్కండి.'
                : currentLang === 'hi'
                ? 'जब तक आप दस्तावेज़ दर्ज नहीं करते, तब तक सभी मान 0 रहेंगे। अपना पहला कृषि या व्यक्तिगत रिकॉर्ड जोड़ने के लिए नीचे दिए गए बटन पर क्लिक करें।'
                : 'All history and record values are set to zero until you provide or add documents. Click below to add your first record.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>{t.btnAddRecord}</span>
              </button>
              {onLoadSampleRecords && (
                <button
                  onClick={onLoadSampleRecords}
                  className="px-5 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm border border-stone-300 transition flex items-center gap-2 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>
                    {currentLang === 'te' ? 'వరి & నమూనా పత్రాలను లోడ్ చేయండి' : currentLang === 'hi' ? 'चावल और नमूना रिकॉर्ड लोड करें' : 'Load Demo Sample Records'}
                  </span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-3 px-1">
              <span>{currentLang === 'te' ? `కనిపిస్తున్న పత్రాలు: ${filteredRecords.length}` : currentLang === 'hi' ? `दिखाए गए दस्तावेज: ${filteredRecords.length}` : `Showing ${filteredRecords.length} records`}</span>
              <span className="text-emerald-700">🔒 Demo Safe Mode</span>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden text-left">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-100/80 border-b border-stone-200 text-stone-700 uppercase font-bold text-xs">
                    <tr>
                      <th className="px-5 py-4">{t.colName}</th>
                      <th className="px-5 py-4">{t.colCategory}</th>
                      <th className="px-5 py-4">{t.colDate}</th>
                      <th className="px-5 py-4">{t.colType}</th>
                      <th className="px-5 py-4">{t.colStatus}</th>
                      <th className="px-5 py-4 text-right">{t.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((rec) => (
                        <tr key={rec.id} className="hover:bg-emerald-50/40 transition">
                          <td className="px-5 py-4">
                            <div className="font-bold text-stone-900">{rec.name}</div>
                            <div className="text-xs text-stone-500 mt-0.5">
                              {rec.surveyOrPolicyNo || rec.description.slice(0, 45)}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200">
                              {rec.category}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs font-medium text-stone-600">
                            {rec.dateAdded}
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono">
                              {rec.fileType}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{t.statusVerified}</span>
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right space-x-2">
                            <button
                              onClick={() => setPreviewRecord(rec)}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-emerald-100 text-stone-800 hover:text-emerald-900 rounded-lg text-xs font-bold transition inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{t.btnView}</span>
                            </button>
                            <button
                              onClick={() => handleDownload(rec)}
                              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold transition inline-flex items-center gap-1 cursor-pointer"
                              title="Download Official PDF Certificate"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>PDF</span>
                            </button>
                            <button
                              onClick={() => setDeleteCandidate(rec)}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition inline-flex items-center cursor-pointer"
                              title={t.btnDelete}
                              aria-label={t.btnDelete}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center text-stone-500">
                          <FileText className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                          <p className="font-semibold text-stone-700">{t.noRecordsFound}</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards View (Responsive high-accessibility pattern) */}
            <div className="md:hidden space-y-3.5 text-left">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-stone-900 text-base leading-snug">
                          {rec.name}
                        </h3>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {rec.surveyOrPolicyNo}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {rec.fileType}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-lg bg-stone-100 text-stone-700 font-bold border border-stone-200">
                        {rec.category}
                      </span>
                      <span className="text-stone-500 font-medium">
                        📅 {rec.dateAdded}
                      </span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        ✓ {t.statusVerified}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => setPreviewRecord(rec)}
                          className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>{t.btnView}</span>
                        </button>
                        <button
                          onClick={() => handleDownload(rec)}
                          className="flex-1 py-2.5 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>{currentLang === 'te' ? 'PDF డౌన్‌లోడ్' : currentLang === 'hi' ? 'PDF डाउनलोड' : 'Download PDF'}</span>
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(rec)}
                          className="p-2.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center text-stone-500">
                  <FileText className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <p className="font-semibold text-stone-700">{t.noRecordsFound}</p>
                </div>
              )}
            </div>
          </>
        )}

      </div>

      {/* View Document Modal */}
      {previewRecord && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 text-left shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between pb-4 border-b border-stone-100 flex-shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {previewRecord.category} • {previewRecord.fileType}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Official Copy
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  {previewRecord.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewRecord(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Document Details matching PDF */}
            <div className="my-4 space-y-4 overflow-y-auto pr-1 flex-1">
              
              {/* Section 1: Farmer Particulars */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-3">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Section 1: Registered Farmer & Holding Details</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 block">Farmer / Rythu Name:</span>
                    <strong className="text-stone-900 text-sm font-bold">
                      {profile?.name || previewRecord.farmerName || 'Bharath kumar Angirekula'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Kisan / Farmer ID:</span>
                    <strong className="text-emerald-700 font-mono font-bold">
                      {profile?.kisanId || previewRecord.kisanId || 'AP-GNT-2026-8841'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Farm Holding & Land Area:</span>
                    <strong className="text-stone-800">
                      {profile?.farmName || 'My Farm'} ({profile?.landAreaAcres ? `${profile.landAreaAcres} Acres` : (previewRecord.landArea || '4.5 Acres')})
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Location / Mandal:</span>
                    <strong className="text-stone-800">
                      {profile?.location || 'Tenali Mandal'}, {profile?.district || 'Guntur'}, {profile?.state || 'Andhra Pradesh'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Registered Crops:</span>
                    <strong className="text-stone-800">
                      {(profile?.mainCrops && profile.mainCrops.length > 0) ? profile.mainCrops.join(', ') : 'Rice, Chilli, Cotton'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Mobile & e-KYC Vault:</span>
                    <strong className="text-stone-800">
                      {profile?.phoneMasked || '+91 98765 *****'} (UIDAI Authenticated)
                    </strong>
                  </div>
                </div>
              </div>

              {/* Section 2: Registration & Field Data */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-3">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Section 2: Document Registration & Reference</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 block">Survey / Reference Number:</span>
                    <strong className="text-stone-900 font-mono font-bold">
                      {previewRecord.surveyOrPolicyNo || 'Sy. No. 142/2A'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Registration Date & Year:</span>
                    <strong className="text-stone-900">
                      {previewRecord.dateAdded} ({previewRecord.year})
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Issuing Authority:</span>
                    <strong className="text-stone-900">
                      {previewRecord.category === 'Land' 
                        ? 'Revenue Dept. & Sub-Registrar Office, AP'
                        : previewRecord.category === 'Crops' 
                        ? 'Rythu Bharosa Kendra (RBK) & Dept. of Agriculture'
                        : 'District Agricultural Services & Cooperation'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Classification & Format:</span>
                    <strong className="text-stone-900">
                      {previewRecord.classification} • {previewRecord.fileType} ({previewRecord.fileSize})
                    </strong>
                  </div>
                </div>
              </div>

              {/* Section 3: Full Official Transcript */}
              <div className="p-4 rounded-2xl bg-stone-900 text-emerald-300 font-mono text-xs whitespace-pre-line leading-relaxed border border-stone-800">
                <div className="text-stone-400 font-bold mb-2 pb-2 border-b border-stone-800">
                  SECTION 3: OFFICIAL TRANSCRIPT & PARTICULARS
                </div>
                {previewRecord.mockContent || previewRecord.description}
              </div>

              {/* Section 4: Security Stamp */}
              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Digitally Signed & Certified</span>
                    <span className="text-[11px] text-emerald-800">Village Agriculture Assistant (VAA) & VRO Certified Copy</span>
                  </div>
                </div>
                <div className="font-mono text-[10px] text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-300 self-start sm:self-center">
                  SHA-256: 9F83-B402-7E11-{previewRecord.id.slice(-4).toUpperCase() || '7780'}
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 flex-shrink-0">
              <button
                onClick={() => setPreviewRecord(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100"
              >
                {t.close}
              </button>
              <button
                onClick={() => handleDownload(previewRecord)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{currentLang === 'te' ? 'పూర్తి PDF డౌన్‌లోడ్' : currentLang === 'hi' ? 'पूरा PDF डाउनलोड' : 'Download Full PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Record Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-left shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  {currentLang === 'te' ? 'కొత్త డెమో రికార్డును చేర్చండి' : currentLang === 'hi' ? 'नया डेमो रिकॉर्ड जोड़ें' : 'Add New Demo Record'}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {currentLang === 'te' ? 'పత్రాలను ఆర్గనైజ్ చేయడం ప్రాక్టీస్ చేయండి' : currentLang === 'hi' ? 'दस्तावेज व्यवस्थित करने का अभ्यास करें' : 'Practice organizing farming documents'}
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewRecord} className="space-y-4 my-4">
              
              {/* Privacy Warning */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{currentLang === 'te' ? 'గమనిక: అసలు ఆధార్ లేదా గోప్యమైన గుర్తింపు కార్డులను డెమో సైట్లలో అప్‌లోడ్ చేయకండి.' : currentLang === 'hi' ? 'सूचना: वास्तविक आधार या गोपनीय पहचान पत्र डेमो साइट पर अपलोड न करें।' : 'Security reminder: Do not upload real sensitive government IDs to this practice prototype.'}</span>
              </div>

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {currentLang === 'te' ? 'పత్రం పేరు (ఉదా: వరి విత్తన బిల్లు)' : currentLang === 'hi' ? 'दस्तावेज़ का नाम (उदा: धान बीज बिल)' : 'Document Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g., Rice Seed Purchase Bill 2026"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Category & Type row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {currentLang === 'te' ? 'వర్గం' : currentLang === 'hi' ? 'श्रेणी' : 'Category'}
                  </label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value as RecordCategory)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {currentLang === 'te' ? 'ఫైల్ రకం' : currentLang === 'hi' ? 'फाइल प्रकार' : 'File Type'}
                  </label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as 'PDF' | 'JPG' | 'PNG')}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="JPG">JPG Image</option>
                    <option value="PNG">PNG Image</option>
                  </select>
                </div>
              </div>

              {/* Reference / Survey No */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {currentLang === 'te' ? 'సర్వే నంబర్ / బిల్లు లేదా పాలసీ నంబర్' : currentLang === 'hi' ? 'खसरा / बिल या पॉलिसी नंबर' : 'Survey / Bill / Policy Number'}
                </label>
                <input
                  type="text"
                  value={newDocSurvey}
                  onChange={(e) => setNewDocSurvey(e.target.value)}
                  placeholder="e.g., Survey 142/2A or INV-9921"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* File Upload Simulation with drag / choose */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {currentLang === 'te' ? 'నమూనా ఫైల్ ఎంచుకోండి (గరిష్టంగా 5MB)' : currentLang === 'hi' ? 'नमूना फाइल चुनें (अधिकतम 5MB)' : 'Select Demo File (Max 5MB)'}
                </label>
                <div className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-2xl p-4 text-center bg-stone-50 transition cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 text-stone-400 mx-auto mb-1" />
                  <span className="text-xs text-stone-700 font-semibold block">
                    {simulatedFileName || (currentLang === 'te' ? 'ఫైల్ అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి' : currentLang === 'hi' ? 'फाइल अपलोड करने के लिए क्लिक करें' : 'Click to select sample PDF or image')}
                  </span>
                  <span className="text-[10px] text-stone-400">PDF, JPG, PNG up to 5MB</span>
                </div>
                {uploadError && (
                  <p className="text-xs text-rose-600 font-semibold mt-1">⚠️ {uploadError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100"
                >
                  {t.close}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
                >
                  {currentLang === 'te' ? 'రికార్డును భద్రపరచండి' : currentLang === 'hi' ? 'रिकॉर्ड सहेजें' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-left shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              {currentLang === 'te' ? 'ఈ రికార్డును తొలగించాలా?' : currentLang === 'hi' ? 'क्या यह रिकॉर्ड हटाना चाहते हैं?' : 'Delete This Record?'}
            </h3>
            <p className="text-sm text-stone-600 mt-2">
              "{deleteCandidate.name}"
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {currentLang === 'te' ? 'ఇది డెమో జాబితా నుండి తొలగించబడుతుంది.' : currentLang === 'hi' ? 'यह डेमो सूची से हटा दिया जाएगा।' : 'This will remove the demo record from your dashboard.'}
            </p>

            <div className="flex items-center justify-end gap-3 pt-5 mt-4 border-t border-stone-100">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100"
              >
                {t.close}
              </button>
              <button
                onClick={() => {
                  onDeleteRecord(deleteCandidate.id);
                  setDeleteCandidate(null);
                }}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold shadow-xs"
              >
                {t.btnDelete}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
