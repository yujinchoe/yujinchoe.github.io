# Choe Yujin — Web Portfolio

최유진의 포트폴리오입니다. Codyssey 마리너 2기로서 자기주도·동료학습과 프로젝트 기반 문제 해결을 통해 AI·SW 역량을 쌓는 과정을 소개합니다. Codyssey는 자기주도 학습, 동료 피드백, 프로젝트 중심 학습으로 산업 현장형 AI·SW 인재를 기르는 교육 플랫폼입니다 ([Codyssey 교육과정 안내](https://codyssey.kr/apply/course)).

페이지는 순수 HTML, CSS, JavaScript로 만들었습니다. GitHub 공개 저장소를 API로 표시하고, Hero 문구 타이핑 효과, 테마, 메뉴, 스크롤, 입력 폼 상태를 구현합니다.

## 제출 상태

| 요구 항목 | 현재 상태 | 확인 위치 |
| --- | --- | --- |
| Hero, About, Skills, Projects, Contact, Footer | 구현됨 | `index.html` |
| 모바일 메뉴, 앵커 이동, 위로 가기, 스크롤 등장 효과 | 구현됨 | `js/main.js`, `css/style.css` |
| 다크 모드와 새로고침 후 설정 유지 | 구현됨 | `js/main.js`, `css/style.css` |
| GitHub API 프로젝트, 로딩/오류/빈/성공 상태 | 구현됨 | `js/main.js` |
| GitHub API 언어별 알약 버튼 필터 | 구현됨 | `index.html`, `js/main.js`, `css/style.css` |
| 문의 폼 필수값 및 이메일 검사 | 구현됨 | `index.html`, `js/main.js` |
| Hero 타이핑 효과 (보너스) | 구현됨 | `index.html`, `js/main.js`, `css/style.css` |
| 언어별 프로젝트 필터 (보너스) | 구현됨 | `index.html`, `js/main.js` |
| Formspree 실제 이메일 전송 (보너스) | 구현됨 | `index.html`, `js/main.js` |
| 시스템 테마 감지 (보너스) | 구현됨 | `js/main.js` |
| 모바일/태블릿/데스크톱 반응형 | 코드상 구현됨 | `css/style.css` |
| GitHub Pages 배포 URL | 남음 | 아래 배포 절차 |
| 데스크톱/모바일/다크 모드 캡처 | 남음 | `images/` |

배포와 캡처는 실제 GitHub 저장소 및 브라우저에서 진행해야 합니다. 현재는 코드가 준비된 상태이며, 배포 주소나 실제 브라우저 화면이 아직 포함되어 있지 않습니다. 코드는 정적 기준으로 확인했으며 브라우저별 동작 확인은 별도로 진행해야 합니다.

## 실행 방법

1. 이 폴더를 VS Code에서 엽니다.
2. `index.html`을 Live Server로 실행합니다.
3. GitHub API 호출을 확인하려면 인터넷에 연결합니다.

인증 없는 GitHub API 요청은 시간당 호출 제한이 있습니다. API가 HTTP 오류를 반환하거나 네트워크 요청이 실패하면 에러와 다시 시도 버튼을 표시합니다.

## 프로젝트 구조와 파일 분리 이유

```text
choe-yujin-portfolio/
├── index.html       # 의미 있는 콘텐츠 구조와 접근성 연결
├── css/
│   └── style.css    # 색상/간격 변수, 레이아웃, 테마, 반응형 규칙
├── js/
│   └── main.js      # 상태, 이벤트, API, 폼 검사, DOM 업데이트
├── images/          # 프로필 등 로컬 이미지와 제출 캡처
└── README.md        # 실행 방법과 평가 발표 설명
```

HTML은 콘텐츠 구조, CSS는 보이는 모양, JavaScript는 사용자 동작을 담당합니다. 역할을 파일별로 나누면 필요한 부분을 빠르게 찾고 바꿀 수 있으며, HTML의 `defer` 스크립트가 문서 분석을 막지 않고 실행되는 것도 확인할 수 있습니다.

## 평가 항목별 설명

### 과제 요구사항 전체 점검

| 미션 요구사항 | 확인 |
| --- | --- |
| HTML, CSS, JavaScript 및 `images/` 폴더 분리, 외부 파일 연결 | 완료 |
| `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` 사용 | 완료 |
| Hero/About/Skills/Projects/Contact/Footer와 섹션 앵커 | 완료 |
| 모든 이미지에 의미 있는 `alt`, 모든 입력에 연결된 `<label>` | 완료 |
| `:root` 토큰, `[data-theme="dark"]`, Flex 내비게이션 | 완료 |
| 프로젝트 카드 Grid의 `auto-fit` + `minmax()` 반응형 배치 | 완료 |
| 모바일 퍼스트, 768px/1024px 구간, 모바일 햄버거 메뉴 | 완료 |
| 버튼/카드 hover와 transition, 카드 그림자 | 완료 |
| `defer`, `const`/`let`, 인라인 `onclick` 없음 | 완료 |
| DOM 선택/수정, `click`/`submit`/`scroll`/`input` 이벤트 | 완료 |
| `map`, `filter`, `forEach`, 화살표 함수, 템플릿 리터럴, 구조분해 할당 | 완료 |
| `fetch` + `async/await` + `try/catch`, 네 가지 API 화면 상태 | 완료 |
| 상태 객체로 관리하는 테마/API/폼의 상태→렌더 흐름 | 완료 |
| 다크 모드 저장, 스크롤 임계값, Intersection Observer 임계값 | 완료 |
| 보너스: Hero 타이핑 효과, 언어 필터, 시스템 테마 감지, Formspree 실제 전송 | 코드 연결 완료 |
| GitHub Pages 실제 배포 URL | 아직 없음 |
| 데스크톱/모바일/다크 모드 실제 캡처 | 아직 없음 |

위 표에서 코드 구현과 외부 제출 절차를 구분했습니다. 마지막 두 항목은 배포 저장소와 브라우저 캡처가 있어야 완료할 수 있습니다.

### GitHub 저장소를 바탕으로 정리한 기술

공개 저장소의 GitHub 언어 통계를 확인해 실제 코드에서 사용 중인 기술을 적었습니다.

| 기술 | 확인한 공개 저장소 |
| --- | --- |
| Java, JavaScript, HTML, CSS | [`backend_basic`](https://github.com/choe-yujin/backend_basic) |
| Kotlin | [`android-kids-story-app`](https://github.com/choe-yujin/android-kids-story-app) |
| Python | [`recipe-ai-embeddings`](https://github.com/choe-yujin/recipe-ai-embeddings) |
| Dart | [`flutter_recipe`](https://github.com/choe-yujin/flutter_recipe) |
| TypeScript, GLSL, CSS, JavaScript | [`vr-art-platform-webar-viewer`](https://github.com/choe-yujin/vr-art-platform-webar-viewer) |
| Java, PL/pgSQL | [`vr-art-platform-backend`](https://github.com/choe-yujin/vr-art-platform-backend), [`email-management-system`](https://github.com/choe-yujin/email-management-system) |
| HTML | [`taletail`](https://github.com/choe-yujin/taletail) |


### 1. 동작과 사용자 경험

- **반응형:** CSS는 모바일 기본 규칙으로 시작합니다. 768px에서 태블릿 정렬을 조정하고, 1024px에서 넓은 데스크톱 여백을 적용합니다. 프로젝트 Grid는 `repeat(auto-fit, minmax(min(100%, 17rem), 1fr))`로 카드 폭에 맞춰 열 수를 자동 조정합니다. 모바일에서는 링크 목록을 숨기고 햄버거 버튼으로 엽니다.
- **테마:** 테마 버튼 `click` → `setTheme()` → `STATE.theme` 변경 → `<html data-theme>` 속성과 아이콘 갱신 → CSS 변수 적용 순서입니다. 선택값은 `localStorage`에 저장되고 다시 열 때 복원됩니다. 저장값이 없으면 시스템 테마를 읽습니다.
- **Hero 타이핑 효과:** 페이지 로드 → `typeNextCharacter()`가 `STATE.typewriterCharacterIndex`, `STATE.typewriterDeleting`, `STATE.typewriterPhraseIndex`를 갱신 → `textContent` 업데이트 → 문구를 한 글자씩 입력·삭제하며 세 문장을 순환합니다. 모션 감소 설정에서는 정적인 문구로 보여 주고, 보조 기술에는 고정된 소개 문장을 제공합니다.
- **메뉴/스크롤:** 메뉴 버튼은 `classList.toggle()`로 모바일 메뉴를 엽니다. 메뉴 링크를 누르면 닫힙니다. 앵커는 부드럽게 이동하고, 60px 초과에서 헤더 배경이 바뀌며, 300px 초과에서 맨 위로 버튼이 보입니다.
- **언어 필터:** 언어별 알약 버튼을 클릭하면 `STATE.language`가 바뀌고 해당 언어 프로젝트만 렌더링합니다. 전체 버튼을 누르면 모든 프로젝트로 돌아옵니다.
- **등장 애니메이션:** Intersection Observer의 `threshold`는 `0.2`입니다. 사용자가 모션 감소를 설정하면 등장 애니메이션과 부드러운 스크롤을 줄입니다.
- **폼:** 입력 중 `input` 이벤트가 해당 필드를 검사하고 근처에 오류를 표시합니다. `submit` 시 `preventDefault()`로 페이지 이동을 막고 필수값과 이메일 형식을 확인한 뒤 Formspree로 전송합니다.
- **실제 폼 전송 (보너스):** Formspree의 `https://formspree.io/f/xaenvklo`에 `fetch`와 `FormData`로 보내며, 전송 중 버튼 비활성화, 성공·실패 상태 표시, 성공 시 입력 초기화를 처리합니다. 브라우저에서 직접 호출할 수 있도록 공개 폼 엔드포인트만 사용하며 비밀 API 키는 포함하지 않습니다.

### 2. HTML/CSS/JavaScript를 설명하는 법

- **시맨틱 태그:** 페이지 공통 머리말은 `<header>`, 탐색은 `<nav>`, 주요 콘텐츠는 `<main>`, 독립된 주제는 `<section>`, 반복되는 저장소 카드는 `<article>`, 페이지 끝 정보는 `<footer>`로 구분했습니다. 태그를 화면 모양이 아니라 콘텐츠의 역할에 맞춰 선택했습니다.
- **레이블 연결:** 각 폼 `<label for="...">` 값이 입력 요소의 `id`와 일치합니다. 스크린 리더와 입력 포커스가 항목 이름을 알 수 있습니다.
- **CSS 변수:** `:root`에 색상, 글꼴, 간격, 그림자 값을 두고 `[data-theme="dark"]`에서 색상 값만 바꿉니다. 반복 값을 한 곳에서 수정할 수 있고 테마 간 색을 일관되게 관리할 수 있습니다.
- **이벤트 연결:** HTML에는 `onclick`을 넣지 않았습니다. JavaScript의 `addEventListener()`로 동작을 연결하면 마크업과 로직이 분리되고 이벤트 처리 코드를 한 곳에서 찾을 수 있습니다. 한 요소에 여러 핸들러도 등록할 수 있습니다.
- **CSS 효과:** 버튼과 프로젝트 카드의 `:hover` 상태에 `transition`을 적용했습니다. 카드에는 기본 `box-shadow`와 hover 시 깊어진 그림자를 적용합니다.

### 3. 이벤트 → 상태 → 화면 업데이트 흐름

코드 상단의 `STATE` 객체는 테마, 모바일 메뉴 상태, 저장소 목록과 요청 상태, 필터, 폼 값과 오류를 보관합니다. 각 상호작용을 따라가며 설명할 수 있도록 구성했습니다.

#### 예시 A: GitHub API 요청

1. 페이지 시작 또는 다시 시도 버튼 클릭이 `loadProjects()`를 실행합니다.
2. `STATE.projectStatus`를 `loading`으로 바꾸고 `renderProjects()`가 로딩 문구와 스피너를 표시합니다.
3. `await fetch()`로 `https://api.github.com/users/choe-yujin/repos`를 요청합니다. `response.ok`가 아니면 예외를 던집니다.
4. 성공하면 JSON 배열을 `filter()`로 fork, 보관(archived), 비공개 저장소를 걸러내고 최신순 정렬 후 `success`로 바꿉니다.
5. 언어 목록은 `map()`으로 값을 모으고 `Set`으로 중복을 제거합니다. 선택한 언어는 `filter()`로 걸러내고, 저장소 배열의 `map()`이 카드 HTML을 만듭니다.
6. `renderProjects()`는 상태에 따라 로딩, 카드, 에러/재시도, 빈 상태 중 하나를 화면에 표시합니다. 네트워크 오류와 403 레이트 리밋도 `catch`에서 에러 상태로 처리됩니다.

#### 예시 B: 폼 유효성 검사

1. 입력 요소에서 `input` 이벤트가 발생합니다.
2. `validateField()`가 값을 `STATE.form`에 보관하고 해당 오류 문구를 `STATE.form.errors`에 기록합니다.
3. 오류 요소의 `textContent`와 입력 요소의 `aria-invalid`를 갱신해 바로 피드백을 표시합니다.
4. `submit`에서는 모든 필드를 다시 검사하고, 실패하면 첫 오류 필드에 포커스를 옮깁니다. 모두 통과하면 `fetch()`로 Formspree에 전송하고 성공/실패 응답에 따라 화면 문구를 갱신합니다.

### 4. Flexbox, Grid, STATE, 모바일 퍼스트

- **Flexbox:** 헤더의 로고/메뉴/테마 버튼처럼 한 방향으로 정렬되는 요소와 카드 내부 메타 정보를 배치합니다.
- **Grid:** 프로젝트 카드는 `repeat(..., minmax(0, 1fr))`로 넓이에 따라 열 수를 바꿉니다. About과 Contact도 두 영역을 나란히 배치합니다. 행과 열을 함께 다루는 화면에는 Grid가 적합합니다.
- **STATE 객체:** 기능별 상태를 하나의 객체에서 관리하면 화면의 조건과 업데이트 지점을 추적하기 쉽습니다. 변수를 각각 둘 수도 있지만 상태가 늘면 이름과 업데이트 위치가 분산되어 실제 화면과 값이 어긋나기 쉽습니다. 브라우저 DOM을 바꾸려면 상태 변경 후 렌더 함수를 명시적으로 호출해야 한다는 점도 확인할 수 있습니다.
- **모바일 퍼스트:** 작은 화면의 기본 레이아웃부터 작성하고, 넓은 화면에 필요한 규칙만 미디어 쿼리로 추가했습니다. 모바일에서 불필요한 데스크톱 요소를 숨기는 작업이 단순하고 좁은 화면 제약을 먼저 고려할 수 있습니다.
- **DOM/ES6 문법:** `querySelector`/`querySelectorAll`로 요소를 찾고 `textContent`, `innerHTML`, `classList`로 화면을 바꿉니다. `map()`은 저장소를 카드로, `filter()`는 숨길 저장소와 선택한 언어를 걸러내는 데, `forEach()`는 이벤트 연결과 요소 순회에 씁니다. 객체 구조분해는 API 저장소 속성과 Observer 이벤트에서 필요한 값을 추출합니다.

## 배포와 제출물

1. 이 폴더의 내용을 GitHub 저장소에 올립니다.
2. 저장소의 **Settings → Pages**에서 배포 브랜치와 폴더를 선택합니다.
3. 배포는 `yujinchoe` 계정의 새 포트폴리오 저장소를 대상으로 준비합니다. 사용자 사이트 저장소 이름이 `yujinchoe.github.io`이면 `https://yujinchoe.github.io/`, 프로젝트 저장소라면 `https://yujinchoe.github.io/저장소이름/` 형식입니다.
4. 실제 배포 주소를 아래에 입력합니다.
5. 배포 화면에서 API 성공/오류, 테마 새로고침 유지, 모바일 메뉴, 폼 오류를 확인합니다.
6. 데스크톱, 모바일, 다크 모드 화면을 캡처하여 `images/`에 아래 파일명으로 저장합니다.

계정에는 `codyssey_mission01` 저장소가 이미 있고 `Dockerfile`, `README.md`, `app/`, `screenshot/` 항목이 있으므로, 배포 확인 없이 이 저장소의 루트를 바꾸지 않습니다. 별도의 포트폴리오 저장소 이름과 Pages 설정은 정해져야 합니다.

```md
![데스크톱 화면](images/desktop.png)
![모바일 화면](images/mobile.png)
![다크 모드 화면](images/dark-mode.png)
```

**GitHub Pages URL:** 저장소를 정하고 Pages를 활성화한 뒤 입력
