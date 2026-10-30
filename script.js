(() => {
  const contactTrigger = document.querySelector('#contact-choice-trigger');
  const contactDialog = document.querySelector('#contact-choice');
  if (contactDialog && typeof contactDialog.showModal === 'function') {
    const choices = document.querySelector('#contact-choice-links');
    const contactLinks = [...document.querySelectorAll('#contact .social-button')];
    ['WhatsApp', 'Telegram', 'Instagram'].forEach(name => {
      const link = contactLinks.find(item => item.querySelector('.social-name').textContent === name);
      if (link) choices.append(link.cloneNode(true));
    });
    contactTrigger.setAttribute('aria-haspopup', 'dialog');
    contactTrigger.setAttribute('aria-controls', 'contact-choice');
    contactTrigger.addEventListener('click', event => {
      event.preventDefault();
      contactDialog.showModal();
    });
    contactDialog.querySelector('.dialog-close').addEventListener('click', () => contactDialog.close());
    contactDialog.addEventListener('click', event => {
      const bounds = contactDialog.getBoundingClientRect();
      if (event.target === contactDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) contactDialog.close();
      if (event.target.closest('a')) contactDialog.close();
    });
    contactDialog.addEventListener('close', () => contactTrigger.focus({ preventScroll: true }));
  }
  const button = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  document.documentElement.classList.add('menu-ready');
  const closeMenu = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Открыть меню');
    navigation.classList.remove('open');
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    navigation.classList.toggle('open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      button.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) closeMenu();
  });
  window.matchMedia('(min-width: 521px)').addEventListener('change', closeMenu);
  document.querySelector('#year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('pending');
        observer.observe(element);
      }
    });
  }
})();
