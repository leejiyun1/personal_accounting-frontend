// ========== 타입 정의 ==========

interface MonthlyData {
  month: string;
  monthName: string;
  income: number;
  expense: number;
}

interface CategoryItem {
  name: string;
  value: number;
}

export interface CategoryData {
  income: Array<{ name: string; value: number }>;
  expense: Array<{ name: string; value: number }>;
}

interface Account {
  id: number;
  code: string;
  name: string;
  balance: number;
}

interface Book {
  id: number;
  name: string;
  bookType: 'PERSONAL' | 'BUSINESS';
  createdAt: string;
  accounts: Array<{
    name: string;
    balance: number;
  }>;
}

// ========== 월별 수입/지출 데이터 (2024-2025) ==========

export const monthlyData: MonthlyData[] = [
  // 2024년
  { month: '2024-01', monthName: '1월', income: 2800000, expense: 1900000 },
  { month: '2024-02', monthName: '2월', income: 2900000, expense: 1950000 },
  { month: '2024-03', monthName: '3월', income: 3100000, expense: 2100000 },
  { month: '2024-04', monthName: '4월', income: 3000000, expense: 2000000 },
  { month: '2024-05', monthName: '5월', income: 3200000, expense: 2200000 },
  { month: '2024-06', monthName: '6월', income: 3400000, expense: 2300000 },
  { month: '2024-07', monthName: '7월', income: 3500000, expense: 2400000 },
  { month: '2024-08', monthName: '8월', income: 3300000, expense: 2250000 },
  { month: '2024-09', monthName: '9월', income: 3800000, expense: 2600000 },
  { month: '2024-10', monthName: '10월', income: 4000000, expense: 2800000 },
  { month: '2024-11', monthName: '11월', income: 3900000, expense: 2700000 },
  { month: '2024-12', monthName: '12월', income: 4200000, expense: 3000000 },

  // 2025년 (현재 진행 중)
  { month: '2025-01', monthName: '1월', income: 4300000, expense: 3100000 },
  { month: '2025-02', monthName: '2월', income: 4100000, expense: 2900000 },
  { month: '2025-03', monthName: '3월', income: 4400000, expense: 3200000 },
  { month: '2025-04', monthName: '4월', income: 4200000, expense: 3000000 },
  { month: '2025-05', monthName: '5월', income: 4500000, expense: 3300000 },
  { month: '2025-06', monthName: '6월', income: 4600000, expense: 3400000 },
  { month: '2025-07', monthName: '7월', income: 4700000, expense: 3500000 },
  { month: '2025-08', monthName: '8월', income: 4500000, expense: 3300000 },
  { month: '2025-09', monthName: '9월', income: 4800000, expense: 3600000 },
  { month: '2025-10', monthName: '10월', income: 5000000, expense: 3800000 },
];

// ========== 월별 카테고리 상세 데이터 ==========

