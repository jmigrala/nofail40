/* ─────────────────────────────────────
   NoFail40 — Site JavaScript
   ───────────────────────────────────── */

// ── Lucide Icons ──
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
});

// ── Theme Toggle ──
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  updateIcon();

  t && t.addEventListener('click', () => {
    d = d === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', d);
    t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
    updateIcon();
  });

  function updateIcon() {
    if (!t) return;
    t.innerHTML = d === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// ── Sticky Nav Shadow ──
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  let scrolled = false;
  window.addEventListener('scroll', () => {
    const s = window.scrollY > 20;
    if (s !== scrolled) {
      scrolled = s;
      nav.classList.toggle('nav--scrolled', s);
    }
  }, { passive: true });
})();

// ── Show nav CTA after scrolling past hero ──
(function () {
  const cta = document.getElementById('nav-cta');
  if (!cta) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const observer = new IntersectionObserver(([e]) => {
    cta.style.display = e.isIntersecting ? 'none' : 'inline-flex';
  }, { threshold: 0 });
  observer.observe(hero);
})();

// ── Mobile Menu ──
(function () {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ── FAQ Accordion ──
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

// ── QR Code (real, scannable via qrcode-generator lib) ──
(function () {
  const container = document.getElementById('qr-code-display');
  if (!container || typeof qrcode === 'undefined') return;

  const qr = qrcode(0, 'M');
  qr.addData('https://nofail40.com');
  qr.make();
  container.innerHTML = qr.createImgTag(4, 8);
  const img = container.querySelector('img');
  if (img) {
    img.style.borderRadius = '8px';
    img.style.width = '160px';
    img.style.height = '160px';
    img.setAttribute('alt', 'QR code linking to nofail40.com');
  }
})();

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
