# 📚 동양대학교 도서관 대출 관리 시스템

> React로 구현한 도서관 대출 관리 웹 애플리케이션 - CI/CD with GitHub Actions + AWS S3

---

## 📌 시스템 소개

**동양대학교 도서관 대출 관리 시스템**은 도서관의 도서 대출 및 반납 업무를 효율적으로 관리하기 위한 React 기반 정적 웹 애플리케이션입니다. 백엔드 서버 없이 브라우저의 LocalStorage를 활용하여 데이터를 저장합니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📚 도서 목록 조회 | 전체 도서를 카드 형태로 확인 |
| 🔍 도서 검색 | 제목 / 저자명으로 실시간 검색 |
| 🏷️ 카테고리 필터 | 프로그래밍, 컴퓨터과학 등 분야별 필터 |
| 📤 도서 대출 | 대출자 이름 입력 후 14일 대출 |
| 📥 도서 반납 | 대출 현황에서 즉시 반납 처리 |
| ⚠️ 연체 알림 | 반납 기한 초과 도서 시각적 표시 |
| 📜 반납 이력 | 전체 대출/반납 이력 조회 |
| 📊 대시보드 | 보유 현황, 대출 현황 통계 요약 |
| 💾 데이터 영속성 | LocalStorage 기반 데이터 저장 |

---

## 🛠 기술 스택

- **Frontend**: React 19, Vite, CSS Modules
- **데이터 저장**: LocalStorage (브라우저)
- **CI/CD**: GitHub Actions
- **호스팅**: AWS S3 (정적 웹 사이트 호스팅)

---

## 🚀 GitHub Actions CI/CD 구성

### 동작 흐름

```
코드 Push (main 브랜치)
    ↓
GitHub Actions 트리거
    ↓
Node.js 환경 설정
    ↓
npm install (의존성 설치)
    ↓
npm run build (React 앱 빌드 → dist/ 폴더 생성)
    ↓
AWS 자격증명 설정 (Secrets 활용)
    ↓
AWS S3 동기화 배포 (aws s3 sync)
```

### 워크플로우 파일 위치

`.github/workflows/deploy.yml`

### 필요한 GitHub Secrets

GitHub 레포지토리 → Settings → Secrets and variables → Actions에 아래 값을 등록:

| Secret 이름 | 설명 |
|-------------|------|
| `AWS_ACCESS_KEY_ID` | AWS Academy Access Key ID |
| `AWS_SECRET_ACCESS_KEY` | AWS Academy Secret Access Key |
| `AWS_SESSION_TOKEN` | AWS Academy Session Token |
| `S3_BUCKET_NAME` | S3 버킷 이름 (예: `mybucket-20190799`) |

### AWS S3 설정

1. S3 버킷 생성: `mybucket-20190799`
2. 퍼블릭 액세스 차단 해제
3. 버킷 정책 설정 (PublicReadGetObject)
4. 정적 웹 사이트 호스팅 활성화 (인덱스 문서: `index.html`)

---

## 💻 로컬 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 🌐 배포 URL

> AWS S3 정적 웹 사이트 호스팅 URL (세션 4시간 유효)
>
> `http://mybucket-20263836.s3-website-us-east-1.amazonaws.com`

---

## 📁 프로젝트 구조

```
library-loan-system/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD 워크플로우
├── src/
│   ├── components/
│   │   ├── Header.jsx          # 헤더 & 탭 네비게이션
│   │   ├── Dashboard.jsx       # 통계 대시보드
│   │   ├── BookList.jsx        # 도서 목록 & 검색
│   │   ├── BorrowModal.jsx     # 대출 모달
│   │   ├── LoanList.jsx        # 대출 현황
│   │   └── History.jsx         # 반납 이력
│   ├── data/
│   │   └── books.js            # 초기 도서 데이터
│   ├── hooks/
│   │   └── useLibrary.js       # 도서관 상태 관리 훅
│   ├── App.jsx                 # 루트 컴포넌트
│   └── main.jsx                # 진입점
├── vite.config.js
└── package.json
```

---

## 🎬 시연 영상

> GitHub Actions를 활용한 CI/CD 구축 시연 영상
>
> *(YouTube 링크 추가 예정)*

---

## 👨‍💻 개발자

- **학번**: 20190799
- **이름**: 남정현
- **학교**: 동양대학교 소프트웨어학과
