const menuBtn = document.querySelector('.menuBtn');
const mobileNav = document.querySelector('.mobileNav');

function closeMenu() {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute('aria-expanded', 'false');
  mobileNav.dataset.open = 'false';
}

function openMenu() {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute('aria-expanded', 'true');
  mobileNav.dataset.open = 'true';
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  // close when clicking a link
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // close when tapping outside (mobile polish)
  document.addEventListener('click', (e) => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;

    const clickedInsideMenu = mobileNav.contains(e.target);
    const clickedButton = menuBtn.contains(e.target);
    if (!clickedInsideMenu && !clickedButton) closeMenu();
  });

  // close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Copy link button
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
