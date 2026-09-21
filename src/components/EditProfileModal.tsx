import React, { useState } from 'react';
import { 
  X, Check, Plus, User, MapPin, Building, 
  Sprout, Phone, ShieldCheck, RefreshCw, Save, Sparkles 
} from 'lucide-react';
import { FarmerProfile, Language } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmerProfile;
  onSave: (updated: FarmerProfile) => void;
  currentLang: Language;
}

const COMMON_CROPS = [
  { en: "Rice", te: "వరి (Rice)", hi: "चावल (Rice)" },
  { en: "Cotton", te: "పత్తి (Cotton)", hi: "कपास (Cotton)" },
  { en: "Chilli", te: "మిరప (Chilli)", hi: "मिर्च (Chilli)" },
  { en: "Wheat", te: "గోధుమ (Wheat)", hi: "गेहूं (Wheat)" },
  { en: "Maize", te: "మొక్కజొన్న (Maize)", hi: "मक्का (Maize)" },
  { en: "Groundnut", te: "వేరుశనగ (Groundnut)", hi: "मूंगफली (Groundnut)" },
  { en: "Tomato", te: "టమోటా (Tomato)", hi: "टमाटर (Tomato)" },
  { en: "Sugarcane", te: "చెరకు (Sugarcane)", hi: "गन्ना (Sugarcane)" },
  { en: "Turmeric", te: "పసుపు (Turmeric)", hi: "हल्दी (Turmeric)" },
  { en: "Pulses", te: "పప్పుధాన్యాలు (Pulses)", hi: "दालें (Pulses)" }
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  currentLang
}) => {
  const [formData, setFormData] = useState<FarmerProfile>({ ...profile });
  const [customCrop, setCustomCrop] = useState('');

  if (!isOpen) return null;

  const handleGenerateId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = (formData.state.slice(0, 2) || 'IN').toUpperCase();
    const distPrefix = (formData.district.slice(0, 3) || 'FARM').toUpperCase();
    setFormData(prev => ({
      ...prev,
      kisanId: `${prefix}-${distPrefix}-2026-${randomNum}`
    }));
  };

  const handleToggleCrop = (cropName: string) => {
    setFormData(prev => {
      const exists = prev.mainCrops.includes(cropName);
      return {
        ...prev,
        mainCrops: exists 
          ? prev.mainCrops.filter(c => c !== cropName)
          : [...prev.mainCrops, cropName]
      };
    });
  };

  const handleAddCustomCrop = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customCrop.trim();
    if (!trimmed) return;
    if (!formData.mainCrops.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        mainCrops: [...prev.mainCrops, trimmed]
      }));
    }
    setCustomCrop('');
  };

  const handleRemoveCrop = (cropName: string) => {
    setFormData(prev => ({
      ...prev,
      mainCrops: prev.mainCrops.filter(c => c !== cropName)
    }));
  };

  const handleLoadSample = () => {
    setFormData({
      name: currentLang === 'te' ? 'రమేష్' : currentLang === 'hi' ? 'रमेश' : 'Ramesh Kumar',
      farmName: currentLang === 'te' ? 'హరిత వ్యవసాయ క్షేత్రం' : 'Green Valley Farm',
      location: currentLang === 'te' ? 'తెనాలి మండలం' : 'Tenali Mandal',
      district: 'Guntur',
      state: 'Andhra Pradesh',
      mainCrops: ['Rice (వరి)', 'Chilli (మిరప)', 'Cotton (పత్తి)'],
      landAreaAcres: 4.5,
      phoneMasked: '+91 98765 *****',
      kisanId: 'AP-GNT-2026-8841'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      name: formData.name.trim() || 'Farmer',
      farmName: formData.farmName.trim() || 'My Farm',
      location: formData.location.trim() || 'Village / Mandal',
      district: formData.district.trim() || 'District',
      state: formData.state.trim() || 'State',
      landAreaAcres: Number(formData.landAreaAcres) >= 0 ? Number(formData.landAreaAcres) : 0,
      kisanId: formData.kisanId.trim() || 'KL-NEW-0000'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-stone-900 rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 my-8 border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1.5 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {currentLang === 'te' ? 'రైతు వివరాలు పూరించండి' : currentLang === 'hi' ? 'किसान विवरण भरें' : 'Fill Farmer & Farm Details'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              {currentLang === 'te' ? 'రైతు ప్రొఫైల్ సవరణ' : currentLang === 'hi' ? 'किसान प्रोफाइल संपादन' : 'Edit Farmer Profile'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          
          {/* Quick Demo Fill Button */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <span>
              {currentLang === 'te' 
                ? 'శీఘ్ర పరీక్ష కోసం నమూనా డేటాను ఉపయోగించాలా?' 
                : currentLang === 'hi' 
                ? 'त्वरित परीक्षण के लिए नमूना डेटा उपयोग करें?' 
                : 'Need quick sample details for demonstration?'}
            </span>
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold rounded-lg transition cursor-pointer"
            >
              {currentLang === 'te' ? 'నమూనా నింపండి' : currentLang === 'hi' ? 'नमूना भरें' : 'Autofill Sample'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Farmer Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span>{currentLang === 'te' ? 'రైతు పేరు (Name)' : currentLang === 'hi' ? 'किसान का नाम' : 'Farmer Name'} *</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh / రమేష్"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
              />
            </div>

            {/* Farm Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-emerald-700" />
                <span>{currentLang === 'te' ? 'పొలం / ఫార్మ్ పేరు' : currentLang === 'hi' ? 'खेत का नाम' : 'Farm Name'}</span>
              </label>
              <input
                type="text"
                value={formData.farmName}
                onChange={e => setFormData({ ...formData, farmName: e.target.value })}
                placeholder="e.g. Green Valley Farm"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
              />
            </div>

            {/* Land Area in Acres */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                <span>{currentLang === 'te' ? 'భూమి విస్తీర్ణం (ఎకరాలు)' : currentLang === 'hi' ? 'भूमि का क्षेत्रफल (एकड़)' : 'Land Area (Acres)'} *</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.landAreaAcres}
                onChange={e => setFormData({ ...formData, landAreaAcres: parseFloat(e.target.value) || 0 })}
                placeholder="e.g. 4.5"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
              />
            </div>

            {/* Kisan ID / ID */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{currentLang === 'te' ? 'కిసాన్ ID' : currentLang === 'hi' ? 'किसान आईडी' : 'Kisan / Farmer ID'}</span>
                </span>
                <button
                  type="button"
                  onClick={handleGenerateId}
                  className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{currentLang === 'te' ? 'ఆటో జనరేట్' : 'Auto-Gen'}</span>
                </button>
              </label>
              <input
                type="text"
                value={formData.kisanId}
                onChange={e => setFormData({ ...formData, kisanId: e.target.value })}
                placeholder="e.g. AP-GNT-2026-8841"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition font-mono"
              />
            </div>
          </div>

          {/* Location details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{currentLang === 'te' ? 'గ్రామం / మండలం' : currentLang === 'hi' ? 'गांव / मंडल' : 'Village / Mandal'}</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Tenali Mandal"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                {currentLang === 'te' ? 'జిల్లా (District)' : currentLang === 'hi' ? 'जिला (District)' : 'District'}
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={e => setFormData({ ...formData, district: e.target.value })}
                placeholder="e.g. Guntur"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                {currentLang === 'te' ? 'రాష్ట్రం (State)' : currentLang === 'hi' ? 'राज्य (State)' : 'State'}
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={e => setFormData({ ...formData, state: e.target.value })}
                placeholder="e.g. Andhra Pradesh"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
              />
            </div>
          </div>

          {/* Main Farm Crops Section */}
          <div className="pt-2 border-t border-stone-100">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
              {currentLang === 'te' ? 'ప్రధాన పంటలు ఎంచుకోండి (Select Main Crops)' : currentLang === 'hi' ? 'मुख्य फसलें चुनें (Select Crops)' : 'Select Main Farm Crops'}
            </label>
            
            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {COMMON_CROPS.map((crop, idx) => {
                const cropLabel = currentLang === 'te' ? crop.te : currentLang === 'hi' ? crop.hi : crop.en;
                const isSelected = formData.mainCrops.includes(cropLabel) || formData.mainCrops.includes(crop.en);
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleToggleCrop(cropLabel)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-700 text-white shadow-xs' 
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-stone-400" />}
                    <span>{cropLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Crop Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customCrop}
                onChange={e => setCustomCrop(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomCrop();
                  }
                }}
                placeholder={currentLang === 'te' ? 'మరొక పంట పేరు టైప్ చేసి జోడించండి...' : currentLang === 'hi' ? 'अन्य फसल का नाम लिखकर जोड़ें...' : 'Type another crop name and add...'}
                className="flex-1 px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
              />
              <button
                type="button"
                onClick={() => handleAddCustomCrop()}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                + {currentLang === 'te' ? 'జోడించు' : currentLang === 'hi' ? 'जोड़ें' : 'Add'}
              </button>
            </div>

            {/* Currently Selected Crops List */}
            <div className="mt-3 min-h-[36px] p-2 bg-stone-50 rounded-xl border border-stone-200 flex flex-wrap gap-1.5 items-center">
              {formData.mainCrops.length > 0 ? (
                formData.mainCrops.map((crop, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-bold border border-emerald-300"
                  >
                    <span>{crop}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCrop(crop)}
                      className="text-emerald-700 hover:text-rose-600 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-xs text-stone-400 italic px-1">
                  {currentLang === 'te' ? 'ఇంకా ఏ పంటలు ఎంచుకోలేదు' : currentLang === 'hi' ? 'कोई फसल चयनित नहीं है' : 'No crops selected yet'}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-sm transition cursor-pointer"
            >
              {currentLang === 'te' ? 'రద్దు చేయి' : currentLang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{currentLang === 'te' ? 'వివరాలు భద్రపరచండి' : currentLang === 'hi' ? 'विवरण सुरक्षित करें' : 'Save Details'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
