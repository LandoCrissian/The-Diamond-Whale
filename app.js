const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

function closeMenu() {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute('aria-expanded', 'false');
  mobileNav.hidden = true;
  document.body.classList.remove('menuOpen');
}

function openMenu() {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute('aria-expanded', 'true');
  mobileNav.hidden = false;
  document.body.classList.add('menuOpen');
}

if (menuBtn && mobileNav) {
  // Ensure initial state is closed
  closeMenu();

  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close when clicking a link
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  // Close on outside tap
  document.addEventListener('click', (e) => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;

    const target = e.target;
    const clickedInside = mobileNav.contains(target) || menuBtn.contains(target);
    if (!clickedInside) closeMenu();
  });

  // Close on scroll (prevents weird half-sticky behavior on iOS)
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;

    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => closeMenu(), 60);
  }, { passive: true });

  // Close on orientation change
  window.addEventListener('orientationchange', closeMenu);
}

/* Copy community link */
const copyBtn = document.getElementById('copyCommunity');
const linkText = document.getElementById('communityLinkText');

if (copyBtn && linkText) {
  copyBtn.addEventListener('click', async () => {
    try {
      const text = linkText.textContent.trim();
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Copied ✓";
      setTimeout(() => (copyBtn.textContent = "Copy Community Link"), 1200);
    } catch (e) {
      copyBtn.textContent = "Copy failed";
      setTimeout(() => (copyBtn.textContent = "Copy Community Link"), 1200);
    }
  });
}
