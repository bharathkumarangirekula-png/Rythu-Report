import React, { useState } from 'react';
import { 
  Camera, Eye, Tag, FolderDown, ShieldAlert, CopyCheck, 
  CheckCircle2, Volume2, Sparkles, RefreshCw, SunMedium, Smartphone
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface HowToGuideProps {
  currentLang: Language;
}

export const HowToDigitizeGuide: React.FC<HowToGuideProps> = ({ currentLang }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [simulatorState, setSimulatorState] = useState<{
    lighting: 'good' | 'dim';
    steady: boolean;
    scanned: boolean;
  }>({
    lighting: 'good',
    steady: true,
    scanned: false
  });

  const t = translations[currentLang];

  const steps = [
    {
      step: 1,
      icon: <Camera className="w-7 h-7 text-emerald-700" />,
      title: t.step1Title,
      desc: t.step1Desc,
      tip: currentLang === 'te' ? 'కాగితంపై నీడ పడకుండా వెలుతురులో ఉంచండి.' : currentLang === 'hi' ? 'अच्छी रोशनी में दोनों हाथों से फोन पकड़ें।' : 'Natural daylight produces the clearest photos with zero shadows.'
    },
    {
      step: 2,
      icon: <Eye className="w-7 h-7 text-blue-700" />,
      title: t.step2Title,
      desc: t.step2Desc,
      tip: currentLang === 'te' ? 'సర్వే నంబర్లు, పేర్లు, సీలు స్పష్టంగా ఉన్నాయో లేదో జూమ్ చేయండి.' : currentLang === 'hi' ? 'ज़ूम करके खसरा नंबर और मुहर की स्पष्टता देखें।' : 'Zoom in on stamps and survey numbers before saving.'
    },
    {
      step: 3,
      icon: <Tag className="w-7 h-7 text-purple-700" />,
      title: t.step3Title,
      desc: t.step3Desc,
      tip: currentLang === 'te' ? 'ఉదాహరణ: Pahani_Survey142_2026.pdf' : currentLang === 'hi' ? 'उदाहरण: Khasra_Survey142_2026.pdf' : 'Example: Pahani_Survey142_2026.pdf'
    },
    {
      step: 4,
      icon: <FolderDown className="w-7 h-7 text-amber-700" />,
      title: t.step4Title,
      desc: t.step4Desc,
      tip: currentLang === 'te' ? 'భూమి, పంటలు, ఎరువులు లేదా బీమా ఫోల్డర్ ఎంచుకోండి.' : currentLang === 'hi' ? 'जमीन, फसल, खाद या बीमा फोल्डर चुनें।' : 'Select the matching folder (Land, Crops, Fertilizer, Insurance).'
    },
    {
      step: 5,
      icon: <ShieldAlert className="w-7 h-7 text-teal-700" />,
      title: t.step5Title,
      desc: t.step5Desc,
      tip: currentLang === 'te' ? 'ఫోన్ సురక్షిత ఫోల్డర్ లేదా డిజిలాకర్ లో ఉంచండి.' : currentLang === 'hi' ? 'सुरक्षित फोन फोल्डर या डिजीलॉकर में रखें।' : 'Keep in protected phone storage or official DigiLocker.'
    },
    {
      step: 6,
      icon: <CopyCheck className="w-7 h-7 text-indigo-700" />,
      title: t.step6Title,
      desc: t.step6Desc,
      tip: currentLang === 'te' ? 'మెమరీ కార్డు లేదా కుటుంబ సభ్యుల ఫోన్ లో మరో కాపీ ఉంచండి.' : currentLang === 'hi' ? 'मेमोरी कार्ड में एक अतिरिक्त प्रति सुरक्षित रखें।' : 'Keep a second copy on a memory card or USB drive.'
    }
  ];

  const handleSpeak = (title: string, desc: string) => {
    speakText(`${title}. ${desc}`, currentLang);
  };

  return (
    <section id="guide" className="py-12 sm:py-16 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === 'te' ? 'సులువైన 6 దశలు' : currentLang === 'hi' ? 'आसान 6 चरण' : 'Easy 6 Steps'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            {t.guideTitle}
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            {t.guideSubtitle}
          </p>
        </div>

        {/* 6 Numbered Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((item) => {
            const isCurrent = activeStep === item.step;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-6 rounded-2xl border-2 transition text-left cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-emerald-50/50 border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
                    : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-lg ${
                      isCurrent ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {item.step}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-white border border-stone-200 shadow-xs">
                        {item.icon}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(item.title, item.desc);
                        }}
                        className="p-1.5 text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                        title={t.textToSpeech}
                        aria-label={t.textToSpeech}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 text-xs font-semibold text-emerald-800 bg-emerald-100/60 p-2.5 rounded-xl">
                  💡 <strong>{currentLang === 'te' ? 'రైతు సలహా:' : currentLang === 'hi' ? 'सलाह:' : 'Farmer Tip:'}</strong> {item.tip}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Hands-on Demonstration Tool */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl max-w-4xl mx-auto text-left">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-700">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400 uppercase tracking-wider mb-1">
                <Camera className="w-4 h-4" />
                <span>{currentLang === 'te' ? 'కెమెరా ప్రాక్టీస్ సిమ్యులేటర్' : currentLang === 'hi' ? 'कैमरा अभ्यास सिमुलेटर' : 'Camera Scanning Practice Simulator'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                {currentLang === 'te' ? 'స్పష్టమైన పత్రం ఫోటో తీయడం ప్రాక్టీస్ చేయండి' : currentLang === 'hi' ? 'स्पष्ट दस्तावेज फोटो खींचने का अभ्यास करें' : 'Practice Capturing a Readable Document'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimulatorState(prev => ({ ...prev, lighting: prev.lighting === 'good' ? 'dim' : 'good' }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  simulatorState.lighting === 'good'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-stone-700 border-stone-600 text-stone-300'
                }`}
              >
                <SunMedium className="w-3.5 h-3.5" />
                <span>{simulatorState.lighting === 'good' ? 'Daylight: ON' : 'Daylight: DIM'}</span>
              </button>
            </div>
          </div>

          {/* Simulator Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Viewfinder simulation */}
            <div className="md:col-span-7 bg-stone-950 p-4 rounded-2xl border-2 border-dashed border-emerald-500/60 relative overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
              
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-emerald-400" />

              {/* Sample Document Inside Camera */}
              <div className={`w-64 bg-white p-3.5 rounded-lg text-stone-900 shadow-md text-center transition duration-300 ${
                simulatorState.lighting === 'dim' ? 'brightness-50 blur-[1px]' : 'brightness-100'
              }`}>
                <div className="text-[10px] uppercase font-bold text-stone-500 border-b pb-1 mb-2">
                  Sample: Land Title (1B Adangal)
                </div>
                <div className="text-xs font-extrabold text-stone-800">
                  Survey No: 142/2A • 4.50 Acres
                </div>
                <div className="text-[11px] text-stone-600 mt-1">
                  Owner: Ramesh • Tenali, Guntur
                </div>
                <div className="mt-2 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  Official Seal Verified
                </div>
              </div>

              {/* Status Pill */}
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
                {simulatorState.lighting === 'good' ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {currentLang === 'te' ? 'వెలుతురు బాగుంది, అక్షరాలు స్పష్టం!' : currentLang === 'hi' ? 'रोशनी अच्छी है, लिखावट साफ है!' : 'Good Light, Ready to Capture!'}
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    ⚠️ {currentLang === 'te' ? 'వెలుతురు చాలదు, నీడ పడుతోంది' : currentLang === 'hi' ? 'रोशनी कम है, परछाई आ रही है' : 'Dim Lighting - Please move to daylight'}
                  </span>
                )}
              </div>
            </div>

            {/* Simulator Actions */}
            <div className="md:col-span-5 space-y-4">
              <div className="space-y-2 text-sm text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{currentLang === 'te' ? 'రెండు చేతులతో ఫోన్ కదలకుండా పట్టుకోండి' : currentLang === 'hi' ? 'दोनों हाथों से फोन स्थिर रखें' : 'Hold phone steady with both hands'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{currentLang === 'te' ? 'నాలుగు మూలలు స్క్రీన్ లో కనిపించాలి' : currentLang === 'hi' ? 'दस्तावेज के चारों कोने दिखने चाहिए' : 'All 4 corners must be within the frame'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{currentLang === 'te' ? 'ఫ్లాష్ కాంతి కాగితంపై పడకుండా చూడండి' : currentLang === 'hi' ? 'कागज पर कैमरे की चमक न पड़ने दें' : 'Avoid flash glare on glossy paper'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSimulatorState(prev => ({ ...prev, scanned: true }));
                  setTimeout(() => setSimulatorState(prev => ({ ...prev, scanned: false })), 2500);
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>
                  {simulatorState.scanned 
                    ? (currentLang === 'te' ? '✓ పత్రం భద్రపరచబడింది!' : currentLang === 'hi' ? '✓ दस्तावेज सुरक्षित हुआ!' : '✓ Scanned & Saved to Folder!') 
                    : (currentLang === 'te' ? 'టెస్ట్ స్కాన్ తీయండి (Test Scan)' : currentLang === 'hi' ? 'टेस्ट स्कैन लें (Test Scan)' : 'Capture Test Scan')}
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
