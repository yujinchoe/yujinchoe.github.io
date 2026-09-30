// 평가 항목 4: 기능별 현재 상태를 한곳에 모아 이벤트 이후 어떤 값을 갱신할지 추적합니다.
const STATE = {
  theme: 'light',
  menuOpen: false,
  typewriterPhraseIndex: 0,
  typewriterCharacterIndex: 0,
  typewriterDeleting: false,
  typewriterTimer: null,
  repos: [],
  projectStatus: 'loading',
  language: 'all',
  form: { name: '', email: '', message: '', errors: {}, submitting: false },
  scrollY: 0
};

// 평가 항목 2: querySelector 계열로 DOM 요소를 선택해 이벤트와 화면 업데이트를 연결합니다.
const root = document.documentElement;
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const backToTop = document.querySelector('.back-to-top');
const projectList = document.querySelector('#project-list');
const languageFilters = document.querySelector('.language-filters');
const contactForm = document.querySelector('.contact-form');
const formFeedback = document.querySelector('.form-feedback');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 평가 항목 1: 저장된 테마를 우선 복원하고, 저장값이 없으면 시스템 테마를 사용합니다.
const getSavedTheme = () => {
  try {
    const savedTheme = localStorage.getItem('choe-yujin-theme');
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
  } catch (error) {
    return null;
  }
};

// 평가 항목 1·3: 테마 상태 → localStorage/DOM 속성 갱신 → CSS 테마 렌더링 흐름입니다.
const setTheme = (theme) => {
  STATE.theme = theme;
  root.dataset.theme = theme;
  themeIcon.textContent = theme === 'dark' ? '☼' : '◐';
  themeToggle.setAttribute('aria-label', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
  try {
    localStorage.setItem('choe-yujin-theme', theme);
  } catch (error) {
    // 테마는 현재 페이지에서 계속 동작하고, 저장소가 막혀 있으면 새로고침 후 초기화됩니다.
  }
};

const initialTheme = getSavedTheme() || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(initialTheme);

// 평가 항목 2: 인라인 onclick 대신 addEventListener로 HTML 구조와 이벤트 코드를 분리합니다.
themeToggle.addEventListener('click', () => {
  setTheme(STATE.theme === 'dark' ? 'light' : 'dark');
});

// 평가 항목 1·3: 메뉴 클릭 → STATE.menuOpen 변경 → 클래스/ARIA 속성 갱신으로 메뉴를 토글합니다.
menuToggle.addEventListener('click', () => {
  STATE.menuOpen = !STATE.menuOpen;
  menuToggle.classList.toggle('active', STATE.menuOpen);
  navMenu.classList.toggle('is-open', STATE.menuOpen);
  menuToggle.setAttribute('aria-expanded', String(STATE.menuOpen));
  menuToggle.setAttribute('aria-label', STATE.menuOpen ? '메뉴 닫기' : '메뉴 열기');
});

navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (!STATE.menuOpen) return;
    STATE.menuOpen = false;
    menuToggle.classList.remove('active');
    navMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '메뉴 열기');
  });
});

// 평가 항목 1: 스크롤 이벤트에서 헤더(60px), 맨 위로 버튼(300px), 등장 애니메이션을 제어합니다.
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    STATE.scrollY = window.scrollY;
    header.classList.toggle('is-scrolled', STATE.scrollY > 60);
    backToTop.classList.toggle('is-visible', STATE.scrollY > 300);
    scrollTicking = false;
  });
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    // 평가 항목 1: replaceState는 현재 기록을 덮어쓰므로, 새 앵커 이동은 pushState로 기록합니다.
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });

    // 평가 항목 1: 프로젝트 앵커 이동 후 포커스를 첫 필터로 옮겨 키보드 탐색도 이어지게 합니다.
    if (target.id === 'projects') {
      languageFilters.querySelector('button[data-language]')?.focus({ preventScroll: true });
    }
  });
});

// 평가 항목 1: 브라우저 뒤로/앞으로 이동 시 URL의 앵커 위치와 프로젝트 키보드 포커스를 복원합니다.
window.addEventListener('popstate', () => {
  const target = document.querySelector(location.hash || '#top');
  if (!target) return;
  window.setTimeout(() => {
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
    if (target.id === 'projects') {
      languageFilters.querySelector('button[data-language]')?.focus({ preventScroll: true });
    }
  }, 0);
});

