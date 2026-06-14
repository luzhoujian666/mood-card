import { MoodType, PrescriptionType, MoodCard, Quote } from './types';

export interface MoodOption {
  type: MoodType;
  label: string;
  emoji: string;
  description: string;
  // Soft, warm color themes suited for hand-drawn stationery card styles
  bgClass: string;       // Background color for selection
  cardBgClass: string;   // Card background color
  textColor: string;     // Primary text color base
  borderColor: string;   // Accent border color
  badgeColor: string;    // Badge background color for layout labels
  accentColor: string;   // Primary shadow or accent glow
}

export const MOODS: MoodOption[] = [
  {
    type: '지침',
    label: '지침',
    emoji: '🍂',
    description: '공부나 일상에 지쳐서 에너지가 거의 없는 상태',
    bgClass: 'bg-indigo-50/70 hover:bg-indigo-100/75',
    cardBgClass: 'bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50',
    textColor: 'text-indigo-950',
    borderColor: 'border-indigo-200',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    accentColor: 'indigo'
  },
  {
    type: '불안함',
    label: '불안함',
    emoji: '🎈',
    description: '시험, 내일 일, 미래 등으로 마음이 두방망이질치고 떨릴 때',
    bgClass: 'bg-sky-50/70 hover:bg-sky-100/75',
    cardBgClass: 'bg-gradient-to-br from-sky-50 via-slate-50 to-blue-50',
    textColor: 'text-sky-950',
    borderColor: 'border-sky-200',
    badgeColor: 'bg-sky-100 text-sky-800',
    accentColor: 'sky'
  },
  {
    type: '속상함',
    label: '속상함',
    emoji: '🌧️',
    description: '누군가의 말에 상처받았거나 속상하고 서운할 때',
    bgClass: 'bg-rose-50/70 hover:bg-rose-100/75',
    cardBgClass: 'bg-gradient-to-br from-rose-50 via-slate-50 to-amber-50',
    textColor: 'text-rose-950',
    borderColor: 'border-rose-200',
    badgeColor: 'bg-rose-100 text-rose-800',
    accentColor: 'rose'
  },
  {
    type: '멍함',
    label: '멍함',
    emoji: '☁️',
    description: '아무 생각 없이 머리가 텅 비어 있거나 무기력할 때',
    bgClass: 'bg-slate-50 hover:bg-slate-100',
    cardBgClass: 'bg-gradient-to-br from-slate-100 via-neutral-50 to-zinc-100',
    textColor: 'text-slate-900',
    borderColor: 'border-slate-300',
    badgeColor: 'bg-slate-200 text-slate-800',
    accentColor: 'slate'
  },
  {
    type: '기분 좋음',
    label: '기분 좋음',
    emoji: '☀️',
    description: '자그마한 일에 기분 좋고 행복해서 가벼운 상태',
    bgClass: 'bg-amber-50/70 hover:bg-amber-100/75',
    cardBgClass: 'bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50',
    textColor: 'text-amber-950',
    borderColor: 'border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-800',
    accentColor: 'amber'
  },
  {
    type: '혼자 있고 싶음',
    label: '혼자 있고 싶음',
    emoji: '🌙',
    description: '모든 소음을 지우고 오목하게 나만의 방 속으로 들어가고 싶을 때',
    bgClass: 'bg-violet-50/70 hover:bg-violet-100/75',
    cardBgClass: 'bg-gradient-to-br from-violet-50 via-slate-50 to-fuchsia-50',
    textColor: 'text-violet-950',
    borderColor: 'border-violet-200',
    badgeColor: 'bg-violet-100 text-violet-800',
    accentColor: 'violet'
  }
];

export interface PrescriptionOption {
  type: PrescriptionType;
  label: string;
  emoji: string;
  subText: string;
}

