import React, { useState } from 'react';
import { 
  Landmark, Wheat, Sprout, FlaskConical, Bug, Droplets, 
  FileSpreadsheet, ShieldCheck, CreditCard, Building2, 
  IdCard, Wallet, HeartPulse, GraduationCap, FileCheck, AlertTriangle, Volume2 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface WhatRecordsProps {
  currentLang: Language;
}

export const WhatRecordsToDigitize: React.FC<WhatRecordsProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'agri' | 'personal'>('agri');
  const t = translations[currentLang];

  const agriRecords = [
    {
      title: currentLang === 'te' ? 'భూమి పత్రాలు (పట్టాదారు పాస్‌బుక్ / 1B)' : currentLang === 'hi' ? 'जमीन के दस्तावेज (खसरा, खतौनी)' : 'Land Records (Pahani / 1B)',
      example: currentLang === 'te' ? 'సర్వే నంబర్లు, విస్తీర్ణం వివరాలు' : currentLang === 'hi' ? 'खसरा, खतौनी, जमाबंदी प्रति' : 'Pahani, 1B Adangal, RoR title deeds',
      icon: <Landmark className="w-6 h-6 text-emerald-700" />,
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      title: currentLang === 'te' ? 'పంటల రికార్డులు (సాగు వివరాలు)' : currentLang === 'hi' ? 'फसल रिकॉर्ड (बुवाई विवरण)' : 'Crop Records (Sowing Logs)',
      example: currentLang === 'te' ? 'విత్తిన తేదీ, పంట రకం, దిగుబడి' : currentLang === 'hi' ? 'बुवाई की तारीख, किस्म और उपज' : 'Sowing dates, crop variety, acreage',
      icon: <Wheat className="w-6 h-6 text-amber-700" />,
      color: "bg-amber-50 border-amber-200"
    },
    {
      title: currentLang === 'te' ? 'విత్తన కొనుగోలు బిల్లులు' : currentLang === 'hi' ? 'बीज खरीद बिल एवं प्रमाण' : 'Seed Information & Bills',
      example: currentLang === 'te' ? 'మొలక శాతం రసీదు, లాట్ నంబర్' : currentLang === 'hi' ? 'बीज बिल, अंकुरण प्रतिशत रसीद' : 'Seed dealer tax invoices, certification',
      icon: <Sprout className="w-6 h-6 text-lime-700" />,
      color: "bg-lime-50 border-lime-200"
    },
    {
      title: currentLang === 'te' ? 'ఎరువుల కొనుగోలు రసీదులు' : currentLang === 'hi' ? 'खाद खरीद रसीदें (यूरिया/डीएपी)' : 'Fertilizer Records & e-POS',
      example: currentLang === 'te' ? 'యూరియా, డీఏపీ రసీదులు' : currentLang === 'hi' ? 'पीएसीएस और डीलर रसीद' : 'PACS e-POS receipts, DAP & Urea bills',
      icon: <FlaskConical className="w-6 h-6 text-cyan-700" />,
      color: "bg-cyan-50 border-cyan-200"
    },
    {
      title: currentLang === 'te' ? 'పురుగుమందుల వాడకం వివరాలు' : currentLang === 'hi' ? 'कीटनाशक छिड़काव रिकॉर्ड' : 'Pesticide Application Logs',
      example: currentLang === 'te' ? 'పిచికారీ తేదీలు, మందు పేర్లు' : currentLang === 'hi' ? 'छिड़काव की तारीख एवं सुरक्षा निर्देश' : 'Spraying log, dosages, safety intervals',
      icon: <Bug className="w-6 h-6 text-rose-700" />,
      color: "bg-rose-50 border-rose-200"
    },
    {
      title: currentLang === 'te' ? 'నీటిపారుదల రికార్డులు' : currentLang === 'hi' ? 'सिंचाई रिकॉर्ड (बोरवेल/नहर)' : 'Irrigation Records',
      example: currentLang === 'te' ? 'బోరుబావి, బిందు సేద్యం అనుమతులు' : currentLang === 'hi' ? 'ड्रिप सिंचाई, बोरवेल बिल व रसीद' : 'Micro-irrigation subsidy, electricity bills',
      icon: <Droplets className="w-6 h-6 text-blue-700" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: currentLang === 'te' ? 'భూసార పరీక్ష నివేదికలు' : currentLang === 'hi' ? 'मृदा स्वास्थ्य कार्ड (सॉइल टेस्ट)' : 'Soil Test Reports (SHC)',
      example: currentLang === 'te' ? 'ఎన్-పి-కె పోషకాల నివేదిక' : currentLang === 'hi' ? 'नाइट्रोजन, फास्फोरस व जिंक स्थिति' : 'Soil Health Card N-P-K nutrient status',
      icon: <FileSpreadsheet className="w-6 h-6 text-teal-700" />,
      color: "bg-teal-50 border-teal-200"
    },
    {
      title: currentLang === 'te' ? 'పంట బీమా పత్రాలు (PMFBY)' : currentLang === 'hi' ? 'फसल बीमा दस्तावेज (पीएमएफबीवाई)' : 'Crop Insurance Documents',
      example: currentLang === 'te' ? 'ప్రీమియం రసీదు, పాలసీ కాపీ' : currentLang === 'hi' ? 'प्रीमियम रसीद और बीमा पॉलिसी' : 'PM Fasal Bima Yojana policy & receipt',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-700" />,
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      title: currentLang === 'te' ? 'వ్యవసాయ రుణ పత్రాలు (KCC)' : currentLang === 'hi' ? 'कृषि ऋण दस्तावेज (केसीसी)' : 'Agricultural Loan Documents',
      example: currentLang === 'te' ? 'కిసాన్ క్రెడిట్ కార్డు మంజూరు కాపీ' : currentLang === 'hi' ? 'किसान क्रेडिट कार्ड स्वीकृति पत्र' : 'Kisan Credit Card (KCC) sanction orders',
      icon: <CreditCard className="w-6 h-6 text-violet-700" />,
      color: "bg-violet-50 border-violet-200"
    },
    {
      title: currentLang === 'te' ? 'ప్రభుత్వ పథకాల పత్రాలు' : currentLang === 'hi' ? 'सरकारी योजना दस्तावेज (पीएम-किसान)' : 'Government Scheme Documents',
      example: currentLang === 'te' ? 'రైతు భరోసా, పీఎం-కిసాన్ దరఖాస్తులు' : currentLang === 'hi' ? 'पीएम-किसान एवं राज्य योजना रसीदें' : 'PM-KISAN, Rythu Bharosa sanction slips',
      icon: <Building2 className="w-6 h-6 text-orange-700" />,
      color: "bg-orange-50 border-orange-200"
    }
  ];

  const personalRecords = [
    {
      title: currentLang === 'te' ? 'ఆధార్ పత్రాలు (మాస్క్ చేసినవి మాత్రమే)' : currentLang === 'hi' ? 'आधार दस्तावेज (केवल मास्क की गई प्रति)' : 'Aadhaar Documents (Masked Only)',
      example: currentLang === 'te' ? 'చివరి 4 అంకెలు మాత్రమే కనిపించే కాపీ' : currentLang === 'hi' ? 'अंतिम 4 अंक दिखने वाला पहचान पत्र' : 'Masked Aadhaar copy with last 4 digits',
      icon: <IdCard className="w-6 h-6 text-blue-700" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: currentLang === 'te' ? 'బ్యాంక్ పాస్‌బుక్ వివరాలు' : currentLang === 'hi' ? 'बैंक पासबुक प्रथम पृष्ठ' : 'Bank-Related Documents',
      example: currentLang === 'te' ? 'ఖాతా నంబరు, ఐఎఫ్ఎస్సీ (IFSC) పేజీ' : currentLang === 'hi' ? 'डीबीटी एवं सब्सिडी हेतु खाता विवरण' : 'Passbook front page showing IFSC & account',
      icon: <Wallet className="w-6 h-6 text-emerald-700" />,
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      title: currentLang === 'te' ? 'వ్యక్తిగత/ఆరోగ్య బీమా పత్రాలు' : currentLang === 'hi' ? 'स्वास्थ्य एवं जीवन बीमा' : 'Personal Insurance Documents',
      example: currentLang === 'te' ? 'ఆయుష్మాన్ భారత్, సురక్ష బీమా కాపీ' : currentLang === 'hi' ? 'सुरक्षा बीमा, जीवन ज्योति पॉलिसी' : 'PMSBY, PMJJBY, Ayushman Bharat card',
      icon: <HeartPulse className="w-6 h-6 text-rose-700" />,
      color: "bg-rose-50 border-rose-200"
    },
    {
      title: currentLang === 'te' ? 'కుటుంబ విద్యా ధృవీకరణ పత్రాలు' : currentLang === 'hi' ? 'शैक्षणिक प्रमाण पत्र' : 'Educational Certificates',
      example: currentLang === 'te' ? 'పిల్లల మార్కుల జాబితాలు, టీసీలు' : currentLang === 'hi' ? 'बच्चों के स्कूल/कॉलेज प्रमाण पत्र' : 'Children school records, mark sheets',
      icon: <GraduationCap className="w-6 h-6 text-purple-700" />,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: currentLang === 'te' ? 'ఇతర ముఖ్యమైన వ్యక్తిగత పత్రాలు' : currentLang === 'hi' ? 'अन्य जरूरी व्यक्तिगत रिकॉर्ड' : 'Other Personal Records',
      example: currentLang === 'te' ? 'రేషన్ కార్డు, నివాస ధృవీకరణ పత్రం' : currentLang === 'hi' ? 'राशन कार्ड, निवास प्रमाण पत्र' : 'Ration card, domicile, electricity bills',
      icon: <FileCheck className="w-6 h-6 text-amber-700" />,
      color: "bg-amber-50 border-amber-200"
    }
  ];

  return (
    <section id="what" className="py-12 sm:py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            {t.whatTitle}
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            {t.whatSubtitle}
          </p>
        </div>

        {/* High-Visibility Security Alert Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 shadow-xs">
          <div className="p-2 rounded-xl bg-amber-200 text-amber-900 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="font-bold text-sm sm:text-base text-amber-900">
              {t.safetyBannerTitle}
            </div>
            <div className="text-xs sm:text-sm text-amber-800 leading-relaxed mt-0.5">
              {t.safetyBannerText}
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-2xl bg-stone-200/80 border border-stone-300">
            <button
              onClick={() => setActiveTab('agri')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                activeTab === 'agri'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              🌾 {t.tabAgri}
            </button>
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                activeTab === 'personal'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              👨‍🌾 {t.tabPersonal}
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        {activeTab === 'agri' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agriRecords.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition text-left flex flex-col justify-between"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${rec.color}`}>
                    {rec.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base leading-snug">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      {rec.example}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-medium">#{idx + 1} Agricultural</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    Safe to Scan
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {personalRecords.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition text-left flex flex-col justify-between"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${rec.color}`}>
                    {rec.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base leading-snug">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      {rec.example}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-medium">#{idx + 1} Personal</span>
                  <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                    Keep Masked
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
