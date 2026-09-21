/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyDigitalRecords } from './components/WhyDigitalRecords';
import { WhatRecordsToDigitize } from './components/WhatRecordsToDigitize';
import { HowToDigitizeGuide } from './components/HowToDigitizeGuide';
import { DashboardStats } from './components/DashboardStats';
import { RecordOrganizer } from './components/RecordOrganizer';
import { DigitalSafetySection } from './components/DigitalSafetySection';
import { AboutSection } from './components/AboutSection';
import { TopPagesNav } from './components/TopPagesNav';
import { Footer } from './components/Footer';

import { FarmerProfile, FarmerRecord, Language, RecordCategory } from './types';
import { initialFarmerProfile, initialRecords, sampleTemplates } from './data/sampleRecords';
import { translations } from './data/translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xl'>('normal');

  // Dark mode state with localStorage and system preference persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Farmer profile & records state (defaults strictly to zero/empty until user provides data)
  const [profile, setProfile] = useState<FarmerProfile>(() => {
    try {
      const saved = localStorage.getItem('farmer_profile_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialFarmerProfile;
  });

  const [records, setRecords] = useState<FarmerRecord[]>(() => {
    try {
      const saved = localStorage.getItem('farmer_records_v3');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return initialRecords; // Starts at [] (zero records)
  });

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Sync to local storage whenever records or profile change
  useEffect(() => {
    try {
      localStorage.setItem('farmer_records_v3', JSON.stringify(records));
    } catch {}
  }, [records]);

  useEffect(() => {
    try {
      localStorage.setItem('farmer_profile_v3', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  // Try fetching records from backend if available
  useEffect(() => {
    fetch('/api/records')
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const saved = localStorage.getItem('farmer_records_v3');
          if (!saved) {
            setRecords(data);
          }
        }
      })
      .catch(() => {
        // Safe fallback to initial sample data
      });
  }, []);

  // Compute live counts
  const totalCount = records.length;
  const agriCount = useMemo(() => records.filter(r => r.classification === 'Agricultural').length, [records]);
  const personalCount = useMemo(() => records.filter(r => r.classification === 'Personal').length, [records]);
  const otherCount = useMemo(() => records.filter(r => r.classification === 'Other').length, [records]);

  // Compute category breakdown
  const categoryBreakdown = useMemo(() => {
    const counts: Record<RecordCategory, number> = {
      'Land': 0,
      'Crops': 0,
      'Finance': 0,
      'Insurance': 0,
      'Government Schemes': 0,
      'Personal': 0,
      'Other': 0
    };

    records.forEach(r => {
      if (counts[r.category] !== undefined) {
        counts[r.category]++;
      } else {
        counts['Other']++;
      }
    });

    const categoryColors: Record<RecordCategory, string> = {
      'Land': '#16a34a',
      'Crops': '#059669',
      'Finance': '#2563eb',
      'Insurance': '#d97706',
      'Government Schemes': '#9333ea',
      'Personal': '#0891b2',
      'Other': '#475569'
    };

    return (Object.keys(counts) as RecordCategory[]).map(cat => ({
      category: cat,
      count: counts[cat],
      color: categoryColors[cat]
    }));
  }, [records]);

  // Add Record Handler
  const handleAddRecord = (newRecData: Omit<FarmerRecord, 'id'>) => {
    const newRecord: FarmerRecord = {
      ...newRecData,
      id: `rec-${Date.now()}`
    };

    // Optimistically update frontend state
    setRecords(prev => [newRecord, ...prev]);

    // Send to backend API
    fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    }).catch(err => console.log('Backend sync offline, stored locally in prototype:', err));
  };

  // Delete Record Handler
  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    fetch(`/api/records/${id}`, { method: 'DELETE' })
      .catch(err => console.log('Backend sync offline:', err));
  };

  // Reset all records to zero
  const handleResetToZero = () => {
    setRecords([]);
    try {
      localStorage.setItem('farmer_records_v3', JSON.stringify([]));
    } catch {}
    fetch('/api/records/reset', { method: 'POST' }).catch(() => {});
  };

  // Load sample demonstration records (Rice, Seeds, Soil, Land, etc.)
  const handleLoadSampleRecords = () => {
    setRecords(sampleTemplates);
    try {
      localStorage.setItem('farmer_records_v3', JSON.stringify(sampleTemplates));
    } catch {}
  };

  const [pageMode, setPageMode] = useState<'separate' | 'all'>('separate');

  // Smooth scroll / navigate between separate pages
  const handleNavigate = (sectionId: string) => {
    let target = sectionId;
    if (sectionId === 'learn') target = 'guide';
    if (sectionId === 'awareness' || sectionId === 'workshop') target = 'safety';
    if (sectionId === 'quiz') target = 'safety';
    setActiveSection(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Text size classes applied to container
  const textSizeClass = 
    textSize === 'xl' ? 'text-lg leading-relaxed' : 
    textSize === 'large' ? 'text-base leading-relaxed' : '';

  // List of all 8 distinct pages (workshop and quiz removed as requested)
  const allPages = [
    { id: 'home', num: '01', title: currentLang === 'te' ? 'ప్రధాన పోర్టల్' : currentLang === 'hi' ? 'मुख्य पोर्टल' : 'Home Portal', icon: '🏠' },
    { id: 'records', num: '02', title: currentLang === 'te' ? 'డిజిటల్ రికార్డుల వాల్ట్' : currentLang === 'hi' ? 'डिजिटल रिकॉर्ड वॉल्ट' : 'Records Vault', icon: '🌾' },
    { id: 'profile', num: '03', title: currentLang === 'te' ? 'రైతు ప్రొఫైల్ & భూమి' : currentLang === 'hi' ? 'किसान प्रोफाइल व भूमि' : 'Farmer Profile & Holdings', icon: '👤' },
    { id: 'why', num: '04', title: currentLang === 'te' ? 'డిజిటల్ రికార్డులు ఎందుకు?' : currentLang === 'hi' ? 'डिजिटल रिकॉर्ड क्यों?' : 'Why Digitize Records?', icon: '💡' },
    { id: 'what', num: '05', title: currentLang === 'te' ? 'ఏ పత్రాలు దాచుకోవచ్చు?' : currentLang === 'hi' ? 'योग्य दस्तावेज सूची' : 'Eligible Farm Records', icon: '📋' },
    { id: 'guide', num: '06', title: currentLang === 'te' ? '6 దశల్లో స్కానింగ్ గైడ్' : currentLang === 'hi' ? '6 चरणों में स्कैनिंग' : '6-Step Camera Simulator', icon: '📸' },
    { id: 'safety', num: '07', title: currentLang === 'te' ? 'సైబర్ భద్రత & OTP రక్షణ' : currentLang === 'hi' ? 'సైబర్ భద్రత & OTP' : 'Stay Safe Online', icon: '🛡️' },
    { id: 'about', num: '08', title: currentLang === 'te' ? 'ప్రాజెక్ట్ సమాచారం & FAQ' : currentLang === 'hi' ? 'परियोजना व अक्सर पूछे सवाल' : 'About Project & FAQ', icon: 'ℹ️' }
  ];

  // Helper to find current page index and adjacent pages
  const currentPageIndex = Math.max(0, allPages.findIndex(p => p.id === activeSection));
  const currentPage = allPages[currentPageIndex] || allPages[0];
  const prevPage = currentPageIndex > 0 ? allPages[currentPageIndex - 1] : null;
  const nextPage = currentPageIndex < allPages.length - 1 ? allPages[currentPageIndex + 1] : null;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-stone-950 text-stone-100 dark' : 'bg-stone-50 text-stone-900'} flex flex-col ${textSizeClass} transition-colors duration-200`}>
      
      {/* Navigation Bar with Dark Mode Button in Top Corner */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        textSize={textSize}
        onTextSizeChange={setTextSize}
        onToggleSidebar={() => {
          const el = document.getElementById('top-pages-strip');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Top Pages Navigation Bar: All 8 Pages Separately on Top */}
      <div id="top-pages-strip">
        <TopPagesNav
          currentLang={currentLang}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          pageMode={pageMode}
          onPageModeChange={setPageMode}
          totalCount={totalCount}
          profile={profile}
          darkMode={darkMode}
        />
      </div>

      {/* Main Container - Full Width Workspace */}
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 flex-1">
        <main className="w-full">

        {/* Top Breadcrumb & Page Pager Header for Separate Mode */}
        {pageMode === 'separate' && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-3 sm:p-4 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xl flex-shrink-0 shadow-xs border border-emerald-200 dark:border-emerald-800">
                {currentPage.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    {currentLang === 'te' ? `పేజీ ${currentPage.num} / 8` : currentLang === 'hi' ? `पृष्ठ ${currentPage.num} / 8` : `Page ${currentPage.num} of 8`}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold hidden xs:inline">
                    {currentLang === 'te' ? 'ప్రత్యేక పేజీ వీక్షణ' : currentLang === 'hi' ? 'अलग पृष्ठ' : 'Separate Page View'}
                  </span>
                </div>
                <h1 className="text-base sm:text-xl font-extrabold text-stone-900 dark:text-white mt-0.5">
                  {currentPage.title}
                </h1>
              </div>
            </div>

            {/* Quick Next / Prev Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {prevPage && (
                <button
                  onClick={() => handleNavigate(prevPage.id)}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 transition flex items-center gap-1 cursor-pointer"
                >
                  <span>←</span>
                  <span className="hidden md:inline">{prevPage.title}</span>
                  <span className="md:hidden">{currentLang === 'te' ? 'వెనుకకు' : currentLang === 'hi' ? 'पीछे' : 'Prev'}</span>
                </button>
              )}
              {nextPage && (
                <button
                  onClick={() => handleNavigate(nextPage.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <span className="hidden md:inline">{nextPage.title}</span>
                  <span className="md:hidden">{currentLang === 'te' ? 'తదుపరి' : currentLang === 'hi' ? 'आगे' : 'Next'}</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>
        )}
        
        {pageMode === 'separate' ? (
          <>
            {/* PAGE 1: HOME PORTAL */}
            {activeSection === 'home' && (
              <div className="animate-in fade-in duration-300">
                <HeroSection
                  currentLang={currentLang}
                  onNavigate={handleNavigate}
                />
              </div>
            )}

            {/* PAGE 2: RECORDS VAULT */}
            {activeSection === 'records' && (
              <div className="animate-in fade-in duration-300">
                <RecordOrganizer
                  currentLang={currentLang}
                  records={records}
                  profile={profile}
                  onAddRecord={handleAddRecord}
                  onDeleteRecord={handleDeleteRecord}
                  selectedCategoryFilter={selectedCategoryFilter}
                  onClearCategoryFilter={() => setSelectedCategoryFilter('All')}
                  onResetToZero={handleResetToZero}
                  onLoadSampleRecords={handleLoadSampleRecords}
                />
              </div>
            )}

            {/* PAGE 3: FARMER PROFILE & HOLDINGS */}
            {activeSection === 'profile' && (
              <div className="animate-in fade-in duration-300">
                <DashboardStats
                  currentLang={currentLang}
                  profile={profile}
                  totalCount={totalCount}
                  agriCount={agriCount}
                  personalCount={personalCount}
                  otherCount={otherCount}
                  categoryBreakdown={categoryBreakdown}
                  onSelectCategory={(cat) => {
                    setSelectedCategoryFilter(cat);
                    handleNavigate('records');
                  }}
                  onUpdateProfile={(updated) => setProfile(updated)}
                />
              </div>
            )}

            {/* PAGE 4: WHY DIGITIZE RECORDS */}
            {activeSection === 'why' && (
              <div className="animate-in fade-in duration-300">
                <WhyDigitalRecords
                  currentLang={currentLang}
                />
              </div>
            )}

            {/* PAGE 5: ELIGIBLE RECORDS LIST */}
            {activeSection === 'what' && (
              <div className="animate-in fade-in duration-300">
                <WhatRecordsToDigitize
                  currentLang={currentLang}
                />
              </div>
            )}

            {/* PAGE 6: SCANNING & CAMERA GUIDE */}
            {activeSection === 'guide' && (
              <div className="animate-in fade-in duration-300">
                <HowToDigitizeGuide
                  currentLang={currentLang}
                />
              </div>
            )}

            {/* PAGE 7: CYBER & DIGITAL SAFETY */}
            {activeSection === 'safety' && (
              <div className="animate-in fade-in duration-300">
                <DigitalSafetySection
                  currentLang={currentLang}
                />
              </div>
            )}

            {/* PAGE 8: ABOUT PROJECT & FAQ */}
            {activeSection === 'about' && (
              <div className="animate-in fade-in duration-300">
                <AboutSection
                  currentLang={currentLang}
                />
              </div>
            )}
          </>
        ) : (
          /* CONTINUOUS ALL-IN-ONE VIEW */
          <>
            <div id="home">
              <HeroSection
                currentLang={currentLang}
                onNavigate={handleNavigate}
              />
            </div>
            <div id="records">
              <RecordOrganizer
                currentLang={currentLang}
                records={records}
                profile={profile}
                onAddRecord={handleAddRecord}
                onDeleteRecord={handleDeleteRecord}
                selectedCategoryFilter={selectedCategoryFilter}
                onClearCategoryFilter={() => setSelectedCategoryFilter('All')}
                onResetToZero={handleResetToZero}
                onLoadSampleRecords={handleLoadSampleRecords}
              />
            </div>
            <div id="profile">
              <DashboardStats
                currentLang={currentLang}
                profile={profile}
                totalCount={totalCount}
                agriCount={agriCount}
                personalCount={personalCount}
                otherCount={otherCount}
                categoryBreakdown={categoryBreakdown}
                onSelectCategory={(cat) => {
                  setSelectedCategoryFilter(cat);
                  handleNavigate('records');
                }}
                onUpdateProfile={(updated) => setProfile(updated)}
              />
            </div>
            <div id="why">
              <WhyDigitalRecords
                currentLang={currentLang}
              />
            </div>
            <div id="what">
              <WhatRecordsToDigitize
                currentLang={currentLang}
              />
            </div>
            <div id="guide">
              <HowToDigitizeGuide
                currentLang={currentLang}
              />
            </div>
            <div id="safety">
              <DigitalSafetySection
                currentLang={currentLang}
              />
            </div>
            <div id="about">
              <AboutSection
                currentLang={currentLang}
              />
            </div>
          </>
        )}

        {/* Bottom Pagination Switcher on Separate Pages */}
        {pageMode === 'separate' && (
          <div className="mt-10 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevPage ? (
              <button
                onClick={() => handleNavigate(prevPage.id)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-200 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>←</span>
                <span>{currentLang === 'te' ? 'మునుపటి పేజీ:' : currentLang === 'hi' ? 'पिछला पृष्ठ:' : 'Previous:'} {prevPage.title}</span>
              </button>
            ) : <div />}

            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
              {currentLang === 'te' ? `పేజీ ${currentPage.num} / 8` : currentLang === 'hi' ? `पृष्ठ ${currentPage.num} / 8` : `Page ${currentPage.num} of 8`}
            </span>

            {nextPage ? (
              <button
                onClick={() => handleNavigate(nextPage.id)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{currentLang === 'te' ? 'తదుపరి పేజీ:' : currentLang === 'hi' ? 'अगला पृष्ठ:' : 'Next:'} {nextPage.title}</span>
                <span>→</span>
              </button>
            ) : <div />}
          </div>
        )}

        </main>
      </div>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