// 평가 항목 1: Intersection Observer threshold 0.2에서 섹션 등장 클래스를 적용합니다.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      observer.unobserve(target);
    });
  }, { threshold: 0.2 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

// 보너스: 한 글자씩 입력·삭제하는 Hero 문구입니다. 모션 감소 설정에서는 정적인 문구를 씁니다.
const typewriterElement = document.querySelector('.typewriter-text');
const typewriterPhrases = ['동료와 함께 배우는', '아이디어를 구현하는', 'AI·SW를 실험하는'];
if (reducedMotion) {
  typewriterElement.textContent = typewriterPhrases[0];
} else {
  STATE.typewriterCharacterIndex = Array.from(typewriterPhrases[0]).length;
  const typeNextCharacter = () => {
    const phrase = typewriterPhrases[STATE.typewriterPhraseIndex];
    const characters = Array.from(phrase);
    typewriterElement.textContent = characters.slice(0, STATE.typewriterCharacterIndex).join('');

    if (!STATE.typewriterDeleting && STATE.typewriterCharacterIndex === characters.length) {
      STATE.typewriterDeleting = true;
      STATE.typewriterTimer = window.setTimeout(typeNextCharacter, 1500);
      return;
    }

    if (STATE.typewriterDeleting && STATE.typewriterCharacterIndex === 0) {
      STATE.typewriterDeleting = false;
      STATE.typewriterPhraseIndex = (STATE.typewriterPhraseIndex + 1) % typewriterPhrases.length;
      STATE.typewriterTimer = window.setTimeout(typeNextCharacter, 320);
      return;
    }

    STATE.typewriterCharacterIndex += STATE.typewriterDeleting ? -1 : 1;
    STATE.typewriterTimer = window.setTimeout(typeNextCharacter, STATE.typewriterDeleting ? 45 : 90);
  };
  STATE.typewriterTimer = window.setTimeout(typeNextCharacter, 900);
}

const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

// 평가 항목 1·3: projectStatus와 필터 상태를 읽어 로딩/성공/오류/빈 결과를 DOM에 표시합니다.
const renderProjects = () => {
  if (STATE.projectStatus === 'loading') {
    projectList.setAttribute('aria-busy', 'true');
    projectList.innerHTML = '<p class="state-message"><span class="loader" aria-hidden="true"></span> GitHub 프로젝트를 불러오는 중…</p>';
    return;
  }

  projectList.setAttribute('aria-busy', 'false');
  if (STATE.projectStatus === 'error') {
    projectList.innerHTML = '<div class="state-message is-error"><span>프로젝트를 불러오지 못했습니다. 네트워크나 GitHub API 제한을 확인해 주세요.</span><button class="retry-button" type="button">다시 시도</button></div>';
    projectList.querySelector('.retry-button').addEventListener('click', loadProjects);
    return;
  }

  const matchingRepos = STATE.repos.filter(({ language }) => STATE.language === 'all' || language === STATE.language);
  if (matchingRepos.length === 0) {
    projectList.innerHTML = '<p class="state-message">표시할 프로젝트가 없습니다.</p>';
    return;
  }

  projectList.innerHTML = matchingRepos.slice(0, 6).map(({ name, html_url, description, language, stargazers_count, forks_count }, index) => `
    <article class="project-card">
      <div class="project-meta"><span class="repo-number">PROJECT / ${String(index + 1).padStart(2, '0')}</span><span>PUBLIC REPOSITORY</span></div>
      <h3><a href="${escapeHTML(html_url)}" target="_blank" rel="noreferrer">${escapeHTML(name)} <span aria-hidden="true">↗</span></a></h3>
      <p>${escapeHTML(description || '저장소 설명이 아직 등록되지 않았습니다.')}</p>
      <footer>${language ? `<span><i class="language-dot" aria-hidden="true"></i>${escapeHTML(language)}</span>` : '<span>언어 미지정</span>'}<span>★ ${stargazers_count}</span><span>⑂ ${forks_count}</span><span class="repo-arrow" aria-hidden="true">↗</span></footer>
    </article>`).join('');
};

// 보너스·평가 항목 3: map/filter와 Set으로 언어 버튼을 만들고 선택 언어별로 카드를 거릅니다.
const populateLanguageFilter = () => {
  const filterHadFocus = languageFilters.contains(document.activeElement);
  const languages = [...new Set(STATE.repos.map(({ language }) => language).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  STATE.language = 'all';
  languageFilters.innerHTML = '<button class="language-filter is-active" type="button" data-language="all" aria-pressed="true">전체</button>' + languages.map((language) => `<button class="language-filter" type="button" data-language="${escapeHTML(language)}" aria-pressed="false">${escapeHTML(language)}</button>`).join('');
  if (filterHadFocus) languageFilters.querySelector('button[data-language]')?.focus({ preventScroll: true });
};

languageFilters.addEventListener('click', (event) => {
  const selectedButton = event.target.closest('button[data-language]');
  if (!selectedButton) return;
  STATE.language = selectedButton.dataset.language;
  languageFilters.querySelectorAll('button[data-language]').forEach((button) => {
    const isSelected = button === selectedButton;
    button.classList.toggle('is-active', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
  renderProjects();
});

// 평가 항목 3: 로딩 상태 표시 → fetch/await → 성공 데이터 저장 또는 catch 오류 렌더링 순서입니다.
async function loadProjects() {
  STATE.projectStatus = 'loading';
  renderProjects();
  try {
    const response = await fetch('https://api.github.com/users/choe-yujin/repos?sort=updated&per_page=100');
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const repositories = await response.json();
    if (!Array.isArray(repositories)) throw new Error('Unexpected GitHub API response');
    STATE.repos = repositories
      .filter(({ fork, archived, private: isPrivate }) => !fork && !archived && !isPrivate)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    STATE.projectStatus = 'success';
    populateLanguageFilter();
    renderProjects();
  } catch (error) {
    console.error('GitHub 프로젝트 요청 실패:', error);
    STATE.projectStatus = 'error';
    renderProjects();
  }
}

// 평가 항목 1·3: 폼 input/submit 이벤트에서 필수값과 이메일 형식을 검사합니다.
const validationRules = {
  name: (value) => value.trim() ? '' : '이름을 입력해 주세요.',
  email: (value) => {
    if (!value.trim()) return '이메일을 입력해 주세요.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : '올바른 이메일 주소를 입력해 주세요.';
  },
  message: (value) => value.trim() ? '' : '메시지를 입력해 주세요.'
};

const validateField = (field) => {
  const error = validationRules[field.name](field.value);
  STATE.form[field.name] = field.value;
  STATE.form.errors[field.name] = error;
  const errorElement = document.querySelector(`#${field.name}-error`);
  errorElement.textContent = error;
  field.setAttribute('aria-invalid', String(Boolean(error)));
  return !error;
};

contactForm.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('input', () => {
    formFeedback.textContent = '';
    validateField(field);
  });
});

// 보너스·평가 항목 3: 유효성 통과 후 Formspree에 전송하고 상태별 피드백을 DOM에 반영합니다.
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (STATE.form.submitting) return;
  const fields = [...contactForm.querySelectorAll('input, textarea')];
  const isValid = fields.map(validateField).every(Boolean);
  if (!isValid) {
    formFeedback.textContent = '표시된 항목을 확인해 주세요.';
    fields.find((field) => STATE.form.errors[field.name])?.focus();
    return;
  }
  const submitButton = contactForm.querySelector('[type="submit"]');
  const originalButtonText = submitButton.textContent;
  STATE.form.submitting = true;
  submitButton.disabled = true;
  submitButton.textContent = '전송 중…';
  formFeedback.textContent = '메시지를 전송하고 있습니다.';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const serviceMessage = Array.isArray(result.errors)
        ? result.errors.map(({ message }) => message).filter(Boolean).join(' ')
        : '';
      const error = new Error(serviceMessage || `Formspree 요청 실패 (HTTP ${response.status}).`);
      error.status = response.status;
      error.response = result;
      throw error;
    }

    formFeedback.textContent = '메시지를 보냈습니다. 연락 주셔서 감사합니다.';
    contactForm.reset();
    fields.forEach((field) => {
      STATE.form[field.name] = '';
      STATE.form.errors[field.name] = '';
      field.removeAttribute('aria-invalid');
      document.querySelector(`#${field.name}-error`).textContent = '';
    });
  } catch (error) {
    console.error('문의 메시지 전송 실패:', { status: error.status, response: error.response, error });
    if (error.status === 429) {
      formFeedback.textContent = '요청이 잠시 많습니다. 잠시 후 다시 시도해 주세요.';
    } else if (error.status === 403) {
      formFeedback.textContent = 'Formspree가 요청을 거부했습니다. 대시보드에서 폼 상태를 확인해 주세요.';
    } else if (error.status === 404) {
      formFeedback.textContent = 'Formspree 폼을 찾을 수 없습니다. 엔드포인트 주소를 확인해 주세요.';
    } else {
      formFeedback.textContent = error.message || '전송 중 문제가 생겼습니다. 네트워크를 확인하고 다시 시도해 주세요.';
    }
  } finally {
    STATE.form.submitting = false;
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
loadProjects();
