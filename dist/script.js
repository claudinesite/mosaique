const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu');
  mobileNav.hidden = open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
}));

const form = document.querySelector('#brief-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const project = form.elements.project.value.trim();
  if (!name || !project) return;
  const message = `Bonjour,\n\nJe m'appelle ${name}.\n\nMon projet :\n${project}\n\nJ'aimerais en discuter avec vous.\n\nÀ bientôt,\n${name}`;
  try {
    await navigator.clipboard.writeText(message);
    status.textContent = 'Message copié ! Collez-le dans votre messagerie pour l’envoyer.';
  } catch {
    const url = `mailto:?subject=${encodeURIComponent('Parlons de mon projet web')}&body=${encodeURIComponent(message)}`;
    window.location.href = url;
    status.textContent = 'Votre messagerie s’ouvre avec le message préparé.';
  }
});
