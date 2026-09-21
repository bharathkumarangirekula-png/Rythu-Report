import React from 'react';
import { Sprout, ShieldAlert, Heart, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-lg text-white">
                {t.appName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="pt-2 text-xs text-stone-500">
              {currentLang === 'te' 
                ? 'ఆంధ్రప్రదేశ్ మరియు భారతదేశంలోని గ్రామీణ రైతుల డిజిటల్ సాధికారత కొరకు రూపొందించబడింది.' 
                : currentLang === 'hi' 
                ? 'ग्रामीण किसानों के डिजिटल सशक्तिकरण हेतु समर्पित पहल।' 
                : 'Dedicated to empowering rural farmers across India with safe digital literacy.'}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {currentLang === 'te' ? 'త్వరిత లింకులు' : currentLang === 'hi' ? 'त्वरित लिंक' : 'Quick Navigation'}
            </h4>
            <div className="flex flex-col space-y-2 text-xs font-medium text-stone-400">
              <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 text-left transition cursor-pointer">
                {t.navHome}
              </button>
              <button onClick={() => onNavigate('learn')} className="hover:text-emerald-400 text-left transition cursor-pointer">
                {t.navLearn}
              </button>
              <button onClick={() => onNavigate('records')} className="hover:text-emerald-400 text-left transition cursor-pointer">
                {t.navRecords}
              </button>
              <button onClick={() => onNavigate('safety')} className="hover:text-emerald-400 text-left transition cursor-pointer">
                {t.navSafety}
              </button>
              <button onClick={() => onNavigate('awareness')} className="hover:text-emerald-400 text-left transition cursor-pointer">
                {t.navAwareness}
              </button>
              <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 text-left transition cursor-pointer">
                {t.navAbout}
              </button>
            </div>
          </div>

          {/* Col 3: Government Safety Helpline Numbers */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {currentLang === 'te' ? 'ముఖ్యమైన హెల్ప్‌లైన్లు' : currentLang === 'hi' ? 'जरूरी हेल्पलाइन' : 'Official Helplines'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700">
                <div className="text-emerald-400 font-bold">Kisan Call Center: 1551</div>
                <div className="text-stone-400 text-[11px]">Free Agricultural Advisory</div>
              </div>
              <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700">
                <div className="text-rose-400 font-bold">Cyber Crime: 1930</div>
                <div className="text-stone-400 text-[11px]">Report Financial Fraud Immediately</div>
              </div>
            </div>
          </div>

        </div>

        {/* Prototype Educational Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Farmer Digital Records Portal • Educational Prototype
          </div>
          <div className="flex items-center gap-1">
            <span>Built with care for rural farming communities</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 inline fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
};
