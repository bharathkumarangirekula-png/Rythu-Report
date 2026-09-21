import React, { useState } from 'react';
import { 
  ShieldAlert, Lock, KeyRound, AlertOctagon, 
  ExternalLink, HardDrive, LogOut, CheckCircle, 
  XCircle, Volume2, ShieldCheck, AlertTriangle, MessageSquareWarning 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface DigitalSafetyProps {
  currentLang: Language;
}

export const DigitalSafetySection: React.FC<DigitalSafetyProps> = ({ currentLang }) => {
  const [activeScamCheck, setActiveScamCheck] = useState<number | null>(null);
  const t = translations[currentLang];

  const rules = [
    {
      icon: <AlertOctagon className="w-7 h-7 text-rose-600" />,
      title: t.ruleOtpTitle,
      desc: t.ruleOtpDesc,
      tag: currentLang === 'te' ? 'అత్యంత ముఖ్యం' : currentLang === 'hi' ? 'अति महत्वपूर्ण' : 'Crucial Rule',
      color: 'bg-rose-50 border-rose-200'
    },
    {
      icon: <KeyRound className="w-7 h-7 text-amber-600" />,
      title: t.rulePasswordTitle,
      desc: t.rulePasswordDesc,
      tag: currentLang === 'te' ? 'రహస్యం' : currentLang === 'hi' ? 'गोपनीय' : 'Keep Secret',
      color: 'bg-amber-50 border-amber-200'
    },
    {
      icon: <Lock className="w-7 h-7 text-emerald-600" />,
      title: t.ruleStrongPassTitle,
      desc: t.ruleStrongPassDesc,
      tag: currentLang === 'te' ? 'బలమైన తాళం' : currentLang === 'hi' ? 'मजबूत ताला' : 'Strong Security',
      color: 'bg-emerald-50 border-emerald-200'
    },
    {
      icon: <MessageSquareWarning className="w-7 h-7 text-purple-600" />,
      title: t.ruleLinksTitle,
      desc: t.ruleLinksDesc,
      tag: currentLang === 'te' ? 'నకిలీ లింకులు' : currentLang === 'hi' ? 'फर्जी लिंक' : 'Beware Scams',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      icon: <ExternalLink className="w-7 h-7 text-blue-600" />,
      title: t.ruleVerifyWebTitle,
      desc: t.ruleVerifyWebDesc,
      tag: currentLang === 'te' ? 'వెబ్‌సైట్ తనిఖీ' : currentLang === 'hi' ? 'वेबसाइट जांच' : 'Official Only',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: <ShieldAlert className="w-7 h-7 text-red-600" />,
      title: t.ruleUnknownSiteTitle,
      desc: t.ruleUnknownSiteDesc,
      tag: currentLang === 'te' ? 'పత్రాల రక్షణ' : currentLang === 'hi' ? 'दस्तावेज सुरक्षा' : 'Do Not Upload',
      color: 'bg-red-50 border-red-200'
    },
    {
      icon: <HardDrive className="w-7 h-7 text-teal-600" />,
      title: t.ruleBackupTitle,
      desc: t.ruleBackupDesc,
      tag: currentLang === 'te' ? 'బ్యాకప్ కాపీ' : currentLang === 'hi' ? 'अतिरिक्त प्रति' : 'Keep Backup',
      color: 'bg-teal-50 border-teal-200'
    },
    {
      icon: <LogOut className="w-7 h-7 text-indigo-600" />,
      title: t.ruleSharedLogoutTitle,
      desc: t.ruleSharedLogoutDesc,
      tag: currentLang === 'te' ? 'మీసేవలో లాగౌట్' : currentLang === 'hi' ? 'सीएससी पर लॉगआउट' : 'Shared Center',
      color: 'bg-indigo-50 border-indigo-200'
    }
  ];

  const handleSpeak = (title: string, desc: string) => {
    speakText(`${title}. ${desc}`, currentLang);
  };

  return (
    <section id="safety" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{currentLang === 'te' ? 'ఆన్‌లైన్ రక్షణ నియమాలు' : currentLang === 'hi' ? 'ऑनलाइन सुरक्षा नियम' : 'Cyber Security for Farmers'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            {t.safetyTitle}
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            {t.safetySubtitle}
          </p>
        </div>

        {/* 8 Golden Safety Rules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 text-left">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${rule.color}`}>
                    {rule.icon}
                  </div>
                  <button
                    onClick={() => handleSpeak(rule.title, rule.desc)}
                    className="p-1.5 text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                    title={t.textToSpeech}
                    aria-label={t.textToSpeech}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  {rule.tag}
                </span>

                <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
                  {rule.title}
                </h3>
                
                <p className="text-xs text-stone-600 leading-relaxed">
                  {rule.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] font-semibold text-rose-700 flex items-center gap-1">
                <span>⚠️ {currentLang === 'te' ? 'ఎప్పుడూ మర్చిపోవద్దు' : currentLang === 'hi' ? 'हमेशा याद रखें' : 'Never Forget'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* DOs and DON'Ts Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
          
          {/* DOs Card */}
          <div className="p-6 rounded-3xl bg-emerald-50/80 border-2 border-emerald-200">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-700" />
              <h3 className="text-lg font-bold text-emerald-950">
                {currentLang === 'te' ? 'రైతులు ఖచ్చితంగా చేయాల్సినవి (DOs)' : currentLang === 'hi' ? 'किसान क्या अवश्य करें (DOs)' : 'Good Safety Habits (DOs)'}
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-emerald-900 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{currentLang === 'te' ? 'పత్రాలను తీసేటప్పుడు మంచి వెలుతురులో స్పష్టంగా ఫోటో తీయండి' : currentLang === 'hi' ? 'दस्तावेजों की अच्छी रोशनी में साफ फोटो लें' : 'Photograph documents in bright natural daylight'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{currentLang === 'te' ? 'ముఖ్యమైన రికార్డులకు మెమరీ కార్డులో లేదా పెన్ డ్రైవ్ లో బ్యాకప్ ఉంచండి' : currentLang === 'hi' ? 'महत्वपूर्ण फाइलों की मेमोरी कार्ड में बैकअप रखें' : 'Maintain an offline backup on an SD card or USB flash drive'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{currentLang === 'te' ? 'మీసేవ లేదా నెట్ సెంటర్ కంప్యూటర్ నుండి లేచే ముందు తప్పనిసరిగా లాగౌట్ అవ్వండి' : currentLang === 'hi' ? 'सीएससी सेंटर पर काम पूरा होने पर तुरंत लॉगआउट करें' : 'Log out completely from computers at village MeeSeva centers'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{currentLang === 'te' ? 'సైబర్ మోసం జరిగితే వెంటనే 1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి' : currentLang === 'hi' ? 'धोखाधड़ी होने पर तुरंत साइबर हेल्पलाइन 1930 पर कॉल करें' : 'Report any fraud immediately to National Cyber Crime Helpline: 1930'}</span>
              </li>
            </ul>
          </div>

          {/* DON'Ts Card */}
          <div className="p-6 rounded-3xl bg-rose-50/80 border-2 border-rose-200">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6 text-rose-700" />
              <h3 className="text-lg font-bold text-rose-950">
                {currentLang === 'te' ? 'ఎట్టి పరిస్థితుల్లోనూ చేయకూడనివి (DON\'Ts)' : currentLang === 'hi' ? 'किसान क्या कभी न करें (DON\'Ts)' : 'Dangerous Mistakes (DON\'Ts)'}
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-rose-900 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>{currentLang === 'te' ? 'ఫోన్ కాల్ లో ఎవరికీ మీ 4 లేదా 6 అంకెల ఓటీపీని చెప్పవద్దు' : currentLang === 'hi' ? 'फोन पर किसी भी कॉलर को अपना गुप्त ओटीपी न बताएं' : 'Never share your bank OTP with any phone caller'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>{currentLang === 'te' ? 'ఏటీఎం పిన్ లేదా పాస్‌వర్డ్‌లను కాగితాలపై రాసి పర్సులో ఉంచవద్దు' : currentLang === 'hi' ? 'एटीएम पिन कागज पर लिखकर पासबुक या बटुए में न रखें' : 'Never write your ATM PIN on paper cards or passbooks'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>{currentLang === 'te' ? 'ఉచిత బహుమతులు లేదా రుణాలు అంటూ వచ్చే వాట్సాప్ లింకులను క్లిక్ చేయవద్దు' : currentLang === 'hi' ? 'मुफ्त उपहार व लॉटरी वाले अनजान व्हाट्सएप लिंक न खोलें' : 'Never click unknown links promising free loans or cash rewards'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>{currentLang === 'te' ? 'అధికారికం కాని అనుమానాస్పద యాప్‌లలో ఆధార్ లేదా పాస్‌బుక్ ఫోటోలు పెట్టవద్దు' : currentLang === 'hi' ? 'बिना जांचे अनजान मोबाइल ऐप पर अपनी पासबुक न डालें' : 'Never upload sensitive IDs to unverified social media apps'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive Phishing Simulator Demo */}
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white text-left max-w-3xl mx-auto shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">
                {currentLang === 'te' ? 'నకిలీ ఎస్ఎంఎస్ (SMS) గుర్తించే పరీక్ష' : currentLang === 'hi' ? 'फर्जी संदेश (SMS) पहचानने की परीक्षा' : 'Spot the Fake SMS Scam Test'}
              </h4>
              <p className="text-xs text-stone-400">
                {currentLang === 'te' ? 'ఈ కింది మెసేజ్ మీ ఫోన్‌కు వస్తే మీరు ఏం చేస్తారు?' : currentLang === 'hi' ? 'यदि ऐसा संदेश आपके फोन पर आए तो आप क्या करेंगे?' : 'What would you do if this message arrived on your phone?'}
              </p>
            </div>
          </div>

          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-700 font-mono text-xs sm:text-sm text-lime-300 mb-4 leading-relaxed">
            "Dear Farmer, Rythu Bharosa ₹10,000 pending! Click http://bit.ly/claim-subsidy-ap and enter your ATM card number and PIN within 10 minutes or subsidy will cancel."
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveScamCheck(1)}
              className="flex-1 py-3 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition"
            >
              {currentLang === 'te' ? 'వెంటనే లింక్ నొక్కండి' : currentLang === 'hi' ? 'तुरंत लिंक खोलें' : 'Option A: Click link immediately'}
            </button>
            <button
              onClick={() => setActiveScamCheck(2)}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition"
            >
              {currentLang === 'te' ? 'లింక్ నొక్కకండి, డిలీట్ చేయండి (సురక్షితం)' : currentLang === 'hi' ? 'लिंक न खोलें, डिलीट करें (सुरक्षित)' : 'Option B: Do NOT click, delete SMS (Safe)'}
            </button>
          </div>

          {activeScamCheck === 1 && (
            <div className="mt-4 p-3 bg-rose-950/80 border border-rose-600/60 rounded-xl text-xs text-rose-200">
              ❌ <strong>{currentLang === 'te' ? 'ప్రమాదం!' : currentLang === 'hi' ? 'खतरा!' : 'Danger!'}</strong> {currentLang === 'te' ? 'ఇలా చేస్తే మీ బ్యాంక్ ఖాతాలోని డబ్బు దొంగిలించబడుతుంది. ప్రభుత్వం ఎప్పుడూ ఏటీఎం కార్డు వివరాలు లేదా పిన్ అడగదు.' : currentLang === 'hi' ? 'इससे बैंक से पैसे चोरी हो सकते हैं। सरकार कभी एटीएम पिन नहीं मांगती।' : 'Clicking this exposes your bank account. Official schemes never demand ATM PINs.'}
            </div>
          )}

          {activeScamCheck === 2 && (
            <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-600/60 rounded-xl text-xs text-emerald-200">
              ✅ <strong>{currentLang === 'te' ? 'శభాష్! సరైన నిర్ణయం.' : currentLang === 'hi' ? 'शाबाश! सही निर्णय।' : 'Excellent! Perfect choice.'}</strong> {currentLang === 'te' ? 'అధికారిక ప్రభుత్వ సమాచారం అధికారిక పోర్టల్ ద్వారా లేదా గ్రామ సచివాలయంలో మాత్రమే తనిఖీ చేసుకోవాలి.' : currentLang === 'hi' ? 'सरकारी लाभ की जानकारी केवल ग्राम पंचायत या आधिकारिक पोर्टल पर ही जांचें।' : 'Official DBT subsidies are credited automatically without requesting ATM PINs.'}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
