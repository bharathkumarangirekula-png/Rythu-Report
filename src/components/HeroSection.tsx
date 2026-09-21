import React from 'react';
import { FileText, FolderArchive, Lock, Sparkles, CheckCircle2, ArrowRight, Smartphone, ShieldCheck, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface HeroSectionProps {
  currentLang: Language;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang];

  const handleListen = () => {
    speakText(`${t.heroTitle}. ${t.heroSubtitle}`, currentLang);
  };

  return (
    <section id="home" className="pt-6 pb-12 sm:pt-10 sm:pb-16 bg-gradient-to-b from-emerald-50/70 via-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card */}
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-10 lg:p-12 mb-10 overflow-hidden relative">
          
          {/* Subtle rural background motif */}
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-lime-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Voice Assistance Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-semibold border border-emerald-200">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>{currentLang === 'te' ? 'రైతుల కోసం సులభమైన డిజిటల్ తోడ్పాటు' : currentLang === 'hi' ? 'किसानों के लिए सरल डिजिटल मार्गदर्शिका' : 'Digital Literacy for Rural Farmers'}</span>
                <button
                  onClick={handleListen}
                  className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-0.5 rounded-full text-xs font-bold transition ml-1"
                  title="Listen to this page"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{t.textToSpeech}</span>
                </button>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {t.heroTitle}
              </h1>

              <p className="text-base sm:text-xl text-stone-700 font-normal leading-relaxed max-w-2xl">
                {t.heroSubtitle}
              </p>

              {/* Two Large Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('learn')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-2xl font-bold text-lg shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <span>{t.btnLearnHow}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('records')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-900 rounded-2xl font-bold text-lg border border-stone-300 transition cursor-pointer"
                >
                  <span>{t.btnManageRecords}</span>
                </button>
              </div>

              {/* Quick Highlights */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-600 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{currentLang === 'te' ? 'ఆంధ్రప్రదేశ్ రైతుల కోసం ప్రత్యేక తెలుగు సహకారం' : currentLang === 'hi' ? '100% नि:शुल्क एवं सुरक्षित अभ्यास' : 'Tailored for Andhra Pradesh & rural farmers'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{currentLang === 'te' ? 'ఓటీపీ మరియు పాస్‌వర్డ్ రక్షణ శిక్షణ' : currentLang === 'hi' ? 'ओटीपी और पासवर्ड सुरक्षा जागरूकता' : 'OTP & password safety awareness'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Farmer & Smartphone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-gradient-to-b from-emerald-700 to-emerald-900 p-4 sm:p-5 rounded-3xl shadow-xl text-white border-4 border-emerald-600/50">
                {/* Phone Top Notch */}
                <div className="flex justify-between items-center px-3 py-1 mb-3 text-xs text-emerald-200">
                  <span className="font-mono font-semibold">9:41 AM</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                    <span>Safe Storage</span>
                  </span>
                </div>

                {/* Simulated Screen Inside Phone */}
                <div className="bg-stone-50 rounded-2xl p-4 text-stone-900 space-y-3">
                  
                  {/* Farmer Mini Banner */}
                  <div className="flex items-center gap-3 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-base shadow-xs">
                      🌾
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">Ramesh (రమేష్)</div>
                      <div className="text-xs text-stone-600">Green Valley Farm • 4.5 Acres</div>
                    </div>
                  </div>

                  {/* Visual Document Previews */}
                  <div className="space-y-2 text-left">
                    <div className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                      {currentLang === 'te' ? 'తాజా డిజిటల్ పత్రాలు' : currentLang === 'hi' ? 'हालिया डिजिटल दस्तावेज' : 'Recent Digital Records'}
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                          1B
                        </div>
                        <div>
                          <div className="font-bold text-xs text-stone-800">Pahani / 1B Land Record</div>
                          <div className="text-[10px] text-stone-500">Survey 142/2A • PDF 1.4 MB</div>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                          PMF
                        </div>
                        <div>
                          <div className="font-bold text-xs text-stone-800">Crop Insurance 2026</div>
                          <div className="text-[10px] text-stone-500">Paddy Kharif • Active</div>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                          SHC
                        </div>
                        <div>
                          <div className="font-bold text-xs text-stone-800">Soil Health Test Report</div>
                          <div className="text-[10px] text-stone-500">N-P-K Optimal • 2026</div>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    </div>
                  </div>

                  {/* Phone Bottom Tap Action */}
                  <button 
                    onClick={() => onNavigate('records')}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{currentLang === 'te' ? 'పూర్తి రికార్డులు చూడండి' : currentLang === 'hi' ? 'पूरे रिकॉर्ड देखें' : 'Open Document Locker'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Three Simple Feature Cards (Section 1 requirement) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Card 1: Digitize Records */}
          <div 
            onClick={() => onNavigate('guide')}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-emerald-800 transition">
              {t.featureDigitize}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {t.featureDigitizeDesc}
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
              <span>{currentLang === 'te' ? 'ఎలా చేయాలో చూడండి' : currentLang === 'hi' ? 'तरीका देखें' : 'View Guide'}</span>
              <span>➔</span>
            </div>
          </div>

          {/* Card 2: Organize Documents */}
          <div 
            onClick={() => onNavigate('records')}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-lime-100 text-lime-800 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <FolderArchive className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-emerald-800 transition">
              {t.featureOrganize}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {t.featureOrganizeDesc}
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
              <span>{currentLang === 'te' ? 'ఫోల్డర్లు చూడండి' : currentLang === 'hi' ? 'फोल्डर देखें' : 'Explore Folders'}</span>
              <span>➔</span>
            </div>
          </div>

          {/* Card 3: Store Safely */}
          <div 
            onClick={() => onNavigate('safety')}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-emerald-800 transition">
              {t.featureStore}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {t.featureStoreDesc}
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
              <span>{currentLang === 'te' ? 'భద్రతా నియమాలు' : currentLang === 'hi' ? 'सुरक्षा नियम' : 'Safety Rules'}</span>
              <span>➔</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
