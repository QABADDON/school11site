document.addEventListener('DOMContentLoaded', () => {
  const regOverlay = document.getElementById('registrationOverlay');
  const closeRegBtn = document.getElementById('closeRegistration');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const detailOverlay = document.getElementById('detailOverlay');
  const detailClose = document.getElementById('detailClose');
  const detailTitle = document.getElementById('detailTitle');
  const detailMeta = document.getElementById('detailMeta');
  const detailText = document.getElementById('detailText');
  const detailTag = document.getElementById('detailTag');

  const themeToggles = document.querySelectorAll('[data-theme-toggle]');
  const openRegButtons = document.querySelectorAll('[data-open-registration]');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      themeToggles.forEach(btn => btn.textContent = 'Светлая тема');
    } else {
      document.documentElement.classList.remove('dark');
      themeToggles.forEach(btn => btn.textContent = 'Тёмная тема');
    }
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  });

  function openReg() {
    if (!regOverlay) return;
    regOverlay.classList.add('overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeReg() {
    if (!regOverlay) return;
    regOverlay.classList.remove('overlay--visible');
    document.body.style.overflow = '';
  }

  openRegButtons.forEach(btn => btn.addEventListener('click', openReg));
  if (closeRegBtn) closeRegBtn.addEventListener('click', closeReg);
  if (regOverlay) {
    regOverlay.addEventListener('click', e => {
      if (e.target === regOverlay) closeReg();
    });
  }

  function openDetail(tag, title, meta, text) {
    if (!detailOverlay) return;
    if (detailTag) detailTag.textContent = tag || 'Подробнее';
    if (detailTitle) detailTitle.textContent = title || '';
    if (detailMeta) detailMeta.textContent = meta || '';
    if (detailText) detailText.textContent = text || '';
    detailOverlay.classList.add('overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    if (!detailOverlay) return;
    detailOverlay.classList.remove('overlay--visible');
    document.body.style.overflow = '';
  }

  if (detailClose) {
    detailClose.addEventListener('click', closeDetail);
  }
  if (detailOverlay) {
    detailOverlay.addEventListener('click', e => {
      if (e.target === detailOverlay) closeDetail();
    });
  }

  document.querySelectorAll('.js-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openDetail(
        btn.dataset.tag,
        btn.dataset.title,
        btn.dataset.meta,
        btn.dataset.text
      );
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (regOverlay && regOverlay.classList.contains('overlay--visible')) closeReg();
      if (detailOverlay && detailOverlay.classList.contains('overlay--visible')) closeDetail();
    }
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
    });
  }

  if (nav) {
    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();
          nav.classList.remove('nav--open');

          const header = document.querySelector('header');
          const headerOffset = header ? header.offsetHeight : 72;

          const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
});