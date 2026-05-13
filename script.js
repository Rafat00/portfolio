/* ============================================================
   SCRIPT.JS — BUB Rafat Portfolio
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  const html           = document.documentElement;
  const navbar         = document.getElementById('navbar');
  const navToggle      = document.getElementById('navToggle');
  const navLinks       = document.getElementById('navLinks');
  const allLinks       = document.querySelectorAll('.nav-link');
  const backTop        = document.getElementById('backTop');
  const sections       = document.querySelectorAll('section[id]');
  const themeToggle    = document.getElementById('themeToggle');
  const themeIcon      = document.getElementById('themeIcon');
  const cursor         = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');

  /* ── CUSTOM CURSOR ── */
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
    });
    (function animateCursor() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursorFollower.style.transform = `translate(${followerX}px,${followerY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateCursor);
    })();
    document.querySelectorAll('a,button,.skill-pill,.edu-card,.project-card,.ccard').forEach(el => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
    });
    document.addEventListener('mouseleave', () => { cursor.style.opacity='0'; cursorFollower.style.opacity='0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity='1'; cursorFollower.style.opacity='0.5'; });
  }

  /* ── DARK / LIGHT MODE ── */
  const DARK = 'dark', LIGHT = 'light';
  applyTheme(localStorage.getItem('theme') || DARK);
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === DARK ? LIGHT : DARK;
    applyTheme(next); localStorage.setItem('theme', next);
  });
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === DARK ? '☀️' : '🌙';
  }

  /* ── NAVBAR SCROLL + ACTIVE LINKS ── */
  function handleScroll() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 20);
    backTop.classList.toggle('visible', scrollY > 500);
    let current = '';
    sections.forEach(sec => { if (scrollY >= sec.offsetTop - 120) current = sec.id; });
    allLinks.forEach(link => { link.classList.toggle('active', link.getAttribute('href') === `#${current}`); });
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── MOBILE MENU ── */
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── BACK TO TOP ── */
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.08}s`;
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal,.reveal-right').forEach(el => revealObs.observe(el));

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 8, behavior: 'smooth' });
      }
    });
  });


  /* ── CV MODAL ── */
  const cvModal    = document.getElementById('cvModal');
  const viewCvBtn  = document.getElementById('viewCvBtn');
  const cvCloseBtn = document.getElementById('cvCloseBtn');
  const cvIframe   = cvModal ? cvModal.querySelector('.cv-iframe') : null;

  function openCvModal() {
    cvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // detect iframe load failure (e.g. browser blocks inline PDF)
    if (cvIframe) {
      cvIframe.onerror = () => cvIframe.classList.add('hidden');
    }
  }
  function closeCvModal() {
    cvModal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (viewCvBtn)  viewCvBtn.addEventListener('click',  (e) => { e.preventDefault(); openCvModal(); });
  if (cvCloseBtn) cvCloseBtn.addEventListener('click', closeCvModal);
  if (cvModal)    cvModal.addEventListener('click', (e) => { if (e.target === cvModal) closeCvModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCvModal(); });

  /* ── AUTO YEAR ── */
  const yr = document.getElementById('fyear');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── STAGGERED HERO ANIMATION ── */
  document.querySelectorAll('.hero-tag,.hero-name,.hero-rule,.hero-role,.hero-intro,.hero-actions').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i*0.1+0.2}s, transform 0.6s ease ${i*0.1+0.2}s`;
    setTimeout(() => { el.style.opacity='1'; el.style.transform='none'; }, 120);
  });

});