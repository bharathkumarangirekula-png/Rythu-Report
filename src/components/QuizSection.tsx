import React, { useState } from 'react';
import { 
  HelpCircle, CheckCircle, XCircle, Award, 
  RotateCcw, ArrowRight, Download, Volume2, Sparkles 
} from 'lucide-react';
import { Language, QuizQuestion } from '../types';
import { quizQuestions } from '../data/quizQuestions';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface QuizSectionProps {
  currentLang: Language;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ currentLang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const t = translations[currentLang];
  const question = quizQuestions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (hasSubmitted) return;
    setSelectedOption(index);
    setHasSubmitted(true);
    if (index === question.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSpeakQuestion = () => {
    const qText = question.question[currentLang];
    const opts = question.options[currentLang].join('. ');
    speakText(`${qText}. ${opts}`, currentLang);
  };

  const downloadCertificate = () => {
    const certificateText = `========================================================================\nFARMER DIGITAL SAFETY BADGE & CERTIFICATE\n========================================================================\nFarmer Digital Records Portal | రైతు డిజిటల్ రికార్డుల పోర్టల్\n\nThis certifies that the Farmer has successfully completed the\nDigital Safety & Agricultural Document Literacy Training.\n\nScore Achieved: ${score} / ${quizQuestions.length} Questions Correct\nDate Completed: ${new Date().toLocaleDateString()}\n\nCore Competencies Mastered:\n1. 100% Confidentiality of Bank OTPs and UPI PINs\n2. Clear Document Photography & Standard File Naming\n3. Organized Categorization of Land, Seeds, and Crop Bills\n4. Phishing & Fake Subsidy Link Awareness\n5. Shared Computer Logout at Village MeeSeva / CSC Centers\n\nEmergency Kisan Helpline: 1551 | Cyber Helpline: 1930\n========================================================================`;
    
    const blob = new Blob([certificateText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Farmer_Digital_Safety_Certificate_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="quiz" className="py-12 sm:py-16 bg-white border-y border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === 'te' ? 'సరదా క్విజ్' : currentLang === 'hi' ? 'सरल प्रश्नोत्तरी' : 'Interactive Practice Quiz'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            {t.quizTitle}
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            {t.quizSubtitle}
          </p>
        </div>

        {/* Quiz Body */}
        {!quizFinished ? (
          <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm text-left">
            
            {/* Question Progress & Speaker */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-700 text-white rounded-xl text-xs font-extrabold">
                  {t.quizQuestionPrefix} {currentIndex + 1} / {quizQuestions.length}
                </span>
                <span className="text-xs text-stone-500 font-semibold uppercase">
                  {question.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-stone-600">
                  {currentLang === 'te' ? `స్కోరు: ${score}` : currentLang === 'hi' ? `अंक: ${score}` : `Score: ${score}`}
                </span>
                <button
                  onClick={handleSpeakQuestion}
                  className="p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                  title={t.textToSpeech}
                  aria-label={t.textToSpeech}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-2xl font-bold text-stone-900 mb-6 leading-snug">
              {question.question[currentLang]}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {question.options[currentLang].map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === question.correctIndex;
                
                let btnStyle = "bg-white border-stone-300 hover:border-emerald-500 text-stone-800";
                if (hasSubmitted) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-100 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-600/20";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-100 border-rose-500 text-rose-950 line-through";
                  } else {
                    btnStyle = "bg-white border-stone-200 text-stone-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left transition flex items-center justify-between gap-3 text-sm sm:text-base cursor-pointer ${btnStyle}`}
                  >
                    <span className="font-semibold">{opt}</span>
                    {hasSubmitted && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    )}
                    {hasSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Explanation */}
            {hasSubmitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm text-emerald-900 mb-1">
                      {selectedOption === question.correctIndex 
                        ? (currentLang === 'te' ? 'సరైన సమాధానం! 👏' : currentLang === 'hi' ? 'बिल्कुल सही! 👏' : 'Correct! Great job! 👏')
                        : (currentLang === 'te' ? 'సమాధానం సరిచూసుకోండి:' : currentLang === 'hi' ? 'सही उत्तर देखें:' : 'Note the correct safety habit:')}
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                      {question.explanation[currentLang]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            {hasSubmitted && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  <span>{currentIndex < quizQuestions.length - 1 ? t.btnNext : (currentLang === 'te' ? 'ఫలితం చూడండి' : currentLang === 'hi' ? 'परिणाम देखें' : 'View Results')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Quiz Completed Screen */
          <div className="bg-emerald-50 rounded-3xl border-2 border-emerald-200 p-8 sm:p-12 text-center shadow-lg animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-6 shadow-md">
              <Award className="w-10 h-10" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 mb-2">
              {t.quizCompleteTitle}
            </h3>

            <p className="text-base sm:text-lg text-emerald-800 mb-6">
              {currentLang === 'te' 
                ? `మీరు ${quizQuestions.length} ప్రశ్నలకు గాను ${score} సరైన సమాధానాలు చెప్పారు.` 
                : currentLang === 'hi' 
                ? `आपने ${quizQuestions.length} में से ${score} सही उत्तर दिए।` 
                : `You scored ${score} out of ${quizQuestions.length} correctly.`}
            </p>

            <div className="inline-block bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs mb-8 text-left max-w-sm w-full">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-lime-500 text-white flex items-center justify-center font-bold text-xl">
                  🏅
                </div>
                <div>
                  <div className="font-extrabold text-stone-900 text-sm">
                    {currentLang === 'te' ? 'రైతు డిజిటల్ భద్రతా బ్యాడ్జ్' : currentLang === 'hi' ? 'किसान डिजिटल सुरक्षा बैज' : 'Certified Safe Farmer Badge'}
                  </div>
                  <div className="text-xs text-stone-500">
                    Verified Digital Literacy 2026
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={downloadCertificate}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.btnGetBadge}</span>
              </button>

              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.btnTryAgain}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
