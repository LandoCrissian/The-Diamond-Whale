const menuBtn = document.querySelector('.menuBtn');
const mobileNav = document.querySelector('.mobileNav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.hidden = isOpen;
  });

  // auto-close when clicking a link
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });
  });
}

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
