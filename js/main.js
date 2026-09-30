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

const getSavedTheme = () => {
  try {
    const savedTheme = localStorage.getItem('choe-yujin-theme');
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
  } catch (error) {
    return null;
  }
};

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

themeToggle.addEventListener('click', () => {
  setTheme(STATE.theme === 'dark' ? 'light' : 'dark');
});

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
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', link.getAttribute('href'));
  });
});

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

const populateLanguageFilter = () => {
  const languages = [...new Set(STATE.repos.map(({ language }) => language).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  STATE.language = 'all';
  languageFilters.innerHTML = '<button class="language-filter is-active" type="button" data-language="all" aria-pressed="true">전체</button>' + languages.map((language) => `<button class="language-filter" type="button" data-language="${escapeHTML(language)}" aria-pressed="false">${escapeHTML(language)}</button>`).join('');
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