export const categoryDataByMonth: Record<string, CategoryData> = {
  '1월': {
    income: [
      { name: '급여', value: 2500000 },
      { name: '용돈', value: 200000 },
      { name: '부업수입', value: 100000 },
    ],
    expense: [
      { name: '식비', value: 550000 },
      { name: '교통비', value: 180000 },
      { name: '문화생활', value: 250000 },
      { name: '쇼핑', value: 600000 },
      { name: '의료비', value: 120000 },
      { name: '기타', value: 200000 },
    ]
  },
  '2월': {
    income: [
      { name: '급여', value: 2500000 },
      { name: '용돈', value: 250000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 580000 },
      { name: '교통비', value: 170000 },
      { name: '문화생활', value: 300000 },
      { name: '쇼핑', value: 550000 },
      { name: '의료비', value: 100000 },
      { name: '기타', value: 250000 },
    ]
  },
  '3월': {
    income: [
      { name: '급여', value: 2700000 },
      { name: '용돈', value: 250000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 620000 },
      { name: '교통비', value: 200000 },
      { name: '문화생활', value: 350000 },
      { name: '쇼핑', value: 650000 },
      { name: '의료비', value: 130000 },
      { name: '기타', value: 150000 },
    ]
  },
  '4월': {
    income: [
      { name: '급여', value: 2600000 },
      { name: '용돈', value: 250000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 600000 },
      { name: '교통비', value: 190000 },
      { name: '문화생활', value: 320000 },
      { name: '쇼핑', value: 580000 },
      { name: '의료비', value: 110000 },
      { name: '기타', value: 200000 },
    ]
  },
  '5월': {
    income: [
      { name: '급여', value: 2800000 },
      { name: '용돈', value: 250000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 650000 },
      { name: '교통비', value: 210000 },
      { name: '문화생활', value: 380000 },
      { name: '쇼핑', value: 700000 },
      { name: '의료비', value: 120000 },
      { name: '기타', value: 140000 },
    ]
  },
  '6월': {
    income: [
      { name: '급여', value: 3000000 },
      { name: '용돈', value: 250000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 680000 },
      { name: '교통비', value: 200000 },
      { name: '문화생활', value: 400000 },
      { name: '쇼핑', value: 750000 },
      { name: '의료비', value: 140000 },
      { name: '기타', value: 130000 },
    ]
  },
  '7월': {
    income: [
      { name: '급여', value: 3100000 },
      { name: '용돈', value: 250000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 700000 },
      { name: '교통비', value: 220000 },
      { name: '문화생활', value: 450000 },
      { name: '쇼핑', value: 800000 },
      { name: '의료비', value: 130000 },
      { name: '기타', value: 100000 },
    ]
  },
  '8월': {
    income: [
      { name: '급여', value: 2900000 },
      { name: '용돈', value: 250000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 660000 },
      { name: '교통비', value: 200000 },
      { name: '문화생활', value: 400000 },
      { name: '쇼핑', value: 720000 },
      { name: '의료비', value: 140000 },
      { name: '기타', value: 130000 },
    ]
  },
  '9월': {
    income: [
      { name: '급여', value: 3300000 },
      { name: '용돈', value: 350000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 750000 },
      { name: '교통비', value: 230000 },
      { name: '문화생활', value: 500000 },
      { name: '쇼핑', value: 900000 },
      { name: '의료비', value: 120000 },
      { name: '기타', value: 100000 },
    ]
  },
  '10월': {
    income: [
      { name: '급여', value: 3500000 },
      { name: '용돈', value: 350000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 800000 },
      { name: '교통비', value: 250000 },
      { name: '문화생활', value: 550000 },
      { name: '쇼핑', value: 950000 },
      { name: '의료비', value: 150000 },
      { name: '기타', value: 100000 },
    ]
  },
  '11월': {
    income: [
      { name: '급여', value: 3400000 },
      { name: '용돈', value: 350000 },
      { name: '부업수입', value: 150000 },
    ],
    expense: [
      { name: '식비', value: 780000 },
      { name: '교통비', value: 240000 },
      { name: '문화생활', value: 520000 },
      { name: '쇼핑', value: 900000 },
      { name: '의료비', value: 160000 },
      { name: '기타', value: 100000 },
    ]
  },
  '12월': {
    income: [
      { name: '급여', value: 3500000 },
      { name: '보너스', value: 500000 },
      { name: '용돈', value: 200000 },
    ],
    expense: [
      { name: '식비', value: 850000 },
      { name: '교통비', value: 250000 },
      { name: '문화생활', value: 600000 },
      { name: '쇼핑', value: 1000000 },
      { name: '의료비', value: 150000 },
      { name: '선물', value: 150000 },
    ]
  },
};

// ========== 장부 목록 데이터 ==========

