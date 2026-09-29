export type VerificationStatus = 'CHECKED' | 'ESTIMATED' | 'UNVERIFIED' | 'PLANNED';

export type Experience = {
  id: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  category: string;
  durationMinutes: number;
  budget: 'low' | 'medium' | 'high';
  status: VerificationStatus;
};

export const experiences: Experience[] = [
  {
    id: 'east-bank-morning',
    titleAr: 'صباح فرعوني على الضفة الشرقية',
    titleEn: 'Pharaoh Morning — East Bank',
    summaryAr: 'خطة صباحية هادئة لاكتشاف قلب الأقصر قبل ازدحام اليوم.',
    summaryEn: 'A calm morning route through the heart of Luxor before the day gets busy.',
    category: 'history',
    durationMinutes: 180,
    budget: 'low',
    status: 'ESTIMATED'
  },
  {
    id: 'west-bank-story',
    titleAr: 'حكاية الضفة الغربية',
    titleEn: 'West Bank Story',
    summaryAr: 'مسار يربط المواقع التاريخية مع وقت مرن للحركة والصور.',
    summaryEn: 'A flexible heritage route built around history, movement and photo stops.',
    category: 'heritage',
    durationMinutes: 300,
    budget: 'medium',
    status: 'ESTIMATED'
  },
  {
    id: 'sunset-luxor',
    titleAr: 'غروب الأقصر',
    titleEn: 'Luxor at Sunset',
    summaryAr: 'فترة مسائية خفيفة لمن يريد نهاية يوم هادئة ومشهدًا بصريًا قويًا.',
    summaryEn: 'A light evening option for a slower finish and a strong sunset atmosphere.',
    category: 'scenic',
    durationMinutes: 120,
    budget: 'low',
    status: 'UNVERIFIED'
  }
];
