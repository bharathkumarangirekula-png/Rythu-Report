import React, { useState } from 'react';
import { Sprout, Menu, Globe, ShieldCheck, Sun, Moon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  textSize: 'normal' | 'large' | 'xl';
  onTextSizeChange: (size: 'normal' | 'large' | 'xl') => void;
  onToggleSidebar?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeSection,
  onNavigate,
  textSize,
  onTextSizeChange,
  onToggleSidebar,
  darkMode,
  onToggleDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-xs transition-colors duration-200">
      {/* Top Helper Bar for Rural Users */}
      <div className="bg-emerald-800 dark:bg-emerald-950 text-emerald-50 text-xs sm:text-sm px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>
            {currentLang === 'te' 
              ? 'రైతు మిత్ర హెల్ప్‌లైన్: 1551 | సైబర్ భద్రత: 1930' 
              : currentLang === 'hi' 
              ? 'किसान हेल्पलाइन: 1551 | साइबर सुरक्षा: 1930' 
              : 'Kisan Helpline: 1551 | Cyber Helpline: 1930'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
          {/* Text Size Switcher */}
          <span className="text-emerald-200 hidden sm:inline text-xs">
            {currentLang === 'te' ? 'అక్షరాల పరిమాణం:' : currentLang === 'hi' ? 'अक्षर आकार:' : 'Text Size:'}
          </span>
          <div className="inline-flex rounded-md bg-emerald-900/60 p-0.5" role="group">
            <button
              onClick={() => onTextSizeChange('normal')}
              className={`px-2 py-0.5 text-xs rounded font-medium transition cursor-pointer ${
                textSize === 'normal' ? 'bg-emerald-600 text-white' : 'text-emerald-200 hover:text-white'
              }`}
              title="Normal text size"
            >
              A
            </button>
            <button
              onClick={() => onTextSizeChange('large')}
              className={`px-2 py-0.5 text-sm rounded font-medium transition cursor-pointer ${
                textSize === 'large' ? 'bg-emerald-600 text-white' : 'text-emerald-200 hover:text-white'
              }`}
              title="Large text size"
            >
              A+
            </button>
            <button
              onClick={() => onTextSizeChange('xl')}
              className={`px-2 py-0.5 text-base rounded font-semibold transition cursor-pointer ${
                textSize === 'xl' ? 'bg-emerald-600 text-white' : 'text-emerald-200 hover:text-white'
              }`}
              title="Extra large text size"
            >
              A++
            </button>
          </div>

          {/* Dark Mode Button at Top Helper Bar Corner */}
          <button
            onClick={onToggleDarkMode}
            className="px-2.5 py-0.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 bg-emerald-900/80 hover:bg-emerald-950 text-emerald-100 border border-emerald-700/60 cursor-pointer shadow-2xs"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden xs:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-emerald-200" />
                <span className="hidden xs:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md group-hover:bg-emerald-800 transition">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <span className="block font-extrabold text-lg sm:text-xl text-emerald-900 dark:text-emerald-400 leading-tight">
                {t.appName}
              </span>
              <span className="block text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
                {t.tagline}
              </span>
            </div>
          </button>

          {/* Top Pages Indicator on Desktop */}
          <div className="hidden lg:flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-stone-700 dark:text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
              {currentLang === 'te' ? 'అన్ని 8 పేజీలు పైభాగంలో ఉన్నాయి' : currentLang === 'hi' ? 'सभी 8 पृष्ठ ऊपर उपलब्ध हैं' : 'All 8 Pages on Top'}
            </span>
          </div>

          {/* Right Controls: Language Selector & Dark Mode Button at Top Corner */}
          <div className="flex items-center gap-2">
            
            {/* Language Selector (Desktop) */}
            <div className="hidden sm:flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
              <div className="pl-2 pr-1 text-stone-500 dark:text-stone-400">
                <Globe className="w-4 h-4" />
              </div>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-white dark:bg-stone-700 text-emerald-900 dark:text-white shadow-xs border border-stone-200 dark:border-stone-600'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('te')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currentLang === 'te'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:text-emerald-900 dark:hover:text-white'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currentLang === 'hi'
                    ? 'bg-white dark:bg-stone-700 text-emerald-900 dark:text-white shadow-xs border border-stone-200 dark:border-stone-600'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Prominent Dark Mode Toggle Button at Top Corner */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline text-xs font-bold text-amber-300">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                  <span className="hidden md:inline text-xs font-bold text-stone-700">Dark</span>
                </>
              )}
            </button>

            {/* Mobile Language Button */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                onClick={() => onLanguageChange(currentLang === 'te' ? 'en' : 'te')}
                className="px-2.5 py-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-bold border border-emerald-300 dark:border-emerald-700"
              >
                {currentLang === 'te' ? 'English' : 'తెలుగు'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
