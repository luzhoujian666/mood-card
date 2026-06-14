import React from 'react';
import { MoodCard } from '../types';
import { MOODS, PRESCRIPTIONS } from '../moodData';
import { Bookmark, RefreshCw, X, Heart, Calendar, ClipboardCheck, MessageCircleHeart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface MoodCardViewerProps {
  card: MoodCard;
  mode: 'preview' | 'modal';
  onSave?: () => void;
  onReset?: () => void;
  onClose?: () => void;
  isSaved?: boolean;
}

export default function MoodCardViewer({
  card,
  mode,
  onSave,
  onReset,
  onClose,
  isSaved = false
}: MoodCardViewerProps) {
  const moodOption = MOODS.find((m) => m.type === card.mood) || MOODS[0];
  const prescriptionOption = PRESCRIPTIONS.find((p) => p.type === card.prescription) || PRESCRIPTIONS[0];

  // Formatting date for Korean layout: "2026년 6월 14일"
  const formattedDate = () => {
    if (!card.date) return '';
    const parts = card.date.split('. ');
    if (parts.length === 3) {
      return `${parts[0]}년 ${parseInt(parts[1])}월 ${parseInt(parts[2])}일`;
    }
    return card.date;
  };

  const cardContent = (
    <div 
      id={`mood-prescription-card-${card.id}`}
      className={`paper-card ${moodOption.cardBgClass} ${moodOption.textColor} border-2 ${moodOption.borderColor} p-6 md:p-8 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-md ${
        moodOption.accentColor === 'indigo' ? 'soft-glow-indigo' :
        moodOption.accentColor === 'sky' ? 'soft-glow-sky' :
        moodOption.accentColor === 'rose' ? 'soft-glow-rose' :
        moodOption.accentColor === 'slate' ? 'soft-glow-slate' :
        moodOption.accentColor === 'amber' ? 'soft-glow-amber' : 'soft-glow-violet'
      }`}
    >
      {/* Decorative Stamp element */}
      <div className="absolute -top-3 -right-3 w-28 h-28 border border-dashed border-slate-300/40 rounded-full flex items-center justify-center rotate-12 select-none pointer-events-none origin-center opacity-40">
        <div className="border border-double border-slate-400/30 rounded-full w-24 h-24 flex flex-col items-center justify-center p-2 text-center">
          <span className="text-[9px] font-sans tracking-tight uppercase font-light">MOOD CARD</span>
          <span className="text-[12px] font-diary font-bold">마음 보관소</span>
          <span className="text-[8px] font-mono tracking-tighter">★ OK ★</span>
        </div>
      </div>

      {/* Heart-stamps or handcraft lines on left/right margins to emulate real card structure */}
      <div className="absolute top-8 left-6 w-1 h-12 bg-slate-300/20 rounded-full pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-5 border-b border-dashed border-slate-300/60">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-serif font-semibold tracking-wider ${moodOption.badgeColor}`}>
              {moodOption.label} {moodOption.emoji}
            </span>
            <span className="text-[11px] text-slate-400 font-sans tracking-tight flex items-center gap-1">
              <Calendar size={11} />
              {formattedDate()}
            </span>
          </div>
          <h2 className="font-diary font-bold text-xl md:text-2xl mt-2 select-none">
            {moodOption.label} 끝에 건네는 기분 처방
          </h2>
        </div>
        <div className="md:text-right flex items-center gap-1 text-xs font-serif bg-white/60 backdrop-blur-sm self-start md:self-center px-3 py-1.5 rounded-xl border border-dashed border-slate-200">
          <span>처방 가이드 :</span>
          <span className="font-bold text-slate-800">{prescriptionOption.emoji} {prescriptionOption.label}</span>
        </div>
      </div>

      {/* Card Body - Handwritten Style */}
      <div className="space-y-6">
        {/* Story */}
        <div className="relative pl-3 border-l-2 border-slate-300/50">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-sans font-medium mb-1 select-none">
            오늘 일어난 일 한 줄
          </div>
          <p className="font-diary text-[15px] leading-relaxed text-slate-800 font-medium">
            {card.story}
          </p>
        </div>

        {/* Wish Message */}
        <div className="relative pl-3 border-l-2 border-slate-300/50 bg-white/30 p-3 rounded-xl border border-slate-100/10">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-sans font-medium mb-1 flex items-center gap-1 select-none">
            <MessageCircleHeart size={12} className="text-rose-400" />
            <span>나에게 들려주고 싶은 속삭임</span>
          </div>
          <p className="font-diary text-[15px] italic leading-relaxed text-slate-800 font-semibold text-center py-1">
            “ {card.wishText} ”
          </p>
        </div>

        {/* Small Action */}
        <div className="relative pl-3 border-l-2 border-slate-300/50">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-sans font-medium mb-1 flex items-center gap-1 select-none">
            <ClipboardCheck size={12} className="text-emerald-500" />
            <span>나를 달래줄 오늘의 아주 작은 행동</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-slate-400/40 bg-white/50 flex-shrink-0 flex items-center justify-center">
              <span className="text-[9px] text-emerald-600 font-bold">✓</span>
            </div>
            <p className="font-diary text-[15px] text-slate-800 font-medium">
              {card.smallAction}
            </p>
          </div>
        </div>

        {/* Automatic App Comfort Prescription Paragraph */}
        <div className="mt-8 pt-5 border-t border-slate-200/60 bg-white/50 backdrop-blur-xs p-4 rounded-2xl border border-dashed border-slate-200/40">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-sans font-bold mb-1.5 flex items-center gap-1 select-none text-slate-500">
            <Sparkles size={11} className="text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>마음 약방에서 보내는 동행의 편지</span>
          </div>
          <p className="font-diary text-[14px] md:text-[15px] leading-relaxed text-indigo-950 font-medium whitespace-pre-line bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
            {card.comfortMessage}
          </p>
        </div>
      </div>

      {/* Stamp Sign-off or Logo at Bottom Right */}
      <div className="mt-8 flex justify-between items-end">
        <div className="text-[10px] text-slate-400/80 font-serif select-none">
          MOOD_CARD : 오늘의 마음 처방전
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-rose-200/50 flex items-center justify-center border border-dashed border-rose-300 text-[10px] font-sans text-rose-800 font-bold select-none rotate-6">
            소중
          </div>
          <span className="text-[9px] text-slate-400 font-serif mt-1 scale-90 select-none">스스로를 아끼는 마음</span>
        </div>
      </div>
    </div>
  );

  // Normal Preview mode layout displayed alongside the builder form
  if (mode === 'preview') {
    return (
      <div id="preview-mode-card-viewer" className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-sans font-bold text-slate-800 text-base flex items-center gap-1.5">
            <Sparkles size={18} className="text-amber-400" />
            <span>완성된 오늘의 처방 카드</span>
          </h3>
          <span className="text-xs text-emerald-600 font-sans bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>완성 완료</span>
          </span>
        </div>

        {cardContent}

        <div className="flex gap-2.5 mt-4">
          <button
            id="btn-redo-card"
            onClick={onReset}
            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-sans font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200/50"
          >
            <RefreshCw size={13} />
            <span>새로 다시 쓰기</span>
          </button>
          
          <button
            id="btn-save-to-storage"
            onClick={onSave}
            disabled={isSaved}
            className={`flex-1 py-3 px-4 text-white rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
              isSaved 
                ? 'bg-emerald-600 hover:bg-emerald-700 cursor-default' 
                : 'bg-slate-800 hover:bg-slate-900'
            }`}
          >
            <Bookmark size={13} />
            <span>{isSaved ? '보관함 저장 완료  ✓' : '기분 보관함에 저장하기'}</span>
          </button>
        </div>
      </div>
    );
  }

  // Details Modal Mode - Popup to review completed card in focus
  return (
    <div 
      id="modal-mode-card-viewer"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div 
        id="modal-card-overlay"
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-xl bg-white/5 p-1 rounded-3xl overflow-hidden focus:outline-none z-10"
      >
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/70 hover:bg-white text-slate-700 rounded-full shadow-md transition-all cursor-pointer border border-slate-200"
          title="닫기"
        >
          <X size={16} />
        </button>
        
        {cardContent}
      </motion.div>
    </div>
  );
}
