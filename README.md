# Personal Accounting System - Frontend

> AI 대화 기반 복식부기 가계부 시스템 (프론트엔드)

## 🎯 프로젝트 소개

프리랜서와 개인사업자를 위한 AI 대화형 가계부 프론트엔드입니다.

### 주요 기능

- 📊 **대시보드**: 최근 12개월 수입/지출 차트
- 📚 **장부 관리**: 개인/사업 장부 분리 관리
- 💰 **거래 내역**: 계정별 거래 내역 조회
- 📈 **재무제표**: 손익계산서, 재무상태표, 현금흐름표

## 🛠️ 기술 스택

- **React 18** + TypeScript
- **Vite** - 빌드 도구
- **TailwindCSS** - 스타일링
- **Recharts** - 차트 라이브러리
- **React Router** - 라우팅

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 📁 프로젝트 구조

```
src/
├── components/       # 공통 컴포넌트
│   ├── Navbar.tsx
│   └── TransactionModal.tsx
├── pages/           # 페이지 컴포넌트
│   ├── DashboardPage.tsx
│   ├── BooksPage.tsx
│   ├── LoginPage.tsx
│   └── StatisticsPage.tsx
├── data/            # 더미 데이터
│   └── dummyData.ts
└── App.tsx
```

## 🔗 관련 저장소

- Backend: [personal-accounting](링크)

## 📝 개발 상태

- [x] 대시보드 (차트)
- [x] 장부 페이지
- [x] 거래 내역 모달
- [x] 재무제표
- [ ] API 연동
- [ ] 인증 처리
- [ ] AI 채팅

## 👨‍💻 개발자

**이지윤** (Jiyun Lee)

- Email: poi20701556@gmail.com
- GitHub: [@leejiyun1](https://github.com/leejiyun1)

## 📄 라이선스

MIT License