export const booksData: Book[] = [
  {
    id: 1,
    name: '개인 가계부',
    bookType: 'PERSONAL',
    createdAt: '2024-01-15',
    accounts: [
      { name: '현금', balance: 500000 },
      { name: '은행', balance: 3500000 },
      { name: '체크카드', balance: 800000 },
      { name: '신용카드', balance: -450000 },
    ]
  },
  {
    id: 2,
    name: '프리랜서 사업',
    bookType: 'BUSINESS',
    createdAt: '2024-03-20',
    accounts: [
      { name: '사업자계좌', balance: 8500000 },
      { name: '법인카드', balance: -1200000 },
      { name: '현금', balance: 300000 },
    ]
  }
];

// ========== 계정과목별 잔액 데이터 ==========

export const accountBalances = {
  asset: [
    { id: 1, code: '1100', name: '현금', balance: 500000 },
    { id: 2, code: '1200', name: '은행', balance: 3500000 },
    { id: 3, code: '1300', name: '체크카드', balance: 800000 },
    { id: 4, code: '1400', name: '신용카드', balance: -450000 },
  ] as Account[],
  revenue: [
    { id: 5, code: '4100', name: '급여', balance: 38500000 },
    { id: 6, code: '4200', name: '용돈', balance: 3350000 },
    { id: 7, code: '4300', name: '부업수입', balance: 1750000 },
    { id: 8, code: '4400', name: '보너스', balance: 500000 },
  ] as Account[],
  expense: [
    { id: 9, code: '5100', name: '식비', balance: 8220000 },
    { id: 10, code: '5200', name: '교통비', balance: 2540000 },
    { id: 11, code: '5300', name: '문화생활', balance: 4920000 },
    { id: 12, code: '5400', name: '쇼핑', balance: 9100000 },
    { id: 13, code: '5500', name: '의료비', balance: 1570000 },
    { id: 14, code: '5900', name: '기타', balance: 1650000 },
  ] as Account[],
};

// ========== 거래 내역 데이터 ==========

export interface Transaction {
  id: number;
  bookId: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: string;
  paymentMethod: string;
  memo: string;
}

export const transactionsData: Transaction[] = [
  // 개인 가계부 (bookId: 1)
  {
    id: 1,
    bookId: 1,
    date: '2025-10-20',
    type: 'INCOME',
    amount: 3500000,
    category: '급여',
    paymentMethod: '은행',
    memo: '10월 급여'
  },
  {
    id: 2,
    bookId: 1,
    date: '2025-10-19',
    type: 'EXPENSE',
    amount: 45000,
    category: '식비',
    paymentMethod: '신용카드',
    memo: '저녁 회식'
  },
  {
    id: 3,
    bookId: 1,
    date: '2025-10-18',
    type: 'EXPENSE',
    amount: 15000,
    category: '교통비',
    paymentMethod: '체크카드',
    memo: '택시'
  },
  {
    id: 4,
    bookId: 1,
    date: '2025-10-17',
    type: 'EXPENSE',
    amount: 120000,
    category: '쇼핑',
    paymentMethod: '신용카드',
    memo: '옷 구매'
  },
  {
    id: 5,
    bookId: 1,
    date: '2025-10-16',
    type: 'INCOME',
    amount: 200000,
    category: '용돈',
    paymentMethod: '현금',
    memo: '부모님 용돈'
  },
  {
    id: 6,
    bookId: 1,
    date: '2025-10-15',
    type: 'EXPENSE',
    amount: 8500,
    category: '교통비',
    paymentMethod: '체크카드',
    memo: '지하철'
  },
  {
    id: 7,
    bookId: 1,
    date: '2025-10-14',
    type: 'EXPENSE',
    amount: 32000,
    category: '식비',
    paymentMethod: '신용카드',
    memo: '점심'
  },
  {
    id: 8,
    bookId: 1,
    date: '2025-10-13',
    type: 'EXPENSE',
    amount: 85000,
    category: '문화생활',
    paymentMethod: '신용카드',
    memo: '영화 + 팝콘'
  },

  // 프리랜서 사업 (bookId: 2)
  {
    id: 9,
    bookId: 2,
    date: '2025-10-20',
    type: 'INCOME',
    amount: 5000000,
    category: '매출',
    paymentMethod: '사업자계좌',
    memo: 'A사 프로젝트 대금'
  },
  {
    id: 10,
    bookId: 2,
    date: '2025-10-18',
    type: 'EXPENSE',
    amount: 800000,
    category: '외주비',
    paymentMethod: '법인카드',
    memo: '디자인 외주'
  },
  {
    id: 11,
    bookId: 2,
    date: '2025-10-15',
    type: 'EXPENSE',
    amount: 350000,
    category: '접대비',
    paymentMethod: '법인카드',
    memo: '클라이언트 미팅'
  },
  {
    id: 12,
    bookId: 2,
    date: '2025-10-12',
    type: 'EXPENSE',
    amount: 120000,
    category: '소모품비',
    paymentMethod: '법인카드',
    memo: '사무용품'
  },
  {
    id: 13,
    bookId: 2,
    date: '2025-10-10',
    type: 'INCOME',
    amount: 3000000,
    category: '용역수입',
    paymentMethod: '사업자계좌',
    memo: 'B사 컨설팅'
  },
];