export const PRESCRIPTIONS: PrescriptionOption[] = [
  { type: '짧은 위로', emoji: '🧸', label: '짧은 위로', subText: '따뜻하게 안아주는 보드라운 말' },
  { type: '현실적인 조언', emoji: '🧭', label: '현실적인 조언', subText: '지금 당장 할 수 있는 현실적인 생각' },
  { type: '쉬어가기', emoji: '☕', label: '쉬어가기', subText: '부담감을 털어내고 잠시 멈추는 법' },
  { type: '작은 행동 추천', emoji: '🌱', label: '작은 행동 추천', subText: '머리를 비우고 손 발을 꼼지락대는 법' },
  { type: '응원 한마디', emoji: '💌', label: '응원 한마디', subText: '내일을 향한 자그마한 응원의 불씨' }
];

// Matrix of Comfort Messages index by [PrescriptionType][MoodType]
const COMFORT_MATRIX: Record<PrescriptionType, Record<MoodType, string>> = {
  '짧은 위로': {
    '지침': '오늘 하루 참 수고 많았어요. 완벽하기보다 지금은 다 털고 편안하게 한 템포 쉬어가는 것이 가장 중요합니다.',
    '불안함': '마음이 많이 술렁이죠? 잠시 눈을 감고 깊은 한숨을 크게 내쉬어 보세요. 걱정들은 이 바람에 흩어질 거예요.',
    '속상함': '속상했던 마음은 이불 속에 가만히 남겨두세요. 당신은 언제나 소중하고 아낌받아야 하는 존재입니다.',
    '멍함': '아무 생각 없이 머리를 비우는 것도 뇌가 휴식을 취하는 과정이에요. 오늘은 편히 쉬며 고요를 즐겨도 괜찮아요.',
    '기분 좋음': '이 소소하고 소중한 기쁨을 마음속에 적어 두세요. 지치는 날 가끔 꺼내어 웃을 수 있는 버팀목이 될 거예요.',
    '혼자 있고 싶음': '소음이 없는 곳에 나만을 위한 편안한 쉼터를 선물하세요. 조용히 숨 쉬는 지금 그대로 안전합니다.'
  },
  '현실적인 조언': {
    '지침': '에너지가 바닥났을 땐 긍정적인 생각도 어렵습니다. 감정을 정리하려 애쓰기보다 지금 바로 수면 모드로 들어가 쉬세요.',
    '불안함': '저 멀리 있는 큰 걱정들은 지금 치워두세요. 딱 10분 앞만 바라보고, 손에 잡히는 한 가지 작은 것만 간단히 해봅시다.',
    '속상함': '타인의 무례한 표현은 사실 그 사람 내면의 문제입니다. 억지로 이해하려 하지 말고 바깥에 그냥 방치하세요.',
    '멍함': '억지로 의욕을 쥐어짜 내려 하지 말고 가벼운 시원한 물 한 잔만 시원히 들이켜 감각을 한 번 상쾌하게 깨워 보세요.',
    '기분 좋음': '기분 좋은 상태일 때 너무 에너지를 다 쓰지 마세요. 이 산뜻한 컨디션을 유지한 채 적당히 편하게 마감합시다.',
    '혼자 있고 싶음': '휴대폰을 잠시 눈앞에서 치우고 1시간만 홀로 온전한 여유를 가지세요. 소소한 마음 손실을 가장 빨리 막을 수 있습니다.'
  },
  '쉬어가기': {
    '지침': '가끔 멈춘다고 문장이 망가지는 것이 아닙니다. 쉼표를 찍어주어야 다음 문장을 더 선명하게 이어 나갈 수 있으니까요.',
    '불안함': '불안한 회로에 지배될 땐, 책상 정리를 간단히 한 뒤 편한 옷으로 갈아입고 편히 앉아 좋아하는 음악을 들어 보세요.',
    '속상함': '속상한 혼잣말들이 귓가에 맴돌 땐 창문을 활짝 열어보세요. 시원하게 부는 바람에 감정을 함께 날려보내는 편이 낫습니다.',
    '멍함': '아무 초점 없이 먼 하늘을 바라보며 시선을 비우는 것은 좋은 이완 행동입니다. 무언가를 해야 한다는 강박을 내려놓으세요.',
    '기분 좋음': '흥겨운 분위기에 도취되어 밤샘 공부나 수다를 떨지 말고, 가볍게 일기를 쓰고 적절한 휴식 타이밍을 잡도록 합시다.',
    '혼자 있고 싶음': '모든 시선으로부터 격리되어 안전함을 느끼시는 것은 소중한 충전 방식입니다. 좋아하는 다정함을 품에 가만히 밀착해보세요.'
  },
  '작은 행동 추천': {
    '지침': '따뜻한 온수 수건이나 눈 찜질 마스크를 올려 피로를 푸셔보세요. 가벼운 어깨 스트레칭도 매우 도움이 됩니다.',
    '불안함': '내일 나갈 준비물 딱 한 개만 미리 가지런히 챙겨 가방에 넣은 뒤, 세수를 부드럽게 하고 시원한 물 한 잔 미셔보세요.',
    '속상함': '나를 복잡하게 하는 문장들을 이면지에 끄적여 본 뒤, 아주 시원한 소리가 나게 북북 찢어 쓰레기통에 슉 던지세요.',
    '멍함': '가볍게 시원한 세수를 한 뒤, 좋아하는 립밤이나 촉촉한 로션을 마음 편안히 얼굴 전체에 천천히 발라 보세요.',
    '기분 좋음': '가장 좋아하는 신나는 노래를 한 곡 선곡하여 들으며, 손이나 발을 가볍게 두드려 오늘 기분을 축하해보세요.',
    '혼자 있고 싶음': '편안한 필기구를 골라 하얗고 폭신한 종이 위에 좋아하는 낙서나 하트 그리기처럼 쉽고 앙증맞은 손놀림을 해보세요.'
  },
  '응원 한마디': {
    '지침': '하루 종일 힘겨운 과제와 일상에 맞서느라 방전된 소중한 당신, 남들은 모르는 치열하고 치열한 수고를 많이 겪었을 뿐입니다.',
    '불안함': '불안하다는 건 잘해내고 싶다는 마음의 자연스러운 신호입니다. 너무 단정 짓지 말고 당신 안 가려진 잠재력을 믿으세요.',
    '속상함': '타인의 차가운 말에 다친 속앓이를 이겨내느라 고생 많았습니다. 그 사람의 어리숙한 말에 내 진짜 가치를 낮추지 맙시다.',
    '멍함': '앞만 보고 달리던 별도 밤 동안 잠시 자태를 감추고 휴식합니다. 빈 마음 웅덩이에 내일 더 고운 봄바람이 불 거예요.',
    '기분 좋음': '이 산뜻한 감정이 당신의 잔잔한 지주가 되어 줄 겁니다. 주변의 소소한 날씨와 인연들에 흐뭇한 사랑을 간직해봐요.',
    '혼자 있고 싶음': '조용하게 나를 위로하기 위해 홀로 있는 시간 또한 성숙하고 귀중한 기술입니다. 나를 지키는 온화한 한 걸음이에요.'
  }
};

