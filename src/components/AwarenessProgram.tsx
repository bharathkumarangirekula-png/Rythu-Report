import React, { useState } from 'react';
import { 
  Users, Presentation, Smartphone, ShieldCheck, 
  ArrowRight, Sparkles, CheckCircle2, Play, X, BookOpen, Volume2 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface AwarenessProgramProps {
  currentLang: Language;
  onGoToOrganizer: () => void;
  onGoToSafety: () => void;
}

export const AwarenessProgram: React.FC<AwarenessProgramProps> = ({
  currentLang,
  onGoToOrganizer,
  onGoToSafety
}) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [modalStage, setModalStage] = useState(1);
  const t = translations[currentLang];

  const stages = [
    {
      stage: 1,
      tag: "Stage 1",
      icon: <Users className="w-7 h-7 text-emerald-700" />,
      title: t.stage1Title,
      desc: t.stage1Desc,
      deliverable: currentLang === 'te' ? 'గ్రామ సభ చర్చ & కాగితాల నష్టం నివారణ' : currentLang === 'hi' ? 'ग्राम चौपाल चर्चा एवं कागजी सुरक्षा' : 'Gram Sabha gathering & physical damage avoidance',
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      stage: 2,
      tag: "Stage 2",
      icon: <Presentation className="w-7 h-7 text-blue-700" />,
      title: t.stage2Title,
      desc: t.stage2Desc,
      deliverable: currentLang === 'te' ? 'స్మార్ట్‌ఫోన్ కెమెరాతో ప్రత్యక్ష డెమో' : currentLang === 'hi' ? 'स्मार्टफोन कैमरे से सीधा प्रदर्शन' : 'Live smartphone camera scanning workshop',
      color: "bg-blue-50 border-blue-200"
    },
    {
      stage: 3,
      tag: "Stage 3",
      icon: <Smartphone className="w-7 h-7 text-purple-700" />,
      title: t.stage3Title,
      desc: t.stage3Desc,
      deliverable: currentLang === 'te' ? 'డెమో పత్రాలను ఫోల్డర్లలో వర్గీకరించడం' : currentLang === 'hi' ? 'दस्तावेजों को फोल्डर में व्यवस्थित करना' : 'Categorizing seed, crop, and loan records in folders',
      color: "bg-purple-50 border-purple-200"
    },
    {
      stage: 4,
      tag: "Stage 4",
      icon: <ShieldCheck className="w-7 h-7 text-rose-700" />,
      title: t.stage4Title,
      desc: t.stage4Desc,
      deliverable: currentLang === 'te' ? 'ఓటీపీ మోసాలు & సైబర్ భద్రత శిక్షణ' : currentLang === 'hi' ? 'ओटीपी धोखाधड़ी एवं सुरक्षा प्रशिक्षण' : 'OTP fraud prevention & privacy safeguards',
      color: "bg-rose-50 border-rose-200"
    }
  ];

  const handleSpeak = (title: string, desc: string) => {
    speakText(`${title}. ${desc}`, currentLang);
  };

  return (
    <section id="awareness" className="py-12 sm:py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>{currentLang === 'te' ? 'గ్రామ ప్రత్యక్ష ప్రదర్శన కార్యక్రమం' : currentLang === 'hi' ? 'ग्राम स्तरीय प्रदर्शन कार्यक्रम' : 'Village Community Outreach'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            {t.awarenessTitle}
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            {t.awarenessSubtitle}
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex items-center gap-2.5 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold rounded-2xl shadow-md transition cursor-pointer text-base sm:text-lg"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{t.btnStartLearning}</span>
            </button>
          </div>
        </div>

        {/* 4-Stage Village Demonstration Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {stages.map((stage) => (
            <div
              key={stage.stage}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                    {stage.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stage.color}`}>
                      {stage.icon}
                    </div>
                    <button
                      onClick={() => handleSpeak(stage.title, stage.desc)}
                      className="p-1 text-stone-400 hover:text-emerald-700 rounded transition"
                      title={t.textToSpeech}
                      aria-label={t.textToSpeech}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {stage.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-xs font-semibold text-emerald-800 bg-stone-50 p-2.5 rounded-xl">
                📌 <strong>{currentLang === 'te' ? 'గ్రామ కార్యకలాపం:' : currentLang === 'hi' ? 'गतिविधि:' : 'Key Activity:'}</strong> {stage.deliverable}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Demonstration Walkthrough Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 text-left shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold text-stone-900">
                  {currentLang === 'te' ? 'గ్రామ ప్రదర్శన గైడ్ (Village Demo Guide)' : currentLang === 'hi' ? 'ग्राम प्रदर्शन गाइड (Village Demo Guide)' : 'Village Field Demonstration Guide'}
                </h3>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage Selector Pills */}
            <div className="flex gap-2 my-4 overflow-x-auto pb-1">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setModalStage(num)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    modalStage === num
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>Stage {num}</span>
                </button>
              ))}
            </div>

            {/* Stage Details */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3 mb-5">
              {modalStage === 1 && (
                <div>
                  <h4 className="font-bold text-emerald-900 text-base mb-1">
                    {t.stage1Title}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed mb-3">
                    {currentLang === 'te' 
                      ? 'గ్రామ పంచాయతీ లేదా రైతు భరోసా కేంద్రం వద్ద సమావేశమై, కాగితపు పాస్ బుక్కులు వర్షంలో తడిసిపోవడం వల్ల ఎంత నష్టం జరుగుతుందో చర్చించండి.'
                      : currentLang === 'hi'
                      ? 'ग्राम पंचायत या किसान केंद्र पर बैठक करके चर्चा करें कि कैसे कागजी दस्तावेज खराब होने से बैंक लोन में देरी होती है।'
                      : 'Gather at the village community hall. Discuss real stories of lost receipts during crop insurance claim settlement.'}
                  </p>
                  <div className="text-xs bg-white p-3 rounded-xl border border-stone-200 text-stone-800 space-y-1">
                    <div>✓ <strong>Focus:</strong> Explain zero cost of digital photos.</div>
                    <div>✓ <strong>Audience:</strong> Small, marginal, and tenant farmers.</div>
                  </div>
                </div>
              )}

              {modalStage === 2 && (
                <div>
                  <h4 className="font-bold text-blue-900 text-base mb-1">
                    {t.stage2Title}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed mb-3">
                    {currentLang === 'te'
                      ? 'ఒక రైతు ఫోన్ తీసుకొని, పగటి వెలుతురులో కాగితాన్ని చదునుగా పెట్టి, రెండు చేతులతో ఫోన్ కదలకుండా పట్టుకుని ఫోటో తీసి చూపించండి.'
                      : currentLang === 'hi'
                      ? 'एक किसान के फोन से अच्छी रोशनी में सीधा फोटो खींचकर दिखाएं कि कैसे सारे अक्षर साफ आते हैं।'
                      : 'Demonstrate phone positioning under natural light. Show zoom inspection on surveyor signature and stamps.'}
                  </p>
                  <div className="text-xs bg-white p-3 rounded-xl border border-stone-200 text-stone-800 space-y-1">
                    <div>✓ <strong>Clarity Check:</strong> Check survey numbers, dates, and stamps.</div>
                    <div>✓ <strong>Lighting:</strong> Never use flash directly onto plastic or laminated papers.</div>
                  </div>
                </div>
              )}

              {modalStage === 3 && (
                <div>
                  <h4 className="font-bold text-purple-900 text-base mb-1">
                    {t.stage3Title}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed mb-3">
                    {currentLang === 'te'
                      ? 'రైతుల చేతుల మీదుగా నమూనా విత్తన బిల్లులను మరియు భూమి పత్రాలను వేర్వేరు ఫోల్డర్లలో భద్రపరచడం ప్రాక్టీస్ చేయించండి.'
                      : currentLang === 'hi'
                      ? 'किसानों से स्वयं बीज रसीद और खसरा प्रति को अलग-अलग फोल्डर में रखना करवाएं।'
                      : 'Hands-on practice: let each farmer create folders for Land, Crops, and Insurance on their phone.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsDemoModalOpen(false);
                      onGoToOrganizer();
                    }}
                    className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition"
                  >
                    {currentLang === 'te' ? 'డెమో ఆర్గనైజర్ లో ఇప్పుడే ప్రాక్టీస్ చేయండి ➔' : currentLang === 'hi' ? 'डेमो प्रबंधक में अभी अभ्यास करें ➔' : 'Try Demo Organizer Now ➔'}
                  </button>
                </div>
              )}

              {modalStage === 4 && (
                <div>
                  <h4 className="font-bold text-rose-900 text-base mb-1">
                    {t.stage4Title}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed mb-3">
                    {currentLang === 'te'
                      ? 'బ్యాంక్ మేనేజర్ పేరిట వచ్చే నకిలీ ఫోన్ కాల్స్, ఓటీపీ అడగడం, నకిలీ లింకుల గురించి అవగాహన కల్పించండి. 1930 నంబర్ వివరించండి.'
                      : currentLang === 'hi'
                      ? 'फर्जी बैंक कॉल, ओटीपी धोखाधड़ी और साइबर हेल्पलाइन 1930 के बारे में जानकारी दें।'
                      : 'Simulate fraud calls asking for OTPs. Teach immediate reporting to National Cyber Crime Helpline 1930.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsDemoModalOpen(false);
                      onGoToSafety();
                    }}
                    className="w-full py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold transition"
                  >
                    {currentLang === 'te' ? 'భద్రతా నియమాలు చూడండి ➔' : currentLang === 'hi' ? 'सुरक्षा नियम देखें ➔' : 'Review Safety Rules ➔'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <button
                onClick={() => setModalStage(prev => Math.max(1, prev - 1))}
                disabled={modalStage === 1}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 disabled:opacity-40"
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  if (modalStage < 4) {
                    setModalStage(prev => prev + 1);
                  } else {
                    setIsDemoModalOpen(false);
                  }
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                {modalStage < 4 ? 'Next Stage →' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
