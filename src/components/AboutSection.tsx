import React from 'react';
import { Sprout, BookCheck, ShieldCheck, Layers, Users, PhoneCall, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const pillars = [
    {
      icon: <BookCheck className="w-6 h-6 text-emerald-700" />,
      title: currentLang === 'te' ? 'డిజిటల్ అక్షరాస్యత' : currentLang === 'hi' ? 'डिजिटल साक्षरता' : 'Digital Literacy',
      desc: currentLang === 'te' ? 'స్మార్ట్‌ఫోన్‌ను వ్యవసాయ రికార్డుల కోసం సమర్థవంతంగా ఉపయోగించడం.' : currentLang === 'hi' ? 'स्मार्टफोन को कृषि फाइलों हेतु उपयोगी बनाना।' : 'Empowering farmers to use phone storage intuitively without tech jargon.'
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-700" />,
      title: currentLang === 'te' ? 'వ్యవసాయ రికార్డుల నిర్వహణ' : currentLang === 'hi' ? 'कृषि रिकॉर्ड प्रबंधन' : 'Agricultural Record Management',
      desc: currentLang === 'te' ? 'విత్తనాలు, ఎరువులు, భూసార నివేదికలు మరియు రుణ పత్రాలను నిర్వహించడం.' : currentLang === 'hi' ? 'बीज, खाद, मिट्टी जांच और लोन पत्राचार का प्रबंधन।' : 'Systematic archiving of crop seasons, fertilizers, and insurance policies.'
    },
    {
      icon: <Sprout className="w-6 h-6 text-lime-700" />,
      title: currentLang === 'te' ? 'పత్రాల క్రమబద్ధీకరణ' : currentLang === 'hi' ? 'दस्तावेज वर्गीकरण' : 'Document Organization',
      desc: currentLang === 'te' ? 'అవసరమైనప్పుడు సులభంగా దొరికేలా స్పష్టమైన పేర్లు, ఫోల్డర్లు ఏర్పాటు చేయడం.' : currentLang === 'hi' ? 'जरूरत पर तुरंत खोजने के लिए स्पष्ट नाम व फोल्डर बनाना।' : 'Logical categorization to retrieve land deeds and survey maps in seconds.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-700" />,
      title: currentLang === 'te' ? 'డిజిటల్ భద్రతా స్పృహ' : currentLang === 'hi' ? 'डिजिटल सुरक्षा जागरूकता' : 'Digital Safety Awareness',
      desc: currentLang === 'te' ? 'ఓటీపీ గోప్యత, సైబర్ నేరాల నుండి రక్షణ మరియు మోసపూరిత లింకులపై అవగాహన.' : currentLang === 'hi' ? 'ओटीपी गोपनीयता और साइबर धोखाधड़ी से बचाव की सीख।' : 'Strict adherence to OTP confidentiality, secure passwords, and phishing avoidance.'
    },
    {
      icon: <Users className="w-6 h-6 text-purple-700" />,
      title: currentLang === 'te' ? 'క్షేత్రస్థాయి ప్రత్యక్ష ప్రదర్శనలు' : currentLang === 'hi' ? 'ग्राम स्तरीय व्यावहारिक प्रदर्शन' : 'Field-Based Demonstrations',
      desc: currentLang === 'te' ? 'రైతు భరోసా కేంద్రాలు మరియు గ్రామ సభలలో స్వయంగా నేర్పించే విధానం.' : currentLang === 'hi' ? 'किसान चौपाल और पंचायत स्तर पर व्यावहारिक प्रशिक्षण।' : 'Village demonstrations designed for grassroots meetings and peer learning.'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 lg:p-12 shadow-sm">
          
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              <Sprout className="w-3.5 h-3.5" />
              <span>{currentLang === 'te' ? 'లక్ష్యం & ఉద్దేశం' : currentLang === 'hi' ? 'उद्देश्य एवं लक्ष्य' : 'Mission & Vision'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
              {t.aboutTitle}
            </h2>
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-4">
              {t.aboutP1}
            </p>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {t.aboutP2}
            </p>
          </div>

          {/* 5 Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-3 shadow-xs">
                  {item.icon}
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Important Contacts & Rural Support Box */}
          <div className="bg-emerald-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-lg text-white mb-1">
                {currentLang === 'te' ? 'రైతు అత్యవసర సహాయ కేంద్రాలు (Helplines)' : currentLang === 'hi' ? 'किसान आपातकालीन हेल्पलाइन' : 'Official Emergency Farmer Helplines'}
              </h4>
              <p className="text-xs text-emerald-200">
                {currentLang === 'te' ? 'సందేహాలు లేదా సైబర్ మోసాల ఫిర్యాదులకు ఈ నంబర్లకు వెంటనే కాల్ చేయండి.' : currentLang === 'hi' ? 'कृषि सलाह या ऑनलाइन धोखाधड़ी की शिकायत के लिए संपर्क करें।' : 'For agriculture advisories or reporting online financial frauds, reach out toll-free.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:1551"
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-emerald-600"
              >
                <PhoneCall className="w-4 h-4 text-lime-400" />
                <span>Kisan Call: 1551</span>
              </a>
              <a
                href="tel:1930"
                className="px-4 py-2.5 bg-rose-700 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Cyber Crime: 1930</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