// ========== 재무제표 데이터 ==========

// 손익계산서 (2025년 1~10월)
export const incomeStatement = {
  period: {
    startDate: '2025-01-01',
    endDate: '2025-10-31'
  },
  revenue: {
    total: 44100000,
    details: [
      { category: '급여', amount: 35000000 },
      { category: '용돈', amount: 3100000 },
      { category: '부업수입', amount: 1500000 },
      { category: '보너스', amount: 500000 },
      { category: '기타수입', amount: 4000000 }
    ]
  },
  expense: {
    total: 31400000,
    details: [
      { category: '식비', amount: 7320000 },
      { category: '교통비', amount: 2290000 },
      { category: '문화생활', amount: 4620000 },
      { category: '쇼핑', amount: 8600000 },
      { category: '의료비', amount: 1370000 },
      { category: '통신비', amount: 600000 },
      { category: '월세/관리비', amount: 5000000 },
      { category: '기타지출', amount: 1600000 }
    ]
  },
  netIncome: 12700000 // 순이익 (수익 - 비용)
};

// 재무상태표 (2025-10-31 기준)
export const balanceSheet = {
  asOfDate: '2025-10-31',
  assets: {
    total: 24350000,
    details: [
      { category: '현금', amount: 500000 },
      { category: '은행', amount: 3500000 },
      { category: '체크카드', amount: 800000 },
      { category: '사업자계좌', amount: 8500000 },
      { category: '투자자산', amount: 12000000 },
      { category: '기타자산', amount: 350000 }
    ]
  },
  liabilities: {
    total: 1650000,
    details: [
      { category: '신용카드', amount: 450000 },
      { category: '법인카드', amount: 1200000 }
    ]
  },
  equity: 22700000 // 자본 (자산 - 부채)
};

// 현금흐름표 (2025년 1~10월)
export const cashFlow = {
  period: {
    startDate: '2025-01-01',
    endDate: '2025-10-31'
  },
  summary: {
    startingBalance: 5000000,
    totalIncome: 44100000,
    totalExpense: 31400000,
    endingBalance: 17700000
  },
  incomeDetails: [
    { category: '급여', amount: 35000000 },
    { category: '용돈', amount: 3100000 },
    { category: '부업수입', amount: 1500000 },
    { category: '보너스', amount: 500000 },
    { category: '기타수입', amount: 4000000 }
  ],
  expenseDetails: [
    { category: '식비', amount: 7320000 },
    { category: '교통비', amount: 2290000 },
    { category: '문화생활', amount: 4620000 },
    { category: '쇼핑', amount: 8600000 },
    { category: '의료비', amount: 1370000 },
    { category: '통신비', amount: 600000 },
    { category: '월세/관리비', amount: 5000000 },
    { category: '기타지출', amount: 1600000 }
  ]
};