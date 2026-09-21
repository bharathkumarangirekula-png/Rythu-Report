import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "safety",
    question: {
      en: "Should you share your OTP with someone who calls claiming to be from the bank or agriculture department?",
      te: "బ్యాంక్ లేదా వ్యవసాయ శాఖ నుండి మాట్లాడుతున్నామని చెప్పే వ్యక్తికి మీ మొబైల్ ఓటీపీ (OTP) చెప్పవచ్చా?",
      hi: "क्या बैंक या कृषि विभाग का अधिकारी बनकर फोन करने वाले व्यक्ति को अपना ओटीपी (OTP) बताना चाहिए?"
    },
    options: {
      en: ["Yes, if they sound polite and official", "No, never share your OTP with anyone"],
      te: ["అవును, వారు మర్యాదగా మాట్లాడితే చెప్పవచ్చు", "లేదు, ఎట్టి పరిస్థితుల్లోనూ ఓటీపీ ఎవరికీ చెప్పకూడదు"],
      hi: ["हाँ, यदि वह विनम्रता से बात कर रहा हो", "नहीं, अपना ओटीपी किसी को कभी न बताएं"]
    },
    correctIndex: 1,
    explanation: {
      en: "Correct! Never share your OTP with anyone. Real bank managers and agriculture officers will never ask for your secret OTP.",
      te: "సరైన సమాధానం! ఓటీపీ ఎవరితోనూ పంచుకోవద్దు. నిజమైన బ్యాంక్ అధికారులు లేదా ప్రభుత్వ ఉద్యోగులు ఎప్పుడూ ఓటీపీ అడగరు.",
      hi: "सही उत्तर! अपना ओटीपी कभी किसी से साझा न करें। असली बैंक अधिकारी कभी गुप्त ओटीपी नहीं मांगते।"
    }
  },
  {
    id: 2,
    category: "documents",
    question: {
      en: "What is the best way to name a scanned land document file on your phone?",
      te: "మీ ఫోన్ లో స్కాన్ చేసిన భూమి పత్రానికి ఎలాంటి పేరు పెట్టడం మంచిది?",
      hi: "अपने फोन में स्कैन किए गए जमीन के दस्तावेज को क्या नाम देना सबसे अच्छा है?"
    },
    options: {
      en: ["IMG_000492.jpg", "Pahani_Survey142_2026.pdf"],
      te: ["IMG_000492.jpg", "Pahani_Survey142_2026.pdf (స్పష్టమైన పేరు)"],
      hi: ["IMG_000492.jpg", "Pahani_Survey142_2026.pdf (स्पष्ट नाम)"]
    },
    correctIndex: 1,
    explanation: {
      en: "Correct! Renaming files with the document name, survey number, and year makes it easy to find them in seconds when needed.",
      te: "సరైన సమాధానం! పత్రం పేరు, సర్వే నంబర్, సంవత్సరంతో పేరు పెట్టడం వల్ల అవసరమైనప్పుడు క్షణాల్లో వెతకవచ్చు.",
      hi: "सही उत्तर! दस्तावेज का नाम, खसरा नंबर और वर्ष लिखने से जरूरत पड़ने पर उसे तुरंत खोजा जा सकता है।"
    }
  },
  {
    id: 3,
    category: "safety",
    question: {
      en: "You get an SMS: 'Congratulations! You won ₹50,000 free subsidy. Click this link and enter your ATM PIN'. What should you do?",
      te: "'అభినందనలు! మీకు రూ. 50,000 ఉచిత సబ్సిడీ వచ్చింది. ఈ లింక్ క్లిక్ చేసి ఏటీఎం పిన్ నమోదు చేయండి' అని మెసేజ్ వస్తే ఏం చేయాలి?",
      hi: "'बधाई हो! आपको ₹50,000 की मुफ्त सब्सिडी मिली है। इस लिंक पर क्लिक करें और एटीएम पिन दर्ज करें' - ऐसा संदेश आने पर क्या करें?"
    },
    options: {
      en: ["Click the link immediately to claim money", "Do not click the link and delete the message"],
      te: ["డబ్బుల కోసం వెంటనే లింక్ క్లిక్ చేయాలి", "లింక్ క్లిక్ చేయకూడదు, ఆ సందేశాన్ని తొలగించాలి"],
      hi: ["पैसे पाने के लिए तुरंत लिंक पर क्लिक करें", "लिंक पर क्लिक न करें और संदेश को डिलीट कर दें"]
    },
    correctIndex: 1,
    explanation: {
      en: "Correct! This is a scam link. Legitimate government schemes never send lottery links or ask for your confidential ATM PIN.",
      te: "సరైన సమాధానం! ఇది మోసపూరిత లింక్. ప్రభుత్వం ఎప్పుడూ ఏటీఎం పిన్ అడగదు. ఇలాంటి లింకులు క్లిక్ చేయకూడదు.",
      hi: "सही उत्तर! यह एक धोखाधड़ी वाला लिंक है। सरकार कभी लॉटरी लिंक नहीं भेजती और न ही एटीएम पिन मांगती है।"
    }
  },
  {
    id: 4,
    category: "backup",
    question: {
      en: "Why is taking a digital photo of paper bills and land passbooks helpful for farmers?",
      te: "కాగితపు బిల్లులు, పాస్ బుక్కులను ఫోన్ లో డిజిటల్ ఫొటో తీసుకోవడం రైతుకు ఎందుకు ఉపయోగపడుతుంది?",
      hi: "कागजी बिल और पासबुक की फोन में फोटो रखना किसान के लिए क्यों फायदेमंद है?"
    },
    options: {
      en: ["Protects records against rain, fire, termites, or getting misplaced", "It takes too much phone space and is not useful"],
      te: ["వర్షం, చెదలు, అగ్నిప్రమాదాల వల్ల కాగితం పాడైనా రికార్డు సురక్షితంగా ఉంటుంది", "ఫోన్ లో స్థలం వృధా అవుతుంది, ఎలాంటి ఉపయోగం ఉండదు"],
      hi: ["बारिश, आग, दीमक या खोने पर भी रिकॉर्ड हमेशा सुरक्षित रहता है", "यह फोन की जगह घेरता है और किसी काम का नहीं"]
    },
    correctIndex: 0,
    explanation: {
      en: "Correct! Physical paper deteriorates with moisture, pests, and time. Digital copies ensure you always have proof for loans and subsidies.",
      te: "సరైన సమాధానం! కాగితాలు తడిసిపోయినా లేదా పాడైనా, డిజిటల్ కాపీ మీ పంట రుణాలు మరియు సబ్సిడీల దరఖాస్తులకు ఎల్లప్పుడూ తోడ్పడుతుంది.",
      hi: "सही उत्तर! कागजी दस्तावेज नमी और कीड़ों से खराब हो सकते हैं। डिजिटल कॉपी से बैंक ऋण और योजनाओं के लिए हमेशा प्रमाण रहता है।"
    }
  },
  {
    id: 5,
    category: "safety",
    question: {
      en: "When using a computer at a village internet cafe or MeeSeva center, what is the most important step before leaving?",
      te: "గ్రామంలోని మీసేవ లేదా ఇంటర్నెట్ కేఫ్ లో కంప్యూటర్ ఉపయోగించిన తర్వాత బయటకు వచ్చే ముందు ఏం చేయాలి?",
      hi: "गांव के सीएससी या इंटरनेट कैफे में काम खत्म होने के बाद जाने से पहले सबसे जरूरी कदम क्या है?"
    },
    options: {
      en: ["Just walk away and leave the screen open", "Log out of your accounts and close the browser window"],
      te: ["స్క్రీన్ అలాగే ఉంచి బయటకు వెళ్లిపోవాలి", "ఖాతా నుండి లాగౌట్ (Log Out) చేసి బ్రౌజర్ విండో మూసివేయాలి"],
      hi: ["स्क्रीन खुली छोड़कर सीधे चले जाएं", "खाते से लॉगआउट (Log Out) करें और ब्राउज़र बंद करें"]
    },
    correctIndex: 1,
    explanation: {
      en: "Correct! Always log out on shared computers so the next person cannot see your personal records or misuse your account.",
      te: "సరైన సమాధానం! ఇతరులు మీ సమాచారం చూడకుండా లేదా దుర్వినియోగం చేయకుండా ఉండటానికి ఎల్లప్పుడూ లాగౌట్ చేయాలి.",
      hi: "सही उत्तर! साझा कंप्यूटर पर हमेशा लॉगआउट करें ताकि कोई दूसरा व्यक्ति आपकी जानकारी का गलत इस्तेमाल न कर सके।"
    }
  },
  {
    id: 6,
    category: "documents",
    question: {
      en: "Before uploading a document, how can you ensure the scan quality is good?",
      te: "పత్రాన్ని భద్రపరిచే ముందు, ఫొటో స్పష్టంగా ఉందో లేదో ఎలా నిర్ధారించుకోవాలి?",
      hi: "दस्तावेज को सुरक्षित रखने से पहले कैसे जांचें कि फोटो की गुणवत्ता सही है?"
    },
    options: {
      en: ["Zoom in on phone screen to verify text, numbers, and official stamps are sharp", "Take photo in pitch darkness with no light"],
      te: ["ఫోన్ లో జూమ్ చేసి చూసి అక్షరాలు, సర్వే నంబర్లు, స్టాంపులు స్పష్టంగా కనిపిస్తున్నాయా అని చూడాలి", "ఎలాంటి వెలుతురు లేని చీకటిలో ఫొటో తీయాలి"],
      hi: ["फोन में ज़ूम करके देखें कि लिखावट, नंबर और मुहर साफ दिख रहे हैं", "बिना रोशनी के अंधेरे में फोटो लें"]
    },
    correctIndex: 0,
    explanation: {
      en: "Correct! Checking clarity prevents rejection when applying for crop insurance or bank loan verification.",
      te: "సరైన సమాధానం! స్పష్టతను తనిఖీ చేసుకోవడం వల్ల పంట బీమా లేదా బ్యాంక్ లోన్ దరఖాస్తుల సమయంలో ఎలాంటి ఇబ్బంది రాదు.",
      hi: "सही उत्तर! स्पष्टता की जांच करने से बैंक लोन या फसल बीमा सत्यापन के समय दस्तावेज अस्वीकार नहीं होता।"
    }
  }
];
