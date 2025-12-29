const menuBtn = document.querySelector('.menuBtn');
const mobileNav = document.querySelector('.mobileNav');
const closeBtn = document.querySelector('.mobileNav__close');

function openMenu() {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute('aria-expanded', 'true');
  mobileNav.classList.add('is-open');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('is-open');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // close when clicking backdrop
  mobileNav.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.dataset && target.dataset.close === 'true') closeMenu();
  });

  // auto-close when clicking a link
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  // escape key closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Copy community link
const copyBtn = document.getElementById('copyCommunity');
const linkText = document.getElementById('communityLinkText');

if (copyBtn && linkText) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(linkText.textContent.trim());
      copyBtn.textContent = "Copied ✓";
      setTimeout(() => (copyBtn.textContent = "Copy Community Link"), 1200);
    } catch (e) {
      copyBtn.textContent = "Copy failed";
      setTimeout(() => (copyBtn.textContent = "Copy Community Link"), 1200);
    }
  });
}
