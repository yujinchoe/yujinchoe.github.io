# 최유진 포트폴리오

**Codyssey 마리너 2기 최유진의 웹 포트폴리오**입니다. 자기주도·동료학습과 프로젝트 기반 학습을 통해 AI·SW 아이디어를 작동하는 결과물로 구현하는 과정을 소개합니다. Codyssey는 프로젝트 중심 문제 해결과 동료 학습을 통해 AI·SW 실무 역량을 기르는 교육 과정입니다 ([Codyssey 교육과정](https://codyssey.kr/apply/course)).

**사이트:** [https://yujinchoe.github.io](https://yujinchoe.github.io)  
**GitHub:** [github.com/choe-yujin](https://github.com/choe-yujin)

## 화면

| 데스크톱 | 모바일 |
| --- | --- |
| ![데스크톱 화면](images/desktop.png) | ![모바일 화면](images/mobile.png) |

### 다크 모드

![다크 모드 화면](images/dark-mode.png)

## 주요 기능

- 모바일·태블릿·데스크톱 화면에 대응하는 반응형 레이아웃
- 다크/라이트 테마 전환 및 `localStorage` 설정 유지, 저장값이 없을 때 시스템 테마 감지
- 모바일 내비게이션, 부드러운 섹션 이동, 스크롤 등장 효과, 맨 위로 버튼
- Hero 문구 타이핑 효과와 모션 감소 설정 대응
- GitHub REST API를 이용한 저장소 카드 렌더링, 언어별 필터, 로딩·성공·오류·빈 상태 표시
- 문의 폼의 필수 입력 및 이메일 검증, Formspree 제출 중·성공·실패 상태 표시

## 사용 기술과 파일 구조

HTML, CSS, 순수 JavaScript를 사용했습니다. 콘텐츠 구조, 화면 표현, 동작 로직을 각각 분리해 브라우저가 렌더링하는 역할과 수정 지점을 명확하게 했습니다.

```text
├── index.html       # 시맨틱 콘텐츠 구조와 폼
├── css/style.css    # 디자인 토큰, 테마, 레이아웃, 반응형 스타일
├── js/main.js       # 상태, 이벤트, GitHub API, 폼 전송 및 DOM 렌더링
├── images/          # 제출 화면 캡처
└── README.md        # 프로젝트 및 구현 설명
```

## 구조와 구현 설명

### 시맨틱 HTML과 CSS

- `<header>`와 `<nav>`는 공통 머리말과 탐색을, `<main>`은 주요 콘텐츠를, `<section>`은 주제별 영역을, `<article>`은 독립된 프로젝트 카드를, `<footer>`는 페이지 끝 정보를 나타냅니다. 태그는 모양이 아니라 콘텐츠의 역할에 따라 선택했습니다.
- `:root`의 CSS 변수로 색상, 글꼴, 간격, 그림자를 관리하고 `[data-theme="dark"]`에서 테마 값을 바꿉니다. 반복되는 디자인 값을 한 곳에서 조정하고 테마 간 일관성을 유지할 수 있습니다.
- Flexbox는 헤더와 한 방향 정렬이 필요한 요소에, Grid는 About/Contact 배치와 프로젝트 카드 목록에 적용했습니다. 프로젝트 목록은 `auto-fit`과 `minmax()`로 가용 폭에 맞춰 열 수를 조정합니다.
- 모바일 화면을 기본으로 작성하고 600px, 768px, 1024px 미디어 쿼리에서 화면이 넓어질 때 필요한 레이아웃을 추가합니다.

### 이벤트 → 상태 변경 → 화면 업데이트

`STATE` 객체에 테마, 메뉴, 저장소 요청, 선택 필터, 타이핑, 폼 값을 모읍니다. 이벤트 핸들러가 상태를 변경한 다음 DOM 또는 CSS 테마 속성을 갱신하도록 구성했습니다. 이벤트는 HTML 인라인 `onclick` 대신 `addEventListener()`로 연결해 마크업과 동작을 분리했습니다.

**테마 전환:** 토글 버튼의 `click` → `setTheme()`에서 `STATE.theme` 변경 및 저장 → `<html>`의 `data-theme`과 버튼 아이콘 갱신 → CSS 변수에 따른 전체 색상 변경.

**GitHub API:** `loadProjects()`가 로딩 상태를 렌더링한 뒤 `fetch()`와 `async/await`로 저장소를 요청합니다. `try/catch`에서 성공과 실패를 나누고, 응답 데이터는 `filter()`로 제외할 저장소를 거른 후 `map()`으로 카드 UI로 변환합니다. 언어 목록은 `map()`과 `Set`으로 중복을 제거하며, 선택된 언어는 `filter()`로 카드 목록에 적용합니다.

**문의 폼:** `input` 이벤트 → `STATE.form` 및 오류 상태 갱신 → 각 입력 근처의 메시지와 `aria-invalid` 업데이트. `submit` 이벤트는 필수값과 이메일을 다시 검사하고, 유효한 데이터만 Formspree에 `fetch()`로 전달합니다. 응답에 따라 제출 중·성공·실패 메시지를 표시합니다.

## GitHub 공개 저장소에서 확인한 기술

| 기술 | 관련 저장소 |
| --- | --- |
| Java, JavaScript, HTML, CSS | [`backend_basic`](https://github.com/choe-yujin/backend_basic) |
| Kotlin | [`android-kids-story-app`](https://github.com/choe-yujin/android-kids-story-app) |
| Python | [`recipe-ai-embeddings`](https://github.com/choe-yujin/recipe-ai-embeddings) |
| Dart | [`flutter_recipe`](https://github.com/choe-yujin/flutter_recipe) |
| TypeScript, GLSL, CSS, JavaScript | [`vr-art-platform-webar-viewer`](https://github.com/choe-yujin/vr-art-platform-webar-viewer) |
| Java, PL/pgSQL | [`vr-art-platform-backend`](https://github.com/choe-yujin/vr-art-platform-backend), [`email-management-system`](https://github.com/choe-yujin/email-management-system) |
| HTML | [`taletail`](https://github.com/choe-yujin/taletail) |
