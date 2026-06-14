import React, { useState, useEffect } from 'react';
import { MoodCard, MoodType, PrescriptionType } from './types';
import { SAMPLE_CARDS, generateComfortMessage, MOODS } from './moodData';
import RandomQuote from './components/RandomQuote';
import MoodCardForm from './components/MoodCardForm';
import MoodCardViewer from './components/MoodCardViewer';
import { 
  Heart, 
  Trash2, 
  Sparkles, 
  FileStack, 
  BookmarkCheck, 
  FolderHeart, 
  Eye, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // State managers
  const [savedCards, setSavedCards] = useState<MoodCard[]>([]);
  const [activeMood, setActiveMood] = useState<MoodType>('지침');
  const [activePrescription, setActivePrescription] = useState<PrescriptionType>('짧은 위로');
  const [generatedCard, setGeneratedCard] = useState<MoodCard | null>(null);
  const [viewingCard, setViewingCard] = useState<MoodCard | null>(null);
  const [isSavedCurrent, setIsSavedCurrent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mood_cards_prescriptions');
      if (stored) {
        setSavedCards(JSON.parse(stored));
      }
    } catch (e) {
      console.error('로컬 저장소 데이터를 불러오는 도중 오류 발생:', e);
    }
  }, []);

  // Save to local storage helper
  const saveToLocalStorage = (cards: MoodCard[]) => {
    try {
      localStorage.setItem('mood_cards_prescriptions', JSON.stringify(cards));
      setSavedCards(cards);
    } catch (e) {
      console.error('로컬 저장소 저장 실패:', e);
      triggerToast('보관 용량이 부족하거나 원활치 않아 카드 보관에 실패했습니다.');
    }
  };

  // Toast micro notification trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // 1. Core Action: Mood Card Generation
  const handleGenerateCard = (data: {
    mood: MoodType;
    prescription: PrescriptionType;
    story: string;
    wishText: string;
    smallAction: string;
  }) => {
    // Generate clean date label
    const now = new Date();
    const dateLabel = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}`;

    const cardId = `card-${Date.now()}`;
    const generatedComfort = generateComfortMessage(data.mood, data.prescription);

    const newCard: MoodCard = {
      id: cardId,
      date: dateLabel,
      mood: data.mood,
      prescription: data.prescription,
      story: data.story,
      wishText: data.wishText,
      smallAction: data.smallAction,
      comfortMessage: generatedComfort,
      colorTheme: '' // Associated dynamically by mood style mapping
    };

    setGeneratedCard(newCard);
    setIsSavedCurrent(false);
    triggerToast('🩹 오늘의 기분 처방 카드가 알맞게 조제되었습니다!');
    
    // Smooth auto scroll to the preview on mobile/smaller screens
    setTimeout(() => {
      const previewEl = document.getElementById('preview-mode-card-viewer');
      if (previewEl) {
        previewEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // 2. Core Action: Save Generated Card to local array
  const handleSaveToStorage = () => {
    if (!generatedCard) return;
    
    // Prevent duplicate saves
    if (savedCards.some(card => card.story === generatedCard.story && card.date === generatedCard.date && card.mood === generatedCard.mood)) {
      setIsSavedCurrent(true);
      triggerToast('🌻 이 기분 카드는 이미 보관소에 들어있습니다.');
      return;
    }

    const updated = [generatedCard, ...savedCards];
    saveToLocalStorage(updated);
    setIsSavedCurrent(true);
    triggerToast('✨ 카드가 브라우저의 조용한 감정 보관함에 고이 보관되었습니다.');
  };

  // 3. Core Action: Delete specific card
  const handleDeleteCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering full-card modal view
    const filtered = savedCards.filter(card => card.id !== id);
    saveToLocalStorage(filtered);
    triggerToast('🗑️ 카드가 보관함에서 지워졌습니다.');
  };

  // 4. Core Action: Load example template cards (3 items)
  const handleLoadSampleCards = () => {
    // We unique-fy IDs based on current timestamp to avoid collisions
    const offsetSamples = SAMPLE_CARDS.map((sample, idx) => ({
      ...sample,
      id: `sample-${Date.now()}-${idx}`
    }));

    const updated = [...offsetSamples, ...savedCards];
    saveToLocalStorage(updated);
    triggerToast('🧭 감정 카드 견본 3종이 보관함에 추가되었습니다.');
  };

  // Clear all saved cards
  const handleClearAllCards = () => {
    if (confirm('모든 보관 카드를 정말 지우시겠습니까? 지우시면 복구할 수 없습니다.')) {
      saveToLocalStorage([]);
      triggerToast('🧹 모든 저장 카드가 비워졌습니다.');
    }
  };

  // Quick preset template injection into build-form fields
  const handleResetFormState = () => {
    setGeneratedCard(null);
    setIsSavedCurrent(false);
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 pb-12">
      
      {/* Absolute Toast alert for micro actions */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            id="toast-notification"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white/95 px-5 py-3 rounded-2xl text-xs md:text-sm shadow-xl flex items-center gap-2.5 font-medium border border-slate-800 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Area */}
      <header id="app-header" className="relative pt-12 pb-10 overflow-hidden bg-gradient-to-b from-amber-50/50 via-indigo-50/20 to-transparent">
        <div className="absolute top-0 inset-x-0 h-40 bg-[radial-gradient(#f1f5f9_1.2px,transparent_1.2px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200/60 mb-4 tracking-wide"
          >
            <Heart size={11} className="text-rose-400 fill-rose-300" />
            <span>나만의 다정한 작은 약실 & 감정 처방장</span>
          </motion.div>

          <h1 className="font-sans font-black tracking-tight text-3xl md:text-4xl text-slate-800">
            MOOD_CARD
          </h1>
          <p className="font-diary font-bold text-lg md:text-xl text-slate-700 mt-1 md:mt-2">
            오늘의 기분 처방 카드
          </p>
          <div className="w-12 h-0.5 bg-amber-200 mx-auto mt-4 rounded-full" />
          
          <p className="max-w-lg mx-auto text-xs md:text-sm text-slate-500 font-sans mt-3 leading-relaxed">
            공부, 인간관계, 매일의 일과 속에서 지치거나 흔들릴 때,<br />
            이곳에서 기분을 차분히 적어 두고 나만을 위한 다정안 약봉투 같은 위로 처방 카드를 만들어 보세요.
          </p>
        </div>
      </header>

      {/* Main Container Area */}
      <main id="app-main-content" className="max-w-4xl mx-auto px-4 md:px-6 flex-1 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mt-4 sm:mt-6">
        
        {/* Left column - Build form & Random advice - Spans 7 cols on larger screens */}
        <section id="form-column" className="md:col-span-7 space-y-6">
          <div className="flex items-center gap-2 justify-between px-1">
            <h2 className="font-sans font-extrabold text-[#111827] text-lg flex items-center gap-2">
              <FolderHeart size={18} className="text-slate-700" />
              <span>오늘의 기분 기록하기</span>
            </h2>
          </div>

          <MoodCardForm 
            onGenerate={handleGenerateCard}
            activeMood={activeMood}
            setActiveMood={setActiveMood}
            activePrescription={activePrescription}
            setActivePrescription={setActivePrescription}
          />
        </section>

        {/* Right column - Real-time Preview card sandbox - Spans 5 cols on larger screens */}
        <section id="preview-column" className="md:col-span-5 space-y-8">
          <AnimatePresence mode="out-in">
            {generatedCard ? (
              <motion.div
                key="card-view"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <MoodCardViewer 
                  card={generatedCard}
                  mode="preview"
                  onSave={handleSaveToStorage}
                  onReset={handleResetFormState}
                  isSaved={isSavedCurrent}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] text-center h-full flex flex-col justify-center relative overflow-hidden min-h-[320px]"
              >
                {/* Visual decoration inside placeholder */}
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-400 border border-slate-100">
                  <BookmarkCheck size={24} className="stroke-1 text-slate-400" />
                </div>
                <h4 className="font-sans font-bold text-sm text-slate-700 mb-1">처방 카드 조제 대기 중</h4>
                <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
                  왼쪽 기록장에서 오늘의 기분을 정하고 질문을 적은 뒤 <b className="text-slate-600 font-semibold">만들기 버튼</b>을 누르면, 이곳에 나만을 위한 맞춤형 위로 처방 카드가 나타납니다.
                </p>

                <div className="mt-8 border-t border-slate-100 pt-6 space-y-3">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">마음을 녹이는 대화의 도구</span>
                  <div className="flex flex-wrap justify-center gap-1.5ClassName bg-slate-50">
                    <span className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full border border-slate-100">🍂 소소한 하루 기록</span>
                    <span className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full border border-slate-100">🧸 따뜻한 쉼과 마음 처방</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dedicated Sticky widgets: Random Quote in Right Panel */}
          <div className="pt-2">
            <RandomQuote />
          </div>
        </section>

      </main>

      {/* Directory Section: Saved Cards with substantial margin-top for mobile separation */}
      <section id="saved-cards-directory" className="max-w-4xl mx-auto px-4 md:px-6 w-full mt-16 md:mt-24 space-y-6">
        <div className="border-t border-slate-200/60 pt-8" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div>
            <h3 className="font-sans font-extrabold text-slate-800 text-base flex items-center gap-1.5">
              <FileStack size={18} className="text-slate-700" />
              <span>내가 저장한 기분 카드</span>
              <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/40">
                총 {savedCards.length}장
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">이전에 기록해 둔 소소한 위로와 기분 기록들을 다시 꺼내어 볼 수 있습니다.</p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              id="btn-load-samples"
              onClick={handleLoadSampleCards}
              className="py-1.5 px-3 bg-white hover:bg-slate-50 text-xs font-sans text-slate-600 hover:text-amber-900 rounded-lg border border-slate-200 hover:border-amber-200 transition-all flex items-center gap-1 cursor-pointer font-medium shadow-2xs"
              title="언제든 편하게 볼 수 있는 예시 마음 편지 3종을 보관소에 채웁니다."
            >
              <Sparkles size={11} className="text-amber-500" />
              <span>예시 카드 불러오기</span>
            </button>
            
            {savedCards.length > 0 && (
              <button
                id="btn-clear-all"
                onClick={handleClearAllCards}
                className="py-1.5 px-2.5 bg-red-50 hover:bg-red-100 text-xs font-sans text-red-700 rounded-lg border border-red-100 transition-all cursor-pointer font-medium"
              >
                전체 비우기
              </button>
            )}
          </div>
        </div>

        {/* Saved Cards Container Grid */}
        <AnimatePresence mode="popLayout">
          {savedCards.length === 0 ? (
            <motion.div
              id="empty-saved-placeholder"
              key="empty-saved-placeholder"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-10 py-12 text-center border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.015)]"
            >
              <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-100">
                <FolderHeart size={20} className="stroke-1" />
              </div>
              <p className="text-slate-500 font-sans text-xs md:text-sm">아직 저장된 기분 카드가 없습니다.</p>
              <p className="text-slate-400 font-sans text-[11px] mt-1 mb-4">오늘 있었던 하루를 간단히 양식에 쓰고, 마음에 편지를 담아 카드를 생성하고 저장해 보세요.</p>
              
              <button
                id="btn-load-samples-empty"
                onClick={handleLoadSampleCards}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-sans font-semibold transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>💡 기분 카드 예시 3종 불러오기</span>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              id="saved-cards-grid"
              key="grid-available"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5"
            >
              {savedCards.map((card) => {
                const moodObj = MOODS.find(m => m.type === card.mood) || MOODS[0];
                return (
                  <motion.div
                    id={`saved-card-item-${card.id}`}
                    key={card.id}
                    layoutId={`saved-card-${card.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                    onClick={() => setViewingCard(card)}
                    className="group bg-white rounded-2xl p-4 md:p-5 border border-slate-200/70 hover:border-slate-300 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
                  >
                    {/* Tiny Mood indicator line on the left side */}
                    <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                       moodObj.accentColor === 'indigo' ? 'bg-indigo-300' :
                       moodObj.accentColor === 'sky' ? 'bg-sky-300' :
                       moodObj.accentColor === 'rose' ? 'bg-rose-300' :
                       moodObj.accentColor === 'slate' ? 'bg-slate-300' :
                       moodObj.accentColor === 'amber' ? 'bg-amber-300' : 'bg-violet-300'
                    }`} />

                    <div>
                      {/* Card meta header */}
                      <div className="flex items-center justify-between mb-3 pl-1">
                        <span className="text-[10px] text-slate-400 font-mono tracking-tight">{card.date}</span>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${moodObj.badgeColor}`}>
                          {moodObj.label} {moodObj.emoji}
                        </span>
                      </div>

                      {/* Brief snapshot of the story text */}
                      <div className="pl-1 mb-4">
                        <p className="font-sans font-bold text-slate-400 text-[10px] mb-1 uppercase tracking-wider font-mono">하루 기록</p>
                        <p className="font-diary font-medium text-slate-800 text-sm line-clamp-2 leading-relaxed min-h-[2.5rem]">
                          {card.story}
                        </p>
                      </div>
                    </div>

                    {/* Bottom action container */}
                    <div className="border-t border-slate-100 pt-3 mt-1 flex items-center justify-between pl-1">
                      <span className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
                        <HelpCircle size={10} className="text-slate-300" />
                        <span>처방: {card.prescription}</span>
                      </span>
                      
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          id={`btn-read-card-${card.id}`}
                          onClick={() => setViewingCard(card)}
                          className="p-1.5 px-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-[11px] font-sans text-slate-600 font-medium flex items-center gap-1 transition-all cursor-pointer hover:text-slate-900"
                          title="카드 크게 읽기"
                        >
                          <Eye size={12} />
                          <span>읽기</span>
                        </button>
                        
                        <button
                          id={`btn-delete-card-${card.id}`}
                          onClick={(e) => handleDeleteCard(card.id, e)}
                          className="p-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-400 transition-all cursor-pointer"
                          title="카드 삭제하기"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Full screened Card Modal Overlay detail drawer */}
      <AnimatePresence>
        {viewingCard && (
          <MoodCardViewer 
            card={viewingCard}
            mode="modal"
            onClose={() => setViewingCard(null)}
          />
        )}
      </AnimatePresence>

      {/* Application Footer with required exact disclaimer & natural text layout */}
      <footer id="app-footer" className="max-w-3xl mx-auto px-6 text-center mt-16 md:mt-24 border-t border-slate-200/60 pt-8 pb-4">
        <div className="flex items-center justify-center gap-1 text-slate-400 mb-3">
          <AlertCircle size={13} className="text-slate-300" />
          <span className="text-[10px] uppercase font-mono tracking-widest font-semibold text-slate-500">마음 약방 안내</span>
        </div>
        
        {/* Required Disclaimer */}
        <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-sans max-w-lg mx-auto bg-white p-4 rounded-2xl border border-slate-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          “이 앱은 전문 상담 도구가 아니라, 오늘의 감정을 가볍게 기록하고 스스로를 돌보기 위한 작은 메모장입니다.”
        </p>
        
        <p className="text-[11px] text-slate-400 font-sans mt-4 select-none font-medium">
          MOOD_CARD는 오늘의 감정을 가볍게 적어 보는 작은 기록장입니다.
        </p>
      </footer>
    </div>
  );
}