export function generateComfortMessage(mood: MoodType, prescription: PrescriptionType): string {
  return COMFORT_MATRIX[prescription]?.[mood] || '오늘 하루 수고한 나 자신을 위해 따뜻한 차 한 잔을 선물해 주세요.';
}

export const RANDOM_QUOTES: string[] = [
  '천천히 해도 괜찮아요.',
  '오늘의 속도는 오늘의 나에게만 맞추면 돼요.',
  '작은 정리 하나도 충분한 시작이에요.',
  '숨을 크게 한 번 쉬어보세요. 그것만으로도 충분합니다.',
  '가장 나다운 모습으로, 오늘 하루도 수고 많았어요.',
  '남들과 비교하지 않아도 괜찮아요. 당신은 당신대로 빛나고 있어요.',
  '오늘 있었던 힘든 일은 밤하늘에 잠시 흘려보내요.',
  '지금 이 순간, 당신의 마음이 가장 편안하길 바라요.',
  '가끔은 아무것도 하지 않는 시간이 최고의 처방전이 됩니다.',
  '누군가에게는 평범한 하루였겠지만, 당신에겐 치열했던 하루였음을 압니다.',
  '완벽하지 않아도 괜찮아요. 이미 존재 자체로 소중해요.',
  '마음이 가라앉는 날에는 그 무게를 억지로 가볍게 하려 애쓰지 마세요.',
  '일어나지도 않은 오지 않은 날들을 미리 걱정하며 소중한 ‘오늘’을 빼앗기지 마세요.',
  '모두에게 좋은 사람이 되려고 내 마음에 생채기를 내지 마세요.',
  '오늘 할 수 있는 아주 작고 사소한 한 가지를 해낸 것 자체로 영웅이에요.'
];

