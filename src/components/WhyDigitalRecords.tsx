import React from 'react';
import { ShieldAlert, Search, FileX2, Layers, Smartphone, LockKeyhole, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface WhyDigitalRecordsProps {
  currentLang: Language;
}

export const WhyDigitalRecords: React.FC<WhyDigitalRecordsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const benefits = [
    {
      icon: <ShieldAlert className="w-8 h-8 text-amber-600" />,
      bg: "bg-amber-50 border-amber-200",
      title: t.benefit1Title,
      desc: t.benefit1Desc,
    },
    {
      icon: <Search className="w-8 h-8 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-200",
      title: t.benefit2Title,
      desc: t.benefit2Desc,
    },
    {
      icon: <FileX2 className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-50 border-blue-200",
      title: t.benefit3Title,
      desc: t.benefit3Desc,
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-600" />,
      bg: "bg-purple-50 border-purple-200",
      title: t.benefit4Title,
      desc: t.benefit4Desc,
    },
    {
      icon: <Smartphone className="w-8 h-8 text-teal-600" />,
      bg: "bg-teal-50 border-teal-200",
      title: t.benefit5Title,
      desc: t.benefit5Desc,
    },
    {
      icon: <LockKeyhole className="w-8 h-8 text-rose-600" />,
      bg: "bg-rose-50 border-rose-200",
      title: t.benefit6Title,
      desc: t.benefit6Desc,
    },
  ];

  const handleSpeak = (title: string, desc: string) => {
    speakText(`${title}. ${desc}`, currentLang);
  };

  return (
    <section id="why" className="py-12 sm:py-16 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <span>{currentLang === 'te' ? 'రైతుకు ప్రయోజనాలు' : currentLang === 'hi' ? 'किसानों के लिए लाभ' : 'Key Advantages'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            {t.whyTitle}
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            {t.whySubtitle}
          </p>
        </div>

        {/* Benefits Grid (6 clean cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:shadow-md hover:bg-white transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${benefit.bg}`}>
                    {benefit.icon}
                  </div>
                  <button
                    onClick={() => handleSpeak(benefit.title, benefit.desc)}
                    className="p-2 text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                    title={t.textToSpeech}
                    aria-label={t.textToSpeech}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-600 font-medium">
                <span>{currentLang === 'te' ? `ప్రయోజనం #${idx + 1}` : currentLang === 'hi' ? `लाभ #${idx + 1}` : `Advantage #${idx + 1}`}</span>
                <span className="text-emerald-600 font-bold">✓ {currentLang === 'te' ? 'రైతుకు సురక్షితం' : currentLang === 'hi' ? 'सुरक्षित' : 'Farmer Safe'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
