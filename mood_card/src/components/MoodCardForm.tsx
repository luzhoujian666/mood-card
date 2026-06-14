import React, { useState } from 'react';
import { MOODS, PRESCRIPTIONS, MoodOption, PrescriptionOption } from '../moodData';
import { MoodType, PrescriptionType, MoodCard } from '../types';
import { Heart, Send, Sparkles, Check } from 'lucide-react';

interface MoodCardFormProps {
  onGenerate: (data: {
    mood: MoodType;
    prescription: PrescriptionType;
    story: string;
    wishText: string;
    smallAction: string;
  }) => void;
  activeMood: MoodType;
  setActiveMood: (mood: MoodType) => void;
  activePrescription: PrescriptionType;
  setActivePrescription: (prescription: PrescriptionType) => void;
}

export default function MoodCardForm({
  onGenerate,
  activeMood,
  setActiveMood,
  activePrescription,
  setActivePrescription
}: MoodCardFormProps) {
  const [story, setStory] = useState('');
  const [wishText, setWishText] = useState('');
  const [smallAction, setSmallAction] = useState('');
  
  // Validation state
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim() || !wishText.trim() || !smallAction.trim()) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    onGenerate({
      mood: activeMood,
      prescription: activePrescription,
      story: story.trim(),
      wishText: wishText.trim(),
      smallAction: smallAction.trim()
    });
  };

  const handleClear = () => {
    setStory('');
    setWishText('');
    setSmallAction('');
    setShowErrors(false);
  };

  // Helper placeholders based on active parameters to inspire user
  const getPlaceholders = () => {
    switch (activeMood) {
      case '지침':
        return {
          story: '예) 하루 종일 단어 외우느라 눈이 침침하고 어깨가 무너질 것 같다.',
          wishText: '예) 오늘 참 많이 달렸어. 저녁엔 푹 쉬어보자.',
          smallAction: '예) 저녁 샤워 가볍게 하고 9시에 눈 감고 쉬기'
        };
      case '불안함':
        return {
          story: '예) 내일 수행평가 발표인데 사람들 앞에서 실수할까 봐 걱정된다.',
          wishText: '예) 너무 자책하지 마. 실수 또한 소중한 성장의 씨앗이야.',
          smallAction: '예) 발표 대본 소리내어 2번 연습하고 따뜻한 물 마시기'
        };
      case '속상함':
        return {
          story: '예) 친구들과 의견이 어긋나서 나만 겉도는 기분이 들었다.',
          wishText: '예) 모든 사람의 비위를 맞출 순 없어. 나는 충분히 좋은 사람이야.',
          smallAction: '예) 일기장에 속상한 말을 마구 솔직하게 쏟아내기'
        };
      case '멍함':
        return {
          story: '예) 아무 기운도 안 나고 아무것도 의욕이 없는 하루였다.',
          wishText: '예) 가끔은 하프 타임처럼 멈춰 서 있어도 전혀 문제없어.',
          smallAction: '예) 창밖의 하늘을 3분 동안 시선 고정하며 가만히 바라보기'
        };
      case '기분 좋음':
        return {
          story: '예) 오늘 급식이 내가 아주 좋아하는 메뉴였고 하늘이 무척 푸르렀다.',
          wishText: '예) 사소한 일에 행복해할 줄 아는 내 맑은 능력을 소중히 대하자.',
          smallAction: '예) 다정한 마음으로 친구에게 가볍게 장난치거나 웃어주기'
        };
      case '혼자 있고 싶음':
        return {
          story: '예) 오늘따라 교실의 왁자지껄한 소리가 귀를 너무 어지럽혔다.',
          wishText: '예) 나만의 시간이 조용히 필요했던 것뿐이야. 내 방에서 푹 안식하자.',
          smallAction: '예) 휴대폰을 잠시 서랍에 넣어두고 좋아하는 조용한 음악 듣기'
        };
      default:
        return {
          story: '오늘 당신의 마음에 스쳐 지난 일 한 줄을 적어 보세요.',
          wishText: '스스로에게 건네고 싶은 기분 좋은 말이나 격려의 한마디는?',
          smallAction: '오늘 내가 무리하지 않고 실천 가능한 아주 작고 사소한 일은?'
        };
    }
  };

  const placeholders = getPlaceholders();
  const currentMoodOption = MOODS.find(m => m.type === activeMood)!;

  return (
    <form 
      id="mood-card-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative"
    >
      <div className="absolute top-5 right-5 text-slate-200">
        <Heart size={40} className="stroke-1 opacity-20" />
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-slate-400 text-xs font-mono">STEP 01</span>
          <span className="h-px w-6 bg-slate-200" />
        </div>
        <h3 className="font-sans font-bold text-slate-800 text-lg flex items-center gap-1.5">
          <span>오늘의 기분 선택하기</span>
          <span className="text-sm font-normal text-slate-500">({currentMoodOption.emoji} {currentMoodOption.label})</span>
        </h3>
        <p className="text-slate-400 text-xs mt-0.5">가장 와닿는 감정을 편안하게 골라 보세요.</p>
        
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5 mt-3.5">
          {MOODS.map((mood) => {
            const isSelected = activeMood === mood.type;
            return (
              <button
                id={`mood-select-${mood.type}`}
                key={mood.type}
                type="button"
                onClick={() => setActiveMood(mood.type)}
                className={`py-3 px-2 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  isSelected 
                    ? `border-${mood.accentColor}-400 ${mood.bgClass} shadow-sm ring-2 ring-${mood.accentColor}-100` 
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span className="text-2xl filter drop-shadow-sm select-none">{mood.emoji}</span>
                <span className="text-xs font-sans font-medium">{mood.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500 font-sans mt-2.5 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/30">
          💌 <span className="font-semibold text-slate-700">{currentMoodOption.label}:</span> {currentMoodOption.description}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-slate-400 text-xs font-mono">STEP 02</span>
          <span className="h-px w-6 bg-slate-200" />
        </div>
        <h3 className="font-sans font-bold text-slate-800 text-lg">지금 필요한 마음 처방 선택</h3>
        <p className="text-slate-400 text-xs mt-0.5">앱이 전할 위로의 방향성을 결정합니다.</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {PRESCRIPTIONS.map((prescription) => {
            const isSelected = activePrescription === prescription.type;
            return (
              <button
                id={`presc-select-${prescription.type}`}
                key={prescription.type}
                type="button"
                onClick={() => setActivePrescription(prescription.type)}
                className={`py-2 px-3 rounded-full text-xs transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isSelected 
                    ? 'bg-slate-800 text-white border-slate-800 shadow-sm' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                title={prescription.subText}
              >
                <span>{prescription.emoji}</span>
                <span className="font-medium">{prescription.label}</span>
                {isSelected && <Check size={10} className="stroke-[3]" />}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-400 font-sans mt-2 pl-1">
          * {PRESCRIPTIONS.find(p => p.type === activePrescription)?.subText}
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-slate-400 text-xs font-mono">STEP 03</span>
          <span className="h-px w-6 bg-slate-200" />
        </div>
        <h3 className="font-sans font-bold text-slate-800 text-lg">나의 일상 한마디 적기</h3>

        <div className="space-y-1">
          <label className="text-xs font-sans font-medium text-slate-700 flex justify-between items-center">
            <span>1. 오늘 있었던 일 한 줄로 요약하기 *</span>
            <span className="text-[10px] text-slate-400 font-normal">오늘을 마주하는 솔직한 기록</span>
          </label>
          <input
            id="input-story"
            type="text"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder={placeholders.story}
            maxLength={60}
            className="w-full text-sm font-sans p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/15 bg-slate-50/20 text-slate-800 placeholder-slate-400 transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-sans font-medium text-slate-700 flex justify-between items-center">
            <span>2. 나에게 가만히 해주고 싶은 말 적기 *</span>
            <span className="text-[10px] text-slate-400 font-normal">비난 대신 보살핌의 문장</span>
          </label>
          <input
            id="input-wish-text"
            type="text"
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
            placeholder={placeholders.wishText}
            maxLength={60}
            className="w-full text-sm font-sans p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/15 bg-slate-50/20 text-slate-800 placeholder-slate-400 transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-sans font-medium text-slate-700 flex justify-between items-center">
            <span>3. 오늘 실천하고 싶은 아주 작은 행동 하나 *</span>
            <span className="text-[10px] text-slate-400 font-normal">아주 작아서 언제든 바로 할 수 있는 행동</span>
          </label>
          <input
            id="input-small-action"
            type="text"
            value={smallAction}
            onChange={(e) => setSmallAction(e.target.value)}
            placeholder={placeholders.smallAction}
            maxLength={60}
            className="w-full text-sm font-sans p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/15 bg-slate-50/20 text-slate-800 placeholder-slate-400 transition-all"
          />
        </div>
      </div>

      {showErrors && (
        <div id="form-error-msg" className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-sans mb-4 flex items-center gap-1.5 animate-pulse">
          ⚠️ 세 개의 기록 항목을 모두 간단하게 입력해야 카드를 만들 수 있습니다.
        </div>
      )}

      <div className="flex gap-2.5">
        <button
          id="btn-clear-form"
          type="button"
          onClick={handleClear}
          className="px-4 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 rounded-xl text-sm font-sans transition-all cursor-pointer bg-white"
        >
          초기화
        </button>
        <button
          id="btn-generate-card"
          type="submit"
          className="flex-1 py-3.5 px-5 bg-slate-800 hover:bg-slate-900 active:bg-black text-white rounded-xl text-sm font-sans font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles size={16} className="text-amber-300 animate-pulse" />
          <span>오늘의 기분 처방 카드 만들기</span>
          <Send size={12} className="opacity-60" />
        </button>
      </div>

      <div className="mt-4 text-center">
        <span className="text-[10px] text-slate-400 font-sans tracking-wide">
          * 기분 처방 카드는 저장 버튼을 마저 누르기 전까지 데이터가 보관되지 않습니다.
        </span>
      </div>
    </form>
  );
}
