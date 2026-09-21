import React, { useRef, useEffect } from 'react';
import { 
  Home, 
  FolderLock, 
  User, 
  Lightbulb, 
  FileCheck2, 
  Camera, 
  ShieldAlert, 
  Info, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  UserCheck
} from 'lucide-react';
import { Language, FarmerProfile } from '../types';

export interface PageDefinition {
  id: string;
  num: string;
  shortLabel: string;
  fullTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  color: string;
}

interface TopPagesNavProps {
  currentLang: Language;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  pageMode: 'separate' | 'all';
  onPageModeChange: (mode: 'separate' | 'all') => void;
  totalCount: number;
  profile: FarmerProfile;
  darkMode?: boolean;
}

export const TopPagesNav: React.FC<TopPagesNavProps> = ({
  currentLang,
  activeSection,
  onNavigate,
  pageMode,
  onPageModeChange,
  totalCount,
  profile,
  darkMode
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 8 Dedicated pages (workshop and quiz removed as requested)
  const pages: PageDefinition[] = [
    {
      id: 'home',
      num: '01',
      shortLabel: currentLang === 'te' ? 'హోమ్' : currentLang === 'hi' ? 'होम' : 'Home',
      fullTitle: currentLang === 'te' ? 'ప్రధాన పోర్టల్' : currentLang === 'hi' ? 'मुख्य पोर्टल' : 'Home Portal',
      icon: Home,
      color: 'hover:text-emerald-700'
    },
    {
      id: 'records',
      num: '02',
      shortLabel: currentLang === 'te' ? 'రికార్డుల వాల్ట్' : currentLang === 'hi' ? 'रिकॉर्ड वॉल्ट' : 'Records Vault',
      fullTitle: currentLang === 'te' ? 'డిజిటల్ రికార్డుల వాల్ట్' : currentLang === 'hi' ? 'डिजिटल रिकॉर्ड वॉल्ट' : 'Records Vault',
      icon: FolderLock,
      badge: `${totalCount}`,
      color: 'hover:text-amber-700'
    },
    {
      id: 'profile',
      num: '03',
      shortLabel: currentLang === 'te' ? 'రైతు ప్రొఫైల్' : currentLang === 'hi' ? 'किसान प्रोफाइल' : 'Farmer & Land',
      fullTitle: currentLang === 'te' ? 'రైతు ప్రొఫైల్ & భూమి' : currentLang === 'hi' ? 'किसान प्रोफाइल व भूमि' : 'Farmer & Land Holdings',
      icon: User,
      badge: 'e-KYC',
      color: 'hover:text-teal-700'
    },
    {
      id: 'why',
      num: '04',
      shortLabel: currentLang === 'te' ? 'ఎందుకు?' : currentLang === 'hi' ? 'क्यों?' : 'Why Digitize?',
      fullTitle: currentLang === 'te' ? 'డిజిటల్ రికార్డులు ఎందుకు?' : currentLang === 'hi' ? 'डिजिटल रिकॉर्ड क्यों?' : 'Why Digitize Records?',
      icon: Lightbulb,
      color: 'hover:text-indigo-700'
    },
    {
      id: 'what',
      num: '05',
      shortLabel: currentLang === 'te' ? 'ఏ పత్రాలు?' : currentLang === 'hi' ? 'योग्य दस्तावेज' : 'Eligible Records',
      fullTitle: currentLang === 'te' ? 'ఏ పత్రాలు దాచుకోవచ్చు?' : currentLang === 'hi' ? 'योग्य दस्तावेज सूची' : 'Eligible Farm Records',
      icon: FileCheck2,
      color: 'hover:text-cyan-700'
    },
    {
      id: 'guide',
      num: '06',
      shortLabel: currentLang === 'te' ? 'స్కానింగ్ గైడ్' : currentLang === 'hi' ? 'स्कैनिंग गाइड' : 'Camera Guide',
      fullTitle: currentLang === 'te' ? '6 దశల్లో స్కానింగ్ గైడ్' : currentLang === 'hi' ? '6 चरणों में स्कैनिंग' : '6-Step Camera Simulator',
      icon: Camera,
      color: 'hover:text-blue-700'
    },
    {
      id: 'safety',
      num: '07',
      shortLabel: currentLang === 'te' ? 'సైబర్ భద్రత' : currentLang === 'hi' ? 'साइबर सुरक्षा' : 'Stay Safe',
      fullTitle: currentLang === 'te' ? 'సైబర్ భద్రత & OTP రక్షణ' : currentLang === 'hi' ? 'साइबर सुरक्षा व OTP' : 'Stay Safe Online',
      icon: ShieldAlert,
      badge: '1930',
      color: 'hover:text-rose-700'
    },
    {
      id: 'about',
      num: '08',
      shortLabel: currentLang === 'te' ? 'ప్రాజెక్ట్ & FAQ' : currentLang === 'hi' ? 'परियोजना व FAQ' : 'About & FAQ',
      fullTitle: currentLang === 'te' ? 'ప్రాజెక్ట్ సమాచారం & FAQ' : currentLang === 'hi' ? 'परियोजना व अक्सर पूछे सवाल' : 'About Project & FAQ',
      icon: Info,
      color: 'hover:text-stone-700'
    }
  ];

  const currentIndex = Math.max(0, pages.findIndex(p => p.id === activeSection));
  const currentPage = pages[currentIndex] || pages[0];
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  // Auto-scroll active item into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSection]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-xs sticky top-14 sm:top-16 z-40 transition-colors duration-200">
      
      {/* Top Strip: Page Title, Farmer Verification, Helplines & Display Mode */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 border-b border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left info: Current Page Tag & Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <Layers className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              {currentLang === 'te' ? `పేజీ ${currentPage.num} / 8:` : currentLang === 'hi' ? `पृष्ठ ${currentPage.num} / 8:` : `Page ${currentPage.num} of 8:`}
            </span>
            <span className="text-xs font-black text-emerald-950 dark:text-emerald-100 truncate max-w-[150px] sm:max-w-xs">
              {currentPage.fullTitle}
            </span>
          </div>

          {/* Verified Farmer Badge */}
          <div className="hidden md:flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate max-w-[130px]">{profile.name}</span>
            <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-black">e-KYC</span>
          </div>
        </div>

        {/* Right Controls: Helplines & Page View Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap ml-auto">
          
          {/* Toll-free Helplines */}
          <div className="hidden xl:flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <PhoneCall className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{currentLang === 'te' ? 'రైతు మిత్ర:' : currentLang === 'hi' ? 'किसान:' : 'Kisan:'} <strong>1551</strong></span>
            </span>
            <span className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 px-2 py-1 rounded-lg border border-rose-200 dark:border-rose-800">
              <ShieldAlert className="w-3 h-3 text-rose-600 dark:text-rose-400" />
              <span>{currentLang === 'te' ? 'సైబర్:' : currentLang === 'hi' ? 'साइबर:' : 'Cyber:'} <strong>1930</strong></span>
            </span>
          </div>

          {/* Quick Prev / Next Navigation Buttons */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => prevPage && onNavigate(prevPage.id)}
              disabled={!prevPage}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                prevPage 
                  ? 'text-stone-700 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-700 hover:text-emerald-800 dark:hover:text-emerald-300 cursor-pointer shadow-2xs' 
                  : 'text-stone-300 dark:text-stone-600 cursor-not-allowed'
              }`}
              title={prevPage ? prevPage.fullTitle : ''}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">{currentLang === 'te' ? 'మునుపటిది' : currentLang === 'hi' ? 'पिछला' : 'Prev'}</span>
            </button>
            <button
              onClick={() => nextPage && onNavigate(nextPage.id)}
              disabled={!nextPage}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                nextPage 
                  ? 'text-stone-700 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-700 hover:text-emerald-800 dark:hover:text-emerald-300 cursor-pointer shadow-2xs' 
                  : 'text-stone-300 dark:text-stone-600 cursor-not-allowed'
              }`}
              title={nextPage ? nextPage.fullTitle : ''}
              aria-label="Next Page"
            >
              <span className="hidden sm:inline text-[11px]">{currentLang === 'te' ? 'తదుపరిది' : currentLang === 'hi' ? 'अगला' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs">
            <button
              onClick={() => onPageModeChange('separate')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                pageMode === 'separate'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {currentLang === 'te' ? 'వేర్వేరు పేజీలు' : currentLang === 'hi' ? 'अलग पेज' : 'Separate Pages'}
            </button>
            <button
              onClick={() => onPageModeChange('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                pageMode === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {currentLang === 'te' ? 'అన్నీ ఒకే పేజీలో' : currentLang === 'hi' ? 'सभी एक में' : 'All-in-One'}
            </button>
          </div>

        </div>
      </div>

      {/* Main Top Horizontal Strip: All 8 Separate Pages on the Top */}
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 flex items-center">
        
        {/* Left Arrow for scrollable area */}
        <button
          onClick={scrollLeft}
          className="hidden sm:flex p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex-shrink-0 mr-1.5 transition cursor-pointer shadow-2xs"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container with all 8 Separate Pages on Top */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full py-1 scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {pages.map((item) => {
            const isActive = activeSection === item.id;
            const IconComp = item.icon;

            return (
              <button
                key={item.id}
                data-active={isActive ? 'true' : 'false'}
                onClick={() => onNavigate(item.id)}
                className={`group flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm ring-2 ring-emerald-600/20'
                    : 'bg-stone-50/90 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                }`}
              >
                {/* Number Badge */}
                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-md transition ${
                  isActive 
                    ? 'bg-emerald-950 text-emerald-200' 
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 group-hover:bg-stone-300 dark:group-hover:bg-stone-600'
                }`}>
                  {item.num}
                </span>

                {/* Page Icon */}
                <IconComp className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-emerald-200' : 'text-stone-500 dark:text-stone-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400'}`} />

                {/* Page Label */}
                <span className="tracking-tight">{item.shortLabel}</span>

                {/* Optional Status Badge */}
                {item.badge && (
                  <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white text-emerald-900' : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow for scrollable area */}
        <button
          onClick={scrollRight}
          className="hidden sm:flex p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex-shrink-0 ml-1.5 transition cursor-pointer shadow-2xs"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
