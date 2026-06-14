export type MoodType = '지침' | '불안함' | '속상함' | '멍함' | '기분 좋음' | '혼자 있고 싶음';

export type PrescriptionType = '짧은 위로' | '현실적인 조언' | '쉬어가기' | '작은 행동 추천' | '응원 한마디';

export interface MoodCard {
  id: string;
  date: string;
  mood: MoodType;
  prescription: PrescriptionType;
  story: string; // 오늘 있었던 일 한 줄
  wishText: string; // 나에게 해주고 싶은 말
  smallAction: string; // 오늘 할 수 있는 아주 작은 행동
  comfortMessage: string; // 앱이 자동 생성하는 위로 메시지
  colorTheme: string; // 카드 테마 스타일
}

export interface Quote {
  text: string;
  author?: string;
}
