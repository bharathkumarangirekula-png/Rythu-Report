import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  navHome: string;
  navLearn: string;
  navRecords: string;
  navSafety: string;
  navAwareness: string;
  navAbout: string;
  
  heroTitle: string;
  heroSubtitle: string;
  btnLearnHow: string;
  btnManageRecords: string;
  featureDigitize: string;
  featureDigitizeDesc: string;
  featureOrganize: string;
  featureOrganizeDesc: string;
  featureStore: string;
  featureStoreDesc: string;

  whyTitle: string;
  whySubtitle: string;
  benefit1Title: string;
  benefit1Desc: string;
  benefit2Title: string;
  benefit2Desc: string;
  benefit3Title: string;
  benefit3Desc: string;
  benefit4Title: string;
  benefit4Desc: string;
  benefit5Title: string;
  benefit5Desc: string;
  benefit6Title: string;
  benefit6Desc: string;

  whatTitle: string;
  whatSubtitle: string;
  tabAgri: string;
  tabPersonal: string;
  safetyBannerTitle: string;
  safetyBannerText: string;

  guideTitle: string;
  guideSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  step5Title: string;
  step5Desc: string;
  step6Title: string;
  step6Desc: string;

  organizerTitle: string;
  organizerSubtitle: string;
  searchPlaceholder: string;
  allCategories: string;
  allTypes: string;
  btnAddRecord: string;
  colName: string;
  colCategory: string;
  colDate: string;
  colType: string;
  colStatus: string;
  colActions: string;
  btnView: string;
  btnDownload: string;
  btnDelete: string;
  statusVerified: string;
  statusPending: string;
  statusArchived: string;
  noRecordsFound: string;

  safetyTitle: string;
  safetySubtitle: string;
  ruleOtpTitle: string;
  ruleOtpDesc: string;
  rulePasswordTitle: string;
  rulePasswordDesc: string;
  ruleStrongPassTitle: string;
  ruleStrongPassDesc: string;
  ruleLinksTitle: string;
  ruleLinksDesc: string;
  ruleVerifyWebTitle: string;
  ruleVerifyWebDesc: string;
  ruleUnknownSiteTitle: string;
  ruleUnknownSiteDesc: string;
  ruleBackupTitle: string;
  ruleBackupDesc: string;
  ruleSharedLogoutTitle: string;
  ruleSharedLogoutDesc: string;

  awarenessTitle: string;
  awarenessSubtitle: string;
  stage1Title: string;
  stage1Desc: string;
  stage2Title: string;
  stage2Desc: string;
  stage3Title: string;
  stage3Desc: string;
  stage4Title: string;
  stage4Desc: string;
  btnStartLearning: string;

  quizTitle: string;
  quizSubtitle: string;
  quizQuestionPrefix: string;
  btnNext: string;
  btnTryAgain: string;
  btnGetBadge: string;
  quizCompleteTitle: string;

  dashboardTitle: string;
  dashboardSubtitle: string;
  totalRecords: string;
  agriRecords: string;
  personalRecords: string;
  otherRecords: string;

  farmerProfileTitle: string;
  farmerName: string;
  farmerFarm: string;
  farmerLocation: string;
  farmerCrops: string;

  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;

  textToSpeech: string;
  close: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "Farmer Digital Records Portal",
    tagline: "Simple & Safe Digital Records for Every Farmer",
    navHome: "Home",
    navLearn: "Learn",
    navRecords: "My Records",
    navSafety: "Safety",
    navAwareness: "Awareness Program",
    navAbout: "About",

    heroTitle: "Digital Records for Every Farmer",
    heroSubtitle: "Digitize, organize and safely store your important agricultural and personal records.",
    btnLearnHow: "📚 Learn How",
    btnManageRecords: "📁 Manage My Records",
    featureDigitize: "📄 Digitize Records",
    featureDigitizeDesc: "Turn paper bills, land records, and passbooks into clear digital photos on your phone.",
    featureOrganize: "🗂️ Organize Documents",
    featureOrganizeDesc: "Keep your land, crop, seed, and insurance files neatly sorted in easy folders.",
    featureStore: "🔐 Store Safely",
    featureStoreDesc: "Protect your family documents from water damage, fire, insects, or getting misplaced.",

    whyTitle: "Why Digital Records?",
    whySubtitle: "Keeping records on your phone makes farming simpler, safer, and stress-free.",
    benefit1Title: "Prevent Loss of Important Papers",
    benefit1Desc: "Physical paper can get torn, damaged by rains, eaten by termites, or lost. Digital copies are always safe.",
    benefit2Title: "Easily Find Records When Needed",
    benefit2Desc: "Quickly search by crop season, year, or type in seconds without searching through boxes of old files.",
    benefit3Title: "Reduce Dependency on Physical Papers",
    benefit3Desc: "Carry all your land and farming receipts right inside your pocket wherever you travel.",
    benefit4Title: "Keep Agricultural Info Organized",
    benefit4Desc: "Track seed purchases, fertilizer bills, pesticide schedules, and soil test reports across years.",
    benefit5Title: "Access From Phone or Computer",
    benefit5Desc: "Access your documents anytime from your Android smartphone, tablet, or village service center.",
    benefit6Title: "Improve Awareness of Digital Safety",
    benefit6Desc: "Learn simple security habits like protecting OTPs, keeping backups, and identifying fake messages.",

    whatTitle: "What Records Can Farmers Digitize?",
    whatSubtitle: "Explore what documents you can safely keep organized on your smartphone.",
    tabAgri: "Agricultural Records (10)",
    tabPersonal: "Personal Records (5)",
    safetyBannerTitle: "⚠️ Important Security & Privacy Notice",
    safetyBannerText: "This is a demonstration and educational portal. For real government services, always use official government portals (such as MeeSeva, PM-KISAN, or DigiLocker). Never upload unmasked Aadhaar, original bank PINs, or confidential cards to untrusted websites.",

    guideTitle: "How to Digitize a Document",
    guideSubtitle: "Follow these 6 easy steps using your smartphone camera.",
    step1Title: "Step 1: Take a Clear Photo or Scan",
    step1Desc: "Place the paper flat under bright daylight. Hold your phone steady with both hands and avoid shadows.",
    step2Title: "Step 2: Check That All Text is Readable",
    step2Desc: "Zoom into the photo to make sure survey numbers, names, dates, and stamps are crisp and readable.",
    step3Title: "Step 3: Rename the File Clearly",
    step3Desc: "Give it a simple recognizable name, for example: 'Pahani_Survey142_2026.pdf' instead of 'IMG_0023'.",
    step4Title: "Step 4: Select the Correct Category",
    step4Desc: "Put the document in the right folder like Land, Crop, Fertilizer, Seed, or Insurance.",
    step5Title: "Step 5: Store in a Secure Location",
    step5Desc: "Save inside your protected phone storage or a trusted national digital locker app.",
    step6Title: "Step 6: Keep a Backup",
    step6Desc: "Share a copy with a trusted family member or store a copy on a memory card/pen drive.",

    organizerTitle: "Digital Record Organizer (Demo)",
    organizerSubtitle: "Practice viewing, organizing, and filtering records with sample farmer data.",
    searchPlaceholder: "Search your records by name, survey number, or crop...",
    allCategories: "All Categories",
    allTypes: "All File Types",
    btnAddRecord: "+ Add New Demo Record",
    colName: "Document Name",
    colCategory: "Category",
    colDate: "Date Added",
    colType: "File Type",
    colStatus: "Status",
    colActions: "Actions",
    btnView: "View",
    btnDownload: "Download",
    btnDelete: "Delete",
    statusVerified: "Verified",
    statusPending: "Pending",
    statusArchived: "Archived",
    noRecordsFound: "No records found matching your filters. Try clearing your search.",

    safetyTitle: "Stay Safe Online",
    safetySubtitle: "Simple security rules every farmer must remember to protect money and documents.",
    ruleOtpTitle: "Never Share OTPs With Anyone",
    ruleOtpDesc: "Even if someone calls claiming to be a bank manager, agriculture officer, or government representative, NEVER share your 4 or 6 digit OTP.",
    rulePasswordTitle: "Never Share Passwords or ATM PINs",
    rulePasswordDesc: "Your passwords and ATM PINs are your digital keys. Keep them private and never write them on paper cards.",
    ruleStrongPassTitle: "Use Strong Passwords",
    ruleStrongPassDesc: "Avoid simple passwords like '123456' or your birth year. Use a mix of letters, numbers, and symbols.",
    ruleLinksTitle: "Do Not Click Suspicious Links",
    ruleLinksDesc: "Beware of SMS or WhatsApp messages promising '₹50,000 free loan' or 'free tractor subsidy' if you click a link.",
    ruleVerifyWebTitle: "Verify Websites Before Entering Info",
    ruleVerifyWebDesc: "Official Indian government portals usually end in '.gov.in' or '.nic.in'. Look for the padlock (🔒) symbol.",
    ruleUnknownSiteTitle: "Avoid Uploading to Unknown Websites",
    ruleUnknownSiteDesc: "Never upload your land deeds, bank passbooks, or family ID cards to random social media apps or unofficial websites.",
    ruleBackupTitle: "Keep Backups of Important Records",
    ruleBackupDesc: "If your phone is damaged or replaced, having a backup on a memory card ensures your records are not lost.",
    ruleSharedLogoutTitle: "Log Out on Shared Devices",
    ruleSharedLogoutDesc: "When using a computer at a village internet cafe or MeeSeva center, always click 'Log Out' and close the window before leaving.",

    awarenessTitle: "Farmer Awareness Program",
    awarenessSubtitle: "Learn Through Demonstration — A simple 4-step program designed for village meetings and farmer groups.",
    stage1Title: "Stage 1 – Awareness",
    stage1Desc: "Community gathering explaining why paper documents get damaged and how digital copies save time and money during crop loan applications.",
    stage2Title: "Stage 2 – Demonstration",
    stage2Desc: "Live village workshop showing farmers how to position their phone camera, avoid flash glares, and capture clear scans.",
    stage3Title: "Stage 3 – Hands-on Practice",
    stage3Desc: "Farmers practice categorizing sample seed bills, fertilizer receipts, and insurance policies in safe demo folders.",
    stage4Title: "Stage 4 – Safety Training",
    stage4Desc: "Interactive session on recognizing fake subsidy phone calls, protecting bank OTPs, and maintaining privacy.",
    btnStartLearning: "Start Learning Demonstration",

    quizTitle: "Interactive Learning & Safety Quiz",
    quizSubtitle: "Test your digital safety knowledge with simple questions. Earn your Farmer Digital Safety Badge!",
    quizQuestionPrefix: "Question",
    btnNext: "Next Question",
    btnTryAgain: "Try Again",
    btnGetBadge: "Download Safety Badge",
    quizCompleteTitle: "Great Job! You Understand Digital Safety!",

    dashboardTitle: "Farmer Overview Dashboard",
    dashboardSubtitle: "Quick overview of categorized documents and farm records.",
    totalRecords: "Total Records",
    agriRecords: "Agricultural Records",
    personalRecords: "Personal Records",
    otherRecords: "Other Records",

    farmerProfileTitle: "Sample Farmer Profile",
    farmerName: "Farmer Name: Ramesh",
    farmerFarm: "Farm: Green Valley Farm",
    farmerLocation: "Location: Guntur, Andhra Pradesh",
    farmerCrops: "Main Crops: Rice, Chilli, Cotton",

    aboutTitle: "About This Project",
    aboutP1: "This project aims to improve digital awareness among farmers by teaching them how to digitize, organize and safely manage important agricultural and personal records.",
    aboutP2: "Built specifically for rural farming communities, it combines digital literacy, agricultural record management, document organization, digital safety awareness, and field-based demonstrations.",

    textToSpeech: "Listen in Audio",
    close: "Close"
  },

  te: {
    appName: "రైతు డిజిటల్ రికార్డుల పోర్టల్",
    tagline: "ప్రతి రైతుకు సులువైన మరియు సురక్షితమైన డిజిటల్ పత్రాలు",
    navHome: "హోమ్",
    navLearn: "నేర్చుకోండి",
    navRecords: "నా రికార్డులు",
    navSafety: "భద్రత",
    navAwareness: "అవగాహన కార్యక్రమం",
    navAbout: "గురించి",

    heroTitle: "ప్రతి రైతుకు డిజిటల్ రికార్డులు",
    heroSubtitle: "మీ ముఖ్యమైన వ్యవసాయ మరియు వ్యక్తిగత పత్రాలను డిజిటలైజ్ చేయండి, చక్కగా నిర్వహించండి మరియు సురక్షితంగా భద్రపరచండి.",
    btnLearnHow: "📚 ఎలా చేయాలో నేర్చుకోండి",
    btnManageRecords: "📁 నా రికార్డులు నిర్వహించండి",
    featureDigitize: "📄 పత్రాలను డిజిటలైజ్ చేయండి",
    featureDigitizeDesc: "భూమి కాగితాలు, విత్తన బిల్లులు, పాస్ బుక్కులను మీ మొబైల్ ఫోన్ తో స్పష్టమైన ఫొటోగా మార్చండి.",
    featureOrganize: "🗂️ పత్రాలను క్రమబద్ధీకరించండి",
    featureOrganizeDesc: "భూమి, పంటలు, ఎరువులు మరియు బీమా కాగితాలను సులభమైన ఫోల్డర్లలో ఒకే చోట భద్రపరచండి.",
    featureStore: "🔐 సురక్షితంగా దాచండి",
    featureStoreDesc: "వర్షం, చెదలు, అగ్నిప్రమాదాలు లేదా కాగితాలు పోకుండా మీ ఫోన్ లో భద్రంగా ఉంచుకోండి.",

    whyTitle: "డిజిటల్ రికార్డులు ఎందుకు అవసరం?",
    whySubtitle: "ఫోన్ లో రికార్డులు ఉంచుకోవడం వల్ల వ్యవసాయ పనులు సులువవుతాయి మరియు పత్రాలు సురక్షితంగా ఉంటాయి.",
    benefit1Title: "ముఖ్యమైన కాగితాలు పోకుండా కాపాడుతుంది",
    benefit1Desc: "కాగితాలు తడిసిపోవడం, చెదలు పట్టడం లేదా పోవడం జరగవచ్చు. డిజిటల్ కాపీ ఎల్లప్పుడూ భద్రంగా ఉంటుంది.",
    benefit2Title: "అవసరమైనప్పుడు సులభంగా వెతకవచ్చు",
    benefit2Desc: "పాత కాగితాల కోసం వెతకాల్సిన పనిలేకుండా, సెకన్లలో మీ ఫోన్ లో చూసుకోవచ్చు.",
    benefit3Title: "కాగితాలపై ఆధారపడటం తగ్గుతుంది",
    benefit3Desc: "మీరు ఎక్కడికి వెళ్ళినా మీ భూమి మరియు వ్యవసాయ రసీదులను జేబులోనే ఫోన్ లో తీసుకెళ్లవచ్చు.",
    benefit4Title: "వ్యవసాయ సమాచారం క్రమంగా ఉంటుంది",
    benefit4Desc: "విత్తనాల బిల్లులు, ఎరువుల ఖర్చులు, భూసార పరీక్ష వివరాలు ఏళ్ళ తరబడి భద్రంగా ఉంటాయి.",
    benefit5Title: "ఫోన్ లేదా కంప్యూటర్ నుండి సులభంగా చూడవచ్చు",
    benefit5Desc: "మీ ఆండ్రాయిడ్ ఫోన్, ట్యాబ్లెట్ లేదా మీసేవ కేంద్రం నుంచి ఎప్పుడైనా మీ పత్రాలు పొందవచ్చు.",
    benefit6Title: "డిజిటల్ భద్రతపై అవగాహన పెరుగుతుంది",
    benefit6Desc: "ఓటీపీ ఎవరికీ చెప్పకూడదని, నకిలీ లింకులను క్లిక్ చేయకూడదని నేర్చుకోవచ్చు.",

    whatTitle: "రైతులు ఏయే రికార్డులను డిజిటలైజ్ చేయవచ్చు?",
    whatSubtitle: "మీ స్మార్ట్ ఫోన్ లో సురక్షితంగా భద్రపరచుకోగల పత్రాల వివరాలు చూడండి.",
    tabAgri: "వ్యవసాయ రికార్డులు (10)",
    tabPersonal: "వ్యక్తిగత రికార్డులు (5)",
    safetyBannerTitle: "⚠️ ముఖ్యమైన భద్రత మరియు గోప్యతా హెచ్చరిక",
    safetyBannerText: "ఇది అవగాహన మరియు డెమో కొరకు రూపొందించబడిన పోర్టల్. నిజమైన ప్రభుత్వ పనుల కోసం మీసేవ, పీఎం-కిసాన్, లేదా డిజిలాకర్ వంటి అధికారిక వెబ్‌సైట్లను మాత్రమే ఉపయోగించండి. అసలు ఆధార్ కార్డులు లేదా బ్యాంక్ పిన్ నంబర్లను ఎప్పుడూ ఇతరులకు ఇవ్వకండి.",

    guideTitle: "పత్రాన్ని డిజిటలైజ్ చేయడం ఎలా?",
    guideSubtitle: "మీ స్మార్ట్ ఫోన్ కెమెరాతో ఈ 6 సులభమైన దశలను అనుసరించండి.",
    step1Title: "దశ 1: స్పష్టమైన ఫోటో లేదా స్కాన్ తీయండి",
    step1Desc: "కాగితాన్ని వెలుతురు ఉన్న చదునైన ప్రదేశంలో ఉంచండి. నీడ పడకుండా రెండు చేతులతో ఫోన్ పట్టుకుని ఫోటో తీయండి.",
    step2Title: "దశ 2: అక్షరాలు స్పష్టంగా ఉన్నాయో లేదో చూడండి",
    step2Desc: "ఫోటోను జూమ్ చేసి సర్వే నంబర్లు, పేర్లు, తేదీలు మరియు స్టాంపులు స్పష్టంగా కనిపిస్తున్నాయా లేదా సరిచూడండి.",
    step3Title: "దశ 3: ఫైలుకు సరైన పేరు పెట్టండి",
    step3Desc: "'IMG_001' అని కాకుండా 'Pahani_Survey142_2026.pdf' లాంటి సులభమైన పేరు ఇవ్వండి.",
    step4Title: "దశ 4: సరైన వర్గాన్ని ఎంచుకోండి",
    step4Desc: "భూమి, పంట, ఎరువులు లేదా బీమా వంటి సరైన ఫోల్డర్ లో ఆ పత్రాన్ని చేర్చండి.",
    step5Title: "దశ 5: సురక్షితమైన చోట భద్రపరచండి",
    step5Desc: "మీ ఫోన్ సురక్షిత ఫోల్డర్ లో లేదా ప్రభుత్వం ఆమోదించిన డిజిలాకర్ లో భద్రపరచండి.",
    step6Title: "దశ 6: బ్యాకప్ ఉంచుకోండి",
    step6Desc: "ఒక కాపీని మీ నమ్మకమైన కుటుంబ సభ్యులకు పంపండి లేదా మెమరీ కార్డు / పెన్ డ్రైవ్ లో దాచుకోండి.",

    organizerTitle: "డిజిటల్ రికార్డుల ఆర్గనైజర్ (డెమో)",
    organizerSubtitle: "నమూనా రైతు పత్రాలతో పత్రాలను చూడటం, నిర్వహించడం ప్రాక్టీస్ చేయండి.",
    searchPlaceholder: "పత్రం పేరు, సర్వే నంబర్ లేదా పంట పేరుతో వెతకండి...",
    allCategories: "అన్ని వర్గాలు",
    allTypes: "అన్ని ఫైల్ రకాలు",
    btnAddRecord: "+ కొత్త డెమో రికార్డును చేర్చండి",
    colName: "పత్రం పేరు",
    colCategory: "వర్గం",
    colDate: "చేర్చిన తేదీ",
    colType: "ఫైల్ రకం",
    colStatus: "స్థితి",
    colActions: "చర్యలు",
    btnView: "చూడండి",
    btnDownload: "డౌన్‌లోడ్",
    btnDelete: "తొలగించు",
    statusVerified: "ధృవీకరించబడింది",
    statusPending: "పరిశీలనలో ఉంది",
    statusArchived: "భద్రపరిచింది",
    noRecordsFound: "మీరు వెతికిన పత్రాలు ఏవీ కనబడలేదు. మళ్లీ ప్రయత్నించండి.",

    safetyTitle: "ఆన్‌లైన్ లో సురక్షితంగా ఉండండి",
    safetySubtitle: "రైతులు తమ డబ్బును, పత్రాలను కాపాడుకోవడానికి గుర్తుంచుకోవాల్సిన ముఖ్యమైన నియమాలు.",
    ruleOtpTitle: "ఓటీపీ (OTP) ఎవరితోనూ పంచుకోవద్దు",
    ruleOtpDesc: "బ్యాంక్ మేనేజర్ లేదా వ్యవసాయ అధికారి అని ఎవరు ఫోన్ చేసినా, మీ ఫోన్‌కు వచ్చే 4 లేదా 6 అంకెల ఓటీపీని ఎట్టి పరిస్థితుల్లోనూ చెప్పవద్దు.",
    rulePasswordTitle: "పాస్‌వర్డ్‌లు, ఏటీఎం పిన్ ఎవరికీ చెప్పవద్దు",
    rulePasswordDesc: "మీ ఏటీఎం పిన్ మీ డబ్బుకు తాళం చెవి లాంటిది. దానిని ఇతరులకు చెప్పకండి, కాగితాలపై రాసి ఉంచకండి.",
    ruleStrongPassTitle: "బలమైన పాస్‌వర్డ్ ఉపయోగించండి",
    ruleStrongPassDesc: "'123456' లేదా పుట్టిన సంవత్సరం కాకుండా, అక్షరాలు, సంఖ్యలు కలిపి పాస్‌వర్డ్ పెట్టండి.",
    ruleLinksTitle: "అనుమానాస్పద లింకులను క్లిక్ చేయవద్దు",
    ruleLinksDesc: "'ఉచితంగా ట్రాక్టర్ సబ్సిడీ' లేదా 'రూ. 50,000 నగదు బహుమతి' అంటూ వాట్సాప్ లేదా ఎస్ఎంఎస్ లో వచ్చే లింకులను నమ్మకండి.",
    ruleVerifyWebTitle: "వెబ్‌సైట్ చిరునామా సరిచూసుకోండి",
    ruleVerifyWebDesc: "అధికారిక ప్రభుత్వ వెబ్‌సైట్లు సాధారణంగా '.gov.in' లేదా '.nic.in' తో ముగుస్తాయి మరియు తాళం గుర్తు (🔒) ఉంటుంది.",
    ruleUnknownSiteTitle: "తెలియని వెబ్‌సైట్లలో పత్రాలు అప్‌లోడ్ చేయవద్దు",
    ruleUnknownSiteDesc: "అనుమతి లేని యాప్‌లలో లేదా సోషల్ మీడియాలో మీ పాస్ బుక్ లేదా గుర్తింపు కార్డులు పెట్టవద్దు.",
    ruleBackupTitle: "ముఖ్యమైన రికార్డులకు బ్యాకప్ ఉంచుకోండి",
    ruleBackupDesc: "ఫోన్ పోయినా లేదా పాడైనా పత్రాలు పోకుండా మెమరీ కార్డులో కాపీ ఉంచుకోండి.",
    ruleSharedLogoutTitle: "ఇంటర్నెట్ సెంటర్లలో లాగౌట్ చేయండి",
    ruleSharedLogoutDesc: "మీసేవ లేదా నెట్ సెంటర్ లో పని పూర్తయిన తర్వాత తప్పనిసరిగా 'Log Out' చేసి కిటికీ మూసివేయండి.",

    awarenessTitle: "రైతు అవగాహన కార్యక్రమం",
    awarenessSubtitle: "గ్రామాలలో రైతుల కోసం రూపొందించిన 4-దశల ప్రత్యక్ష ప్రదర్శన కార్యక్రమం.",
    stage1Title: "దశ 1 – అవగాహన కల్పించడం",
    stage1Desc: "గ్రామ సభలో కాగితాలు ఎలా పాడవుతాయో, డిజిటల్ పత్రాలు పంట రుణాల సమయంలో ఎంత ఉపయోగపడతాయో వివరించడం.",
    stage2Title: "దశ 2 – ప్రత్యక్ష ప్రదర్శన",
    stage2Desc: "రైతులకు వారి ఫోన్ కెమెరాతో నీడలు పడకుండా స్పష్టంగా కాగితాలను ఫోటో తీయడం చూపించడం.",
    stage3Title: "దశ 3 – చేతులతో ప్రాక్టీస్",
    stage3Desc: "విత్తన రసీదులు, ఎరువుల బిల్లులు, బీమా పత్రాలను వేర్వేరు ఫోల్డర్లలో భద్రపరచడం ప్రాక్టీస్ చేయించడం.",
    stage4Title: "దశ 4 – భద్రతా శిక్షణ",
    stage4Desc: "నకిలీ ఫోన్ కాల్స్ గుర్తించడం, ఓటీపీ ఎవరికీ చెప్పకపోవడం, వ్యక్తిగత సమాచారం కాపాడుకోవడం నేర్పించడం.",
    btnStartLearning: "నేర్చుకోవడం ప్రారంభించండి",

    quizTitle: "సరదా క్విజ్ & డిజిటల్ భద్రతా పరీక్ష",
    quizSubtitle: "సులభమైన ప్రశ్నలతో మీ డిజిటల్ భద్రతా పరిజ్ఞానాన్ని పరీక్షించుకోండి. రైతు డిజిటల్ బ్యాడ్జ్ పొందండి!",
    quizQuestionPrefix: "ప్రశ్న",
    btnNext: "తర్వాతి ప్రశ్న",
    btnTryAgain: "మళ్లీ ప్రయత్నించండి",
    btnGetBadge: "భద్రతా బ్యాడ్జ్ డౌన్‌లోడ్ చేసుకోండి",
    quizCompleteTitle: "అభినందనలు! మీకు డిజిటల్ భద్రతపై చక్కని అవగాహన ఉంది!",

    dashboardTitle: "రైతు డాష్‌బోర్డ్ సారాంశం",
    dashboardSubtitle: "వర్గీకరించిన పత్రాలు మరియు వ్యవసాయ రికార్డుల శీఘ్ర పరిశీలన.",
    totalRecords: "మొత్తం రికార్డులు",
    agriRecords: "వ్యవసాయ రికార్డులు",
    personalRecords: "వ్యక్తిగత రికార్డులు",
    otherRecords: "ఇతర రికార్డులు",

    farmerProfileTitle: "నమూనా రైతు ప్రొఫైల్",
    farmerName: "రైతు పేరు: రమేష్",
    farmerFarm: "పొలం: గ్రీన్ వ్యాలీ ఫార్మ్",
    farmerLocation: "ప్రాంతం: గుంటూరు, ఆంధ్రప్రదేశ్",
    farmerCrops: "ప్రధాన పంటలు: వరి, మిరప, పత్తి",

    aboutTitle: "ఈ ప్రాజెక్ట్ గురించి",
    aboutP1: "ముఖ్యమైన వ్యవసాయ మరియు వ్యక్తిగత పత్రాలను ఎలా డిజిటలైజ్ చేయాలి, ఎలా భద్రపరచాలి అని రైతులకు నేర్పించడం ద్వారా వారిలో డిజిటల్ అవగాహన పెంచడమే ఈ ప్రాజెక్ట్ ముఖ్య ఉద్దేశం.",
    aboutP2: "గ్రామీణ రైతు సమాజం కోసం ప్రత్యేకంగా రూపొందించబడిన ఈ ప్రాజెక్ట్ డిజిటల్ అక్షరాస్యత, వ్యవసాయ రికార్డుల నిర్వహణ, పత్రాల భద్రత మరియు గ్రామాల్లో ప్రత్యక్ష ప్రదర్శనలను సమన్వయం చేస్తుంది.",

    textToSpeech: "వినండి (ఆడియో)",
    close: "మూసివేయండి"
  },

  hi: {
    appName: "किसान डिजिटल रिकॉर्ड पोर्टल",
    tagline: "हर किसान के लिए सरल और सुरक्षित डिजिटल रिकॉर्ड",
    navHome: "होम",
    navLearn: "सीखें",
    navRecords: "मेरे रिकॉर्ड",
    navSafety: "सुरक्षा",
    navAwareness: "जागरूकता कार्यक्रम",
    navAbout: "परिचय",

    heroTitle: "हर किसान के लिए डिजिटल रिकॉर्ड",
    heroSubtitle: "अपने महत्वपूर्ण कृषि और व्यक्तिगत दस्तावेजों को डिजिटाइज़ करें, व्यवस्थित करें और सुरक्षित रखें।",
    btnLearnHow: "📚 सीखें कैसे करें",
    btnManageRecords: "📁 मेरे रिकॉर्ड प्रबंधित करें",
    featureDigitize: "📄 रिकॉर्ड डिजिटाइज़ करें",
    featureDigitizeDesc: "जमीन के कागज, खाद-बीज के बिल और पासबुक को अपने फोन से साफ फोटो में बदलें।",
    featureOrganize: "🗂️ दस्तावेज व्यवस्थित करें",
    featureOrganizeDesc: "जमीन, फसल, खाद और बीमा के दस्तावेजों को अलग-अलग आसान फोल्डर में रखें।",
    featureStore: "🔐 सुरक्षित संग्रह",
    featureStoreDesc: "कागजातों को पानी, दीमक, आग या खोने से बचाने के लिए फोन में सुरक्षित रखें।",

    whyTitle: "डिजिटल रिकॉर्ड क्यों जरूरी हैं?",
    whySubtitle: "फोन में रिकॉर्ड रखने से खेती के काम आसान होते हैं और कागजात हमेशा सुरक्षित रहते हैं।",
    benefit1Title: "कागजात खोने से बचाएं",
    benefit1Desc: "कागजी दस्तावेज बारिश में भीगने, दीमक लगने या खोने का डर रहता है। डिजिटल कॉपी हमेशा सुरक्षित रहती है।",
    benefit2Title: "जरूरत पड़ने पर तुरंत खोजें",
    benefit2Desc: "अलमारी में पुराने बिल ढूंढने की जरूरत नहीं, सेकंडों में अपने मोबाइल पर देखें।",
    benefit3Title: "कागजों पर निर्भरता कम करें",
    benefit3Desc: "कहीं भी जाएं, अपने खेत और जमीन के रिकॉर्ड अपनी जेब में फोन में साथ रखें।",
    benefit4Title: "कृषि जानकारी व्यवस्थित रखें",
    benefit4Desc: "बीज खरीद रसीद, खाद के बिल और मिट्टी जांच रिपोर्ट वर्षों तक संभाल कर रखें।",
    benefit5Title: "फोन या कंप्यूटर से कभी भी देखें",
    benefit5Desc: "अपने एंड्रॉयड फोन, टैबलेट या सीएससी केंद्र से किसी भी समय दस्तावेज प्राप्त करें।",
    benefit6Title: "डिजिटल सुरक्षा के प्रति जागरूक बनें",
    benefit6Desc: "ओटीपी किसी को न देना, बैकअप रखना और फर्जी संदेशों से बचना सीखें।",

    whatTitle: "किसान कौन-से रिकॉर्ड डिजिटाइज़ कर सकते हैं?",
    whatSubtitle: "अपने स्मार्टफोन में सुरक्षित रखे जा सकने वाले दस्तावेजों की सूची देखें।",
    tabAgri: "कृषि संबंधी रिकॉर्ड (10)",
    tabPersonal: "व्यक्तिगत रिकॉर्ड (5)",
    safetyBannerTitle: "⚠️ महत्वपूर्ण सुरक्षा एवं गोपनीयता सूचना",
    safetyBannerText: "यह एक जागरूकता और डेमो पोर्टल है। वास्तविक सरकारी सेवाओं के लिए केवल आधिकारिक सरकारी पोर्टल (जैसे पीएम-किसान, डिजीलॉकर) का उपयोग करें। अनजानी वेबसाइटों पर मूल आधार या बैंक पिन कभी न डालें।",

    guideTitle: "दस्तावेज़ को कैसे डिजिटाइज़ करें?",
    guideSubtitle: "अपने फोन कैमरे से इन 6 आसान चरणों का पालन करें।",
    step1Title: "चरण 1: साफ फोटो या स्कैन लें",
    step1Desc: "कागज को समतल सतह पर अच्छी रोशनी में रखें। फोन को दोनों हाथों से स्थिर पकड़ें ताकि छाया न पड़े।",
    step2Title: "चरण 2: जांचें कि लिखावट साफ दिख रही है",
    step2Desc: "फोटो को जूम करके देखें कि खसरा/सर्वे नंबर, नाम, तारीख और मुहर स्पष्ट दिखाई दे रही है।",
    step3Title: "चरण 3: फाइल को सही नाम दें",
    step3Desc: "'IMG_123' के स्थान पर 'Khasra_Survey142_2026.pdf' जैसा सरल और स्पष्ट नाम दें।",
    step4Title: "चरण 4: सही श्रेणी चुनें",
    step4Desc: "दस्तावेज को सही फोल्डर जैसे जमीन, फसल, खाद-बीज या बीमा में रखें।",
    step5Title: "चरण 5: सुरक्षित स्थान पर सहेजें",
    step5Desc: "अपने फोन के सुरक्षित फोल्डर या अधिकृत डिजीलॉकर में सहेजें।",
    step6Title: "चरण 6: बैकअप रखें",
    step6Desc: "एक प्रति परिवार के विश्वसनीय सदस्य को भेजें या मेमोरी कार्ड / पेन ड्राइव में सुरक्षित रखें।",

    organizerTitle: "डिजिटल रिकॉर्ड प्रबंधक (डेमो)",
    organizerSubtitle: "नमूना किसान दस्तावेजों के साथ रिकॉर्ड देखना और छांटना सीखें।",
    searchPlaceholder: "दस्तावेज़ का नाम, खसरा नंबर या फसल से खोजें...",
    allCategories: "सभी श्रेणियां",
    allTypes: "सभी फाइल प्रकार",
    btnAddRecord: "+ नया डेमो रिकॉर्ड जोड़ें",
    colName: "दस्तावेज़ का नाम",
    colCategory: "श्रेणी",
    colDate: "जोड़ने की तारीख",
    colType: "फाइल प्रकार",
    colStatus: "स्थिति",
    colActions: "कार्रवाई",
    btnView: "देखें",
    btnDownload: "डाउनलोड",
    btnDelete: "हटाएं",
    statusVerified: "सत्यापित",
    statusPending: "प्रक्रियाधीन",
    statusArchived: "संग्रहीत",
    noRecordsFound: "आपके खोजे गए मापदंड से कोई रिकॉर्ड नहीं मिला।",

    safetyTitle: "ऑनलाइन सुरक्षित रहें",
    safetySubtitle: "हर किसान को अपने पैसे और दस्तावेजों की सुरक्षा के लिए ये नियम जरूर याद रखने चाहिए।",
    ruleOtpTitle: "ओटीपी (OTP) किसी को न बताएं",
    ruleOtpDesc: "बैंक मैनेजर या कृषि अधिकारी बनकर कोई भी फोन करे, अपने फोन पर आया 4 या 6 अंकों का ओटीपी कभी न बताएं।",
    rulePasswordTitle: "पासवर्ड या एटीएम पिन कभी साझा न करें",
    rulePasswordDesc: "आपका एटीएम पिन आपकी तिजोरी की चाबी है। इसे किसी को न बताएं और न ही कागज पर लिखकर रखें।",
    ruleStrongPassTitle: "मजबूत पासवर्ड बनाएं",
    ruleStrongPassDesc: "'123456' या जन्म वर्ष जैसा आसान पासवर्ड न रखें। अक्षरों और अंकों का मिश्रण बनाएं।",
    ruleLinksTitle: "संदिग्ध लिंक पर क्लिक न करें",
    ruleLinksDesc: "'मुफ्त ट्रैक्टर योजना' या '₹50,000 सीधे खाते में' जैसे लालच भरे व्हाट्सएप या एसएमएस लिंक पर क्लिक न करें।",
    ruleVerifyWebTitle: "वेबसाइट की जांच करें",
    ruleVerifyWebDesc: "सरकारी वेबसाइट के अंत में '.gov.in' या '.nic.in' होता है और ताले (🔒) का निशान होता है।",
    ruleUnknownSiteTitle: "अनजान वेबसाइट पर दस्तावेज न डालें",
    ruleUnknownSiteDesc: "किसी भी गैर-सरकारी या अनजान ऐप पर अपनी जमीन के कागजात या बैंक पासबुक अपलोड न करें।",
    ruleBackupTitle: "जरूरी रिकॉर्ड का बैकअप रखें",
    ruleBackupDesc: "फोन खोने या खराब होने पर भी दस्तावेज सुरक्षित रहें, इसलिए मेमोरी कार्ड में कॉपी रखें।",
    ruleSharedLogoutTitle: "साझा कंप्यूटर से लॉगआउट करें",
    ruleSharedLogoutDesc: "गांव के सीएससी या साइबर कैफे में काम खत्म होने के बाद हमेशा 'Log Out' करें और ब्राउज़र बंद करें।",

    awarenessTitle: "किसान जागरूकता कार्यक्रम",
    awarenessSubtitle: "प्रदर्शन के माध्यम से सीखें — ग्रामीण चौपाल और किसान गोष्ठियों के लिए 4-चरणीय कार्यक्रम।",
    stage1Title: "चरण 1 – जागरूकता",
    stage1Desc: "किसानों को समझाना कि कैसे कागज खराब होते हैं और डिजिटल रिकॉर्ड से बैंक लोन में कितनी मदद मिलती है।",
    stage2Title: "चरण 2 – सीधा प्रदर्शन",
    stage2Desc: "किसानों को फोन से बिना परछाई के स्पष्ट फोटो और स्कैन लेना सिखाना।",
    stage3Title: "चरण 3 – स्वयं अभ्यास",
    stage3Desc: "बीज रसीद, खाद बिल और बीमा पॉलिसी को अलग-अलग फोल्डर में रखना सिखाना।",
    stage4Title: "चरण 4 – सुरक्षा प्रशिक्षण",
    stage4Desc: "फर्जी कॉल पहचानना, ओटीपी न देना और ऑनलाइन धोखाधड़ी से बचना सिखाना।",
    btnStartLearning: "सीखना शुरू करें",

    quizTitle: "इंटरएक्टिव लर्निंग एवं सुरक्षा क्विज़",
    quizSubtitle: "सरल प्रश्नों से अपनी डिजिटल सुरक्षा की जांच करें और किसान डिजिटल सुरक्षा बैज प्राप्त करें!",
    quizQuestionPrefix: "प्रश्न",
    btnNext: "अगला प्रश्न",
    btnTryAgain: "पुनः प्रयास करें",
    btnGetBadge: "सुरक्षा बैज डाउनलोड करें",
    quizCompleteTitle: "बहुत बढ़िया! आप डिजिटल सुरक्षा को अच्छी तरह समझते हैं!",

    dashboardTitle: "किसान अवलोकन डैशबोर्ड",
    dashboardSubtitle: "वर्गीकृत दस्तावेजों और कृषि रिकॉर्ड का संक्षिप्त विवरण।",
    totalRecords: "कुल रिकॉर्ड",
    agriRecords: "कृषि रिकॉर्ड",
    personalRecords: "व्यक्तिगत रिकॉर्ड",
    otherRecords: "अन्य रिकॉर्ड",

    farmerProfileTitle: "नमूना किसान प्रोफाइल",
    farmerName: "किसान का नाम: रमेश",
    farmerFarm: "खेत: ग्रीन वैली फार्म",
    farmerLocation: "स्थान: गुंटूर, आंध्र प्रदेश",
    farmerCrops: "मुख्य फसलें: धान (चावल), मिर्च, कपास",

    aboutTitle: "इस परियोजना के बारे में",
    aboutP1: "इस परियोजना का उद्देश्य किसानों को अपने महत्वपूर्ण कृषि और व्यक्तिगत दस्तावेजों को डिजिटाइज़, व्यवस्थित और सुरक्षित रखना सिखाकर डिजिटल साक्षरता बढ़ाना है।",
    aboutP2: "यह विशेष रूप से ग्रामीण किसानों के लिए तैयार किया गया है, जिसमें सरल भाषा, व्यावहारिक प्रदर्शन और डिजिटल सुरक्षा के नियम शामिल हैं।",

    textToSpeech: "ऑडियो में सुनें",
    close: "बंद करें"
  }
};
