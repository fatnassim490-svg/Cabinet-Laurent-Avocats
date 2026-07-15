// ---------- Mobile burger menu ----------
(function () {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!burgerBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.hidden = false;
    // Force reflow so the transition runs when the class is added
    void mobileMenu.offsetHeight;
    mobileMenu.classList.add('is-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    burgerBtn.setAttribute('aria-label', 'Fermer le menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.style.overflow = '';
    // Wait for the collapse transition before hiding for real
    window.setTimeout(() => {
      if (!mobileMenu.classList.contains('is-open')) {
        mobileMenu.hidden = true;
      }
    }, 400);
  }

  burgerBtn.addEventListener('click', () => {
    const isOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Close the menu when a link is tapped
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      burgerBtn.focus();
    }
  });

  // Close automatically if the viewport grows back to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && burgerBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
})();

// ---------- Contact form ----------
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      note.textContent = 'Merci de vérifier les champs en rouge avant d\'envoyer.';
      note.className = 'form-note is-error';
      return;
    }

    // NOTE FOR THE SITE OWNER:
    // This is a static site, so there is nothing on this page that can
    // actually deliver the message yet. Replace the block below with a
    // real submission — for example a fetch() call to a form backend
    // (Formspree, Netlify Forms, Basin) or your own API endpoint.
    //
    // Example:
    // fetch('https://formspree.io/f/xxxxxxx', {
    //   method: 'POST',
    //   headers: { Accept: 'application/json' },
    //   body: new FormData(form),
    // }).then(...)

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    window.setTimeout(() => {
      note.textContent = 'Message envoyé. Nous revenons vers vous sous 24h ouvrées.';
      note.className = 'form-note is-success';
      form.reset();
      submitBtn.disabled = false;
    }, 500);
  });
})();