export const SAMPLE_CARDS: MoodCard[] = [
  {
    id: 'sample-1',
    date: '2026. 06. 13',
    mood: '불안함',
    prescription: '응원 한마디',
    story: '시험 전날 너무 떨리고 불안해서 어떤 내용도 집중이 잘 안 된다.',
    wishText: '불안해하는 나 자신을 몰아세우지 말자. 지금까지 충분히 노력했으니 결과에 상관없이 괜찮아!',
    smallAction: '눈 감고 편안하게 깊은 심호흡 5번을 정성스럽게 한 뒤 시원한 물 한 잔 미시기',
    comfortMessage: '불안하다는 건 그만큼 당신이 이 일을 잘 해내고 싶다는 성실한 증거예요. 당신 안의 힘은 생각보다 크답니다. 믿어보세요.',
    colorTheme: 'bg-gradient-to-br from-sky-50 via-slate-50 to-blue-50'
  },
  {
    id: 'sample-2',
    date: '2026. 06. 12',
    mood: '지침',
    prescription: '쉬어가기',
    story: '아무것도 하기 싫고 일주일 동안 과제와 공부에 짓눌려 너무 지친 피곤한 날이다.',
    wishText: '열심히 지칠 만하지! 오늘은 나를 위해 그 어떤 자기개발서 한 장도 들추지 않고 잠들자.',
    smallAction: '휴대폰 방해금지 모드를 켜고 이불 속으로 쏙 기어들어가 폭신한 베개 베고 좋아하는 연주곡 듣기',
    comfortMessage: '멈춘다고 부러지는 배는 없습니다. 쉼표를 찍어야 다음 문장을 쓸 수 있듯이, 지금의 멈춤은 내일 더 부드럽게 나아가기 위한 귀중한 마디랍니다.',
    colorTheme: 'bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50'
  },
  {
    id: 'sample-3',
    date: '2026. 06. 10',
    mood: '속상함',
    prescription: '짧은 위로',
    story: '친구에게 서운했던 날, 사소한 툭 쏘는 말 한마디에 가슴이 체한 듯 답답하고 속상하다.',
    wishText: '내가 이상한 게 아냐. 서운함을 느낀 내 감정은 고유하고 솔직한 가치야. 억지로 이해하려고 머리 아프지 말자.',
    smallAction: '속상한 이유를 종이에 가득 낙서하듯 적어서 시원하게 찢어 쓰레기통에 슉 넣기',
    comfortMessage: '누군가의 무심한 말에 상처받은 마음을 가만히 보듬어 줍니다. 당신은 언제나 소중하고 지켜져야 마땅한 아름다운 사람이에요.',
    colorTheme: 'bg-gradient-to-br from-rose-50 via-slate-50 to-amber-50'
  }
];
