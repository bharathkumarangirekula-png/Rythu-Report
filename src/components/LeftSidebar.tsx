import React from 'react';
import { 
  Home, 
  FolderLock, 
  User, 
  Lightbulb, 
  FileCheck2, 
  Camera, 
  ShieldAlert, 
  Users, 
  Award, 
  Info, 
  PhoneCall, 
  ChevronRight,
  Layers,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { Language, FarmerProfile } from '../types';

export interface PageItem {
  id: string;
  num: string;
  category: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge?: string;
}

interface LeftSidebarProps {
  currentLang: Language;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  pageMode: 'separate' | 'all';
  onPageModeChange: (mode: 'separate' | 'all') => void;
  totalCount: number;
  profile: FarmerProfile;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentLang,
  activeSection,
  onNavigate,
  pageMode,
  onPageModeChange,
  totalCount,
  profile,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const pages: PageItem[] = [
    {
      id: 'home',
      num: '01',
      category: currentLang === 'te' ? 'హోమ్' : currentLang === 'hi' ? 'होम' : 'Start',
      label: currentLang === 'te' ? 'ప్రధాన పోర్టల్' : currentLang === 'hi' ? 'मुख्य पोर्टल' : 'Home Portal',
      sublabel: currentLang === 'te' ? 'పోర్టల్ పరిచయం & ముఖ్య లింకులు' : currentLang === 'hi' ? 'पोर्टल परिचय व मुख्य लिंक' : 'Portal Overview & Quick Hub',
      icon: Home,
      color: 'text-emerald-700 bg-emerald-100'
    },
    {
      id: 'records',
      num: '02',
      category: currentLang === 'te' ? 'పత్రాలు' : currentLang === 'hi' ? 'दस्तावेज' : 'Vault',
      label: currentLang === 'te' ? 'డిజిటల్ రికార్డుల వాల్ట్' : currentLang === 'hi' ? 'डिजिटल रिकॉर्ड वॉल्ट' : 'Records Vault',
      sublabel: currentLang === 'te' ? 'అప్లోడ్, శోధన, ధృవీకరణ PDF' : currentLang === 'hi' ? 'अपलोड, खोज, प्रमाणित PDF' : 'Upload, Search & Print PDF',
      icon: FolderLock,
      badge: `${totalCount} ${currentLang === 'te' ? 'పత్రాలు' : currentLang === 'hi' ? 'దస్తా' : 'docs'}`,
      color: 'text-amber-700 bg-amber-100'
    },
    {
      id: 'profile',
      num: '03',
      category: currentLang === 'te' ? 'రైతు' : currentLang === 'hi' ? 'किसान' : 'Farmer',
      label: currentLang === 'te' ? 'రైతు ప్రొఫైల్ & భూమి' : currentLang === 'hi' ? 'किसान प्रोफाइल व भूमि' : 'Farmer & Land Profile',
      sublabel: currentLang === 'te' ? 'కిసాన్ ID, భూమి విస్తీర్ణం & e-KYC' : currentLang === 'hi' ? 'किसान ID, रकबा व e-KYC' : 'Kisan ID, Land Area & e-KYC',
      icon: User,
      badge: 'e-KYC ✓',
      color: 'text-teal-700 bg-teal-100'
    },
    {
      id: 'why',
      num: '04',
      category: currentLang === 'te' ? 'గైడ్' : currentLang === 'hi' ? 'मार्गदर्शन' : 'Guide',
      label: currentLang === 'te' ? 'డిజిటల్ రికార్డులు ఎందుకు?' : currentLang === 'hi' ? 'डिजिटल रिकॉर्ड क्यों?' : 'Why Digitize Records?',
      sublabel: currentLang === 'te' ? 'కాగితపు నష్టాలు vs డిజిటల్ లాభాలు' : currentLang === 'hi' ? 'कागजी नुकसान बनाम डिजिटल लाभ' : 'Paper Risks vs Cloud Benefits',
      icon: Lightbulb,
      color: 'text-indigo-700 bg-indigo-100'
    },
    {
      id: 'what',
      num: '05',
      category: currentLang === 'te' ? 'గైడ్' : currentLang === 'hi' ? 'मार्गदर्शन' : 'Guide',
      label: currentLang === 'te' ? 'ఏ పత్రాలు దాచుకోవచ్చు?' : currentLang === 'hi' ? 'योग्य दस्तावेज सूची' : 'Eligible Farm Records',
      sublabel: currentLang === 'te' ? 'పాస్‌బుక్, e-Crop, బీమా & లోన్' : currentLang === 'hi' ? 'पासबुक, ई-क्रॉप, बीमा व ऋण' : 'Passbook, e-Crop, Insurance, Loans',
      icon: FileCheck2,
      color: 'text-cyan-700 bg-cyan-100'
    },
    {
      id: 'guide',
      num: '06',
      category: currentLang === 'te' ? 'ప్రాక్టీస్' : currentLang === 'hi' ? 'अभ्यास' : 'Practice',
      label: currentLang === 'te' ? '6 దశల్లో స్కానింగ్ గైడ్' : currentLang === 'hi' ? '6 चरणों में स्कैनिंग' : '6-Step Camera Simulator',
      sublabel: currentLang === 'te' ? 'కెమెరా కోణం, వెలుతురు & ప్రాక్టీస్' : currentLang === 'hi' ? 'कैमरा एंगल व स्कैनिंग अभ्यास' : 'Camera Angle, Lighting & Simulator',
      icon: Camera,
      color: 'text-blue-700 bg-blue-100'
    },
    {
      id: 'safety',
      num: '07',
      category: currentLang === 'te' ? 'భద్రత' : currentLang === 'hi' ? 'सुरक्षा' : 'Security',
      label: currentLang === 'te' ? 'సైబర్ భద్రత & OTP రక్షణ' : currentLang === 'hi' ? 'साइबर सुरक्षा व OTP' : 'Stay Safe Online',
      sublabel: currentLang === 'te' ? 'మోసపూరిత కాల్స్ & 4 గోల్డెన్ రూల్స్' : currentLang === 'hi' ? 'फ्रॉड कॉल से बचाव व 4 नियम' : 'Anti-Scam Rules & Banking Safety',
      icon: ShieldAlert,
      badge: '1930 Helpline',
      color: 'text-rose-700 bg-rose-100'
    },
    {
      id: 'about',
      num: '08',
      category: currentLang === 'te' ? 'సహాయం' : currentLang === 'hi' ? 'सहायता' : 'Support',
      label: currentLang === 'te' ? 'ప్రాజెక్ట్ సమాచారం & FAQ' : currentLang === 'hi' ? 'परियोजना व अक्सर पूछे सवाल' : 'About Project & FAQ',
      sublabel: currentLang === 'te' ? 'గ్రామీణ డిజిటల్ మిషన్ & ప్రశ్నలు' : currentLang === 'hi' ? 'मिशन व किसान सहायता' : 'Mission, FAQs & Rural Support',
      icon: Info,
      color: 'text-stone-700 bg-stone-100'
    }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full space-y-4">
      
      {/* Sidebar Top Title Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 rounded-2xl shadow-sm border border-emerald-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-emerald-700/80 rounded-xl text-emerald-200 shadow-inner">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block">
                {currentLang === 'te' ? 'పేజీల జాబితా (ఎడమ వైపు)' : currentLang === 'hi' ? 'बाईं ओर सभी पृष्ठ' : 'Left Side Pages Rail'}
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-white">
                {currentLang === 'te' ? 'అన్ని పేజీలు వేర్వేరుగా' : currentLang === 'hi' ? 'सभी 8 पृष्ठ अलग-अलग' : 'All 8 Pages Listed'}
              </h2>
            </div>
          </div>
          <span className="text-xs bg-emerald-950/80 text-emerald-300 px-2.5 py-1 rounded-full font-extrabold border border-emerald-600/50">
            8 {currentLang === 'te' ? 'పేజీలు' : currentLang === 'hi' ? 'पेज' : 'Pages'}
          </span>
        </div>
      </div>

      {/* Page Display Mode Switcher */}
      <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {currentLang === 'te' ? 'పేజీ ప్రదర్శన విధానం:' : currentLang === 'hi' ? 'पेज व्यू मोड:' : 'Page View Mode:'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => onPageModeChange('separate')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition text-center cursor-pointer ${
              pageMode === 'separate'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {currentLang === 'te' ? 'వేర్వేరు పేజీలు' : currentLang === 'hi' ? 'अलग-अलग पेज' : 'Separate Pages'}
          </button>
          <button
            onClick={() => onPageModeChange('all')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition text-center cursor-pointer ${
              pageMode === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {currentLang === 'te' ? 'ఒకే పేజీలో అన్నీ' : currentLang === 'hi' ? 'सभी एक पेज में' : 'Continuous Scroll'}
          </button>
        </div>
      </div>

      {/* Vertical List of Straight Headlines - ALL 10 PAGES SEPARATELY */}
      <nav className="space-y-1.5 flex-1" aria-label="Portal Navigation Pages">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 px-2 py-1 flex items-center justify-between">
          <span>{currentLang === 'te' ? 'విభాగాల పేజీలు' : currentLang === 'hi' ? 'सभी अलग पृष्ठ' : 'Separate Pages'}</span>
          <span className="text-[10px] text-stone-400 font-bold">1 to 10</span>
        </div>

        {pages.map((item) => {
          const isActive = activeSection === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full p-2.5 rounded-2xl transition-all duration-200 flex items-center gap-3 text-left group cursor-pointer focus:outline-none ${
                isActive 
                  ? 'bg-white border-2 border-emerald-600 shadow-md ring-2 ring-emerald-600/10' 
                  : 'bg-white/80 hover:bg-white border border-stone-200/80 hover:border-stone-300'
              }`}
            >
              {/* Page Number & Icon Container */}
              <div className="relative flex-shrink-0">
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                    isActive ? 'bg-emerald-700 text-white shadow-xs' : item.color
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                {/* Number Badge */}
                <span className={`absolute -top-1.5 -left-1.5 text-[9px] font-black px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-stone-900 text-white ring-1 ring-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {item.num}
                </span>
              </div>

              {/* Title & Sublabel */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-xs sm:text-sm font-extrabold truncate ${
                    isActive ? 'text-emerald-950 font-black' : 'text-stone-800 group-hover:text-emerald-800'
                  }`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 leading-snug">
                  {item.sublabel}
                </p>
              </div>

              {/* Indicator Arrow */}
              <div className="flex-shrink-0">
                <ChevronRight 
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-emerald-700 translate-x-0.5' : 'text-stone-400 group-hover:text-stone-600'
                  }`} 
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Verified Farmer Profile Status Box */}
      <div className="bg-stone-900 text-white p-3.5 rounded-2xl border border-stone-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                {currentLang === 'te' ? 'నమోదైన రైతు' : currentLang === 'hi' ? 'सत्यापित किसान' : 'Verified Farmer'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-xs font-bold text-white truncate mt-0.5">
              {profile.name}
            </p>
            <p className="text-[11px] text-stone-400 truncate">
              ID: {profile.kisanId}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Helplines Quick Access */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3.5 rounded-2xl border border-emerald-200">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs mb-2">
          <PhoneCall className="w-4 h-4 text-emerald-700" />
          <span>{currentLang === 'te' ? 'రైతు సహాయవాణి' : currentLang === 'hi' ? 'किसान हेल्पलाइन' : 'Farmer Support Toll-Free'}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-white p-2 rounded-xl border border-emerald-100 shadow-2xs">
            <span className="block text-[10px] text-stone-500 font-medium">
              {currentLang === 'te' ? 'రైతు మిత్ర' : currentLang === 'hi' ? 'कृषि केंद्र' : 'Kisan Center'}
            </span>
            <span className="font-extrabold text-sm text-emerald-700">1551</span>
          </div>
          <div className="bg-white p-2 rounded-xl border border-emerald-100 shadow-2xs">
            <span className="block text-[10px] text-stone-500 font-medium">
              {currentLang === 'te' ? 'సైబర్ భద్రత' : currentLang === 'hi' ? 'साइबर हेल्पलाइन' : 'Cyber Crime'}
            </span>
            <span className="font-extrabold text-sm text-rose-600">1930</span>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop / Large Screen Straight Left Sidebar */}
      <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
        <div className="sticky top-20">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Slideout when isOpenMobile is true */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Left Panel */}
          <div className="relative w-4/5 max-w-sm bg-stone-50 h-full p-4 overflow-y-auto shadow-2xl z-10 flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-200">
              <span className="text-sm font-extrabold text-stone-900">
                {currentLang === 'te' ? 'అన్ని పేజీలు (ఎడమ వైపు)' : currentLang === 'hi' ? 'सभी पृष्ठ सूची' : 'All Pages Navigation'}
              </span>
              <button 
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg bg-stone-200 text-stone-700 font-bold hover:bg-stone-300"
              >
                ✕
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
