# Hanaro Project

## 📚 개요
Hanaro는 **Next.js**와 **TypeScript**를 기반으로 개발된 기술 블로그 프로젝트입니다. 일반 사용자와 관리자를 위한 차별화된 기능을 제공합니다. 주요 기능으로는 게시글 탐색, 좋아요/싫어요 반응 기능, 관리자 페이지에서 게시글 및 사용자 관리 기능이 포함됩니다.

---

## 🛠 기술 스택
- **프레임워크**: [Next.js](https://nextjs.org/) (v15.3.3)
- **언어**: TypeScript (v5.8.3)
- **스타일**: TailwindCSS
- **데이터베이스**: MySQL
- **ORM**: Prisma
- **인증/인가**: Next-Auth + Role 기반 접근제어
- **페치 API**: 서버와 클라이언트 간 데이터 교환을 위한 Fetch 사용

---

## ✨ 주요 기능
### 사용자 기능
1. **게시글 탐색**
   - 최신 게시글 보기: 각 기술 카테고리(Javascript, TypeScript, React, 기타)의 최신 게시글이 표시됩니다.
   - 카테고리별 게시글 보기: 사용자가 선택한 카테고리에 속하는 게시글 리스트를 제공합니다.
   - 게시글 검색: 제목이나 내용으로 게시글 검색이 가능합니다.

2. **게시글 검색**
   - 제목 또는 내용에 포함되는 단어를 검색해서 게시글을 찾아볼 수 있습니다.

2. **게시글 상세 보기**
   - 게시글 제목, 작성자, 생성 날짜와 같은 주요 정보 확인
   - 좋아요/싫어요 버튼으로 게시글에 대한 반응 제공

3. **좋아요 / 싫어요 버튼**
   - 게시글에 좋아요/싫어요로 피드백 제공
   - 클릭 시 서버에 데이터 업데이트 및 새 카운트 값 자동 반영

### 관리자 기능
1. **Role 기반 접근 제어**
   - `Role` 필드를 기반으로 일반 사용자(`USER`)와 관리자(`ADMIN`)를 구분
   - 관리 권한이 있는 사용자만 관리자 페이지에 접근 가능

2. **사용자 관리**
   - 사용자는 `Admin` 페이지에서 목록을 확인하고 관리할 수 있음

3. **게시글 관리**
   - 게시글 생성, 수정, 삭제 기능 제공
   - 특정 카테고리로 게시글 분류 가능
   - 사용자 게시글을 검토한 뒤 승인 또는 비승인 처리 가능

---

## 📥 설치 및 실행 방법

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경 변수 설정**
   `.env.example` 파일을 참고하여 `.env` 파일 생성 후 데이터베이스 및 기타 옵션을 설정합니다.

3. **데이터베이스 초기화**
   ```bash
   npx prisma migrate dev
   ```

4. **관리자 계정 생성**
   `Prisma Studio` 등을 활용하여 초기 관리자 계정을 생성하세요. 예:
   ```prisma
   INSERT INTO User (id, name, email, role) VALUES ('unique-id', 'Admin', 'admin@example.com', 'ADMIN');
   ```

5. **개발 서버 실행**
   ```bash
   yarn dev
   ```
   브라우저에서 [http://localhost:3000]를 통해 확인하세요.

---

## 📜 주요 스크립트
- `dev`: 개발 서버 실행
- `build`: 프로젝트 빌드
- `start`: 빌드된 프로젝트 실행
- `lint`: 코드 린트 검사

---

## 📄 주요 API
1. **좋아요 API**  
   - Endpoint: `POST /api/post/[id]/like`  
   - 설명: 게시글의 `likeCount`를 1 증가시킵니다.
   
2. **싫어요 API**  
   - Endpoint: `POST /api/post/[id]/dislike`  
   - 설명: 게시글의 `dislikeCount`를 1 증가시킵니다.
   
3. **게시글 조회 API**
   - Endpoint: `GET /api/post?category=[CATEGORY]`
   - 설명: 특정 카테고리에 속하는 게시글 목록을 반환합니다.

4. **사용자 관리 API**
   - Endpoint: `GET /api/admin/users`
   - 설명: 관리자 페이지에서 사용자 목록을 가져옵니다.
   - **권한 필요**: `Role: ADMIN`

---

## 🖋️ 컨벤션
- **코드 스타일**: ESLint, Prettier 사용
- **커밋 메시지**: [Conventional Commits](https://www.conventionalcommits.org/) 규칙 준수

---

## 📄 Prisma 모델
- **User 모델**: 사용자 정보를 저장하며 Role 속성을 통해 권한 부여
- **Post 모델**: 게시글 정보를 저장하며 작성자와 카테고리가 매핑
- **Role 열거형**: `ADMIN`과 `USER`로 구분

---

## 📄 라이선스
이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.