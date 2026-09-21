import React, { useState } from 'react';
import { 
  FolderArchive, Wheat, User, FileText, 
  MapPin, Building, Sparkles, TrendingUp, ShieldCheck, Edit3 
} from 'lucide-react';
import { FarmerProfile, Language, RecordCategory } from '../types';
import { translations } from '../data/translations';
import { EditProfileModal } from './EditProfileModal';

interface DashboardStatsProps {
  currentLang: Language;
  profile: FarmerProfile;
  totalCount: number;
  agriCount: number;
  personalCount: number;
  otherCount: number;
  categoryBreakdown: { category: RecordCategory; count: number; color: string }[];
  onSelectCategory?: (category: string) => void;
  onUpdateProfile?: (profile: FarmerProfile) => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  currentLang,
  profile,
  totalCount,
  agriCount,
  personalCount,
  otherCount,
  categoryBreakdown,
  onSelectCategory,
  onUpdateProfile
}) => {
  const t = translations[currentLang];
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <section id="dashboard" className="py-10 bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Farmer Profile Card & Overview */}
        <div className="bg-emerald-950/70 border border-emerald-700/60 rounded-3xl p-6 sm:p-8 mb-8 backdrop-blur-xs relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Info */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-lime-500 text-white flex items-center justify-center font-black text-2xl shadow-lg flex-shrink-0">
                🌾
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase font-extrabold tracking-wider bg-emerald-800/80 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-700">
                    {currentLang === 'te' ? 'రైతు ప్రొఫైల్' : currentLang === 'hi' ? 'किसान प्रोफाइल' : 'Farmer Profile'}
                  </span>
                  <span className="text-xs text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                    <span>ID: {profile.kisanId}</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs sm:text-sm text-emerald-200">
                  <span className="flex items-center gap-1 font-medium">
                    <Building className="w-4 h-4 text-lime-400" />
                    {profile.farmName} ({profile.landAreaAcres} {currentLang === 'te' ? 'ఎకరాలు' : currentLang === 'hi' ? 'एकड़' : 'Acres'})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-4 h-4 text-lime-400" />
                    {profile.location}{profile.state && profile.state !== '-' ? `, ${profile.state}` : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Crop Badges & Fill Details Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-700/50 flex-1">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                    {currentLang === 'te' ? 'ప్రధాన పంటలు (Main Crops)' : currentLang === 'hi' ? 'मुख्य फसलें (Main Crops)' : 'Main Farm Crops'}
                  </span>
                  {profile.mainCrops.length > 0 && (
                    <span className="text-[11px] font-bold text-lime-400 bg-emerald-800/80 px-2 py-0.5 rounded-full">
                      {profile.mainCrops.length} {currentLang === 'te' ? 'పంటలు' : 'crops'}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.mainCrops && profile.mainCrops.length > 0 ? (
                    profile.mainCrops.map((crop, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-emerald-800 text-lime-300 text-xs font-bold rounded-lg border border-emerald-600/50"
                      >
                        {crop}
                      </span>
                    ))
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditOpen(true)}
                      className="text-xs text-lime-300 hover:text-white bg-emerald-800/80 hover:bg-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-600/70 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-lime-400" />
                      <span>{currentLang === 'te' ? '+ పంటలు & భూమి వివరాలు నమోదు చేయండి' : currentLang === 'hi' ? '+ फसलें और भूमि विवरण दर्ज करें' : '+ Add Crops & Land Details'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Prominent Edit Details Button */}
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="px-5 py-3.5 bg-lime-400 hover:bg-lime-300 active:bg-lime-500 text-emerald-950 font-black rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer text-sm whitespace-nowrap self-stretch sm:self-center justify-center"
              >
                <Edit3 className="w-4 h-4" />
                <span>
                  {currentLang === 'te' ? 'వివరాలు పూరించండి' : currentLang === 'hi' ? 'विवरण भरें' : 'Fill / Edit Details'}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Section 11 Dashboard Summary Cards (Total: 12, Agri: 7, Personal: 3, Other: 2) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          
          {/* Total Records Card */}
          <div className="bg-white/10 hover:bg-white/15 transition border border-white/15 rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-emerald-200">
                {t.totalRecords}
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-lime-300 flex items-center justify-center">
                <FolderArchive className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {totalCount}
            </div>
            <div className="text-[11px] text-emerald-300 mt-1 font-medium">
              {totalCount === 0
                ? (currentLang === 'te' ? '0 పత్రాలు (ఖాళీ వాల్ట్)' : currentLang === 'hi' ? '0 रिकॉर्ड (खाली वॉल्ट)' : '0 records stored (Empty vault)')
                : (currentLang === 'te' ? 'అన్నీ సురక్షితంగా ఉన్నాయి' : currentLang === 'hi' ? 'सभी सुरक्षित रूप से संग्रहीत' : 'All safely stored')}
            </div>
          </div>

          {/* Agricultural Records Card */}
          <div className="bg-white/10 hover:bg-white/15 transition border border-white/15 rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-emerald-200">
                {t.agriRecords}
              </span>
              <div className="w-9 h-9 rounded-xl bg-lime-500/20 text-lime-300 flex items-center justify-center">
                <Wheat className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-lime-300 tracking-tight">
              {agriCount}
            </div>
            <div className="text-[11px] text-emerald-300 mt-1 font-medium">
              {agriCount === 0
                ? (currentLang === 'te' ? '0 వ్యవసాయ రికార్డులు' : currentLang === 'hi' ? '0 कृषि रिकॉर्ड' : '0 agricultural records')
                : (currentLang === 'te' ? 'భూమి, విత్తనాలు, ఎరువులు' : currentLang === 'hi' ? 'जमीन, बीज, खाद व बीमा' : 'Land, seed, fertilizer, soil')}
            </div>
          </div>

          {/* Personal Records Card */}
          <div className="bg-white/10 hover:bg-white/15 transition border border-white/15 rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-emerald-200">
                {t.personalRecords}
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-blue-200 tracking-tight">
              {personalCount}
            </div>
            <div className="text-[11px] text-emerald-300 mt-1 font-medium">
              {personalCount === 0
                ? (currentLang === 'te' ? '0 వ్యక్తిగత రికార్డులు' : currentLang === 'hi' ? '0 व्यक्तिगत रिकॉर्ड' : '0 personal records')
                : (currentLang === 'te' ? 'బ్యాంక్ పాస్‌బుక్, గుర్తింపు' : currentLang === 'hi' ? 'बैंक पासबुक व पहचान' : 'Passbook, insurance, ID')}
            </div>
          </div>

          {/* Other Records Card */}
          <div className="bg-white/10 hover:bg-white/15 transition border border-white/15 rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-emerald-200">
                {t.otherRecords}
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-purple-200 tracking-tight">
              {otherCount}
            </div>
            <div className="text-[11px] text-emerald-300 mt-1 font-medium">
              {otherCount === 0
                ? (currentLang === 'te' ? '0 ఇతర రికార్డులు' : currentLang === 'hi' ? '0 अन्य रिकॉर्ड' : '0 other records')
                : (currentLang === 'te' ? 'కేసీసీ రుణం, పథకాలు' : currentLang === 'hi' ? 'केसीसी ऋण व सरकारी योजना' : 'KCC Loan & scheme receipts')}
            </div>
          </div>

        </div>

        {/* Visual Category Distribution Bar & Legend */}
        <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-5 sm:p-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                {currentLang === 'te' ? 'వర్గాల వారీగా పత్రాల పంపిణీ' : currentLang === 'hi' ? 'श्रेणी अनुसार दस्तावेजों का विवरण' : 'Records Distribution by Category'}
              </h3>
              <p className="text-xs text-emerald-300">
                {totalCount === 0
                  ? (currentLang === 'te' ? 'మీరు జోడించిన తర్వాత అన్ని రికార్డులు ఇక్కడ కనిపిస్తాయి' : currentLang === 'hi' ? 'जब आप जोड़ेंगे, तो सभी रिकॉर्ड यहाँ दिखेंगे' : 'Records will automatically categorize here once you add documents')
                  : (currentLang === 'te' ? 'మొత్తం 7 ముఖ్యమైన వర్గాలలో పత్రాలు క్రమబద్ధీకరించబడ్డాయి' : currentLang === 'hi' ? 'कुल 7 मुख्य श्रेणियों में व्यवस्थित रिकॉर्ड' : 'Visual breakdown across all 7 essential farming categories')}
              </p>
            </div>
            <span className="text-xs font-bold text-lime-400 bg-emerald-900 px-3 py-1 rounded-full border border-emerald-700">
              {totalCount === 0
                ? (currentLang === 'te' ? '0 రికార్డులు (0%)' : currentLang === 'hi' ? '0 रिकॉर्ड (0%)' : '0 Records (0%)')
                : `100% ${currentLang === 'te' ? 'క్రమబద్ధీకరించబడింది' : currentLang === 'hi' ? 'व्यवस्थित' : 'Organized'}`}
            </span>
          </div>

          {/* Visual Composite Progress Bar */}
          <div className="h-4 w-full bg-emerald-900/80 rounded-full overflow-hidden flex mb-4 shadow-inner">
            {totalCount > 0 ? (
              categoryBreakdown.map((cat, idx) => {
                const widthPct = (cat.count / totalCount) * 100;
                return (
                  <div
                    key={idx}
                    style={{ width: `${widthPct}%`, backgroundColor: cat.color }}
                    title={`${cat.category}: ${cat.count}`}
                    className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                  />
                );
              })
            ) : (
              <div className="w-full h-full bg-emerald-950/70 flex items-center justify-center text-[10px] text-emerald-400 font-medium">
                {currentLang === 'te' ? 'వాల్ట్ ఖాళీగా ఉంది (0 రికార్డులు)' : currentLang === 'hi' ? 'वॉल्ट खाली है (0 रिकॉर्ड)' : 'Vault is empty (0 records)'}
              </div>
            )}
          </div>

          {/* Category Chips with Click to Filter */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categoryBreakdown.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onSelectCategory && onSelectCategory(cat.category)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-700 text-xs text-emerald-100 font-medium transition cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span>{cat.category}</span>
                <span className="font-extrabold text-white bg-emerald-800/80 px-1.5 py-0.2 rounded-md">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Edit Farmer Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onSave={(updated) => {
          if (onUpdateProfile) {
            onUpdateProfile(updated);
          }
        }}
        currentLang={currentLang}
      />
    </section>
  );
};
