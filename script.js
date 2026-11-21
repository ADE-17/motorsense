'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);

const sensingGoals = {
  movement: {
    location: 'Lower-back placement concept',
    title: 'Movement and motor fluctuations',
    description: 'By combining acceleration and rotation signals, we aim to identify patterns in movement and explore how they relate to ON/OFF periods and involuntary movements.'
  },
  gait: {
    location: 'Lower-leg placement concept',
    title: 'Walking patterns and gait changes',
    description: 'We’re exploring how wearable movement signals could reveal walking rhythms, changes in pace, and interruptions to gait.'
  },
  rhythms: {
    location: 'Wrist placement concept',
    title: 'Daily activity and rest',
    description: 'Patterns of activity and rest can add context to a day. We aim to explore these rhythms alongside movement signals for a more complete view of daily experience.'
  }
};
document.querySelectorAll('[data-sensor]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.sensor;
    const goal = sensingGoals[key];
    document.querySelectorAll('[data-sensor]').forEach(control => {
      const active = control.dataset.sensor === key;
      control.classList.toggle('active', active);
      control.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#sensor-location').textContent = goal.location;
    document.querySelector('#sensor-title').textContent = goal.title;
    document.querySelector('#sensor-description').textContent = goal.description;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const detail = document.querySelector('.sensor-detail');
      detail.getAnimations().forEach(animation => animation.cancel());
      detail.animate(
        [{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' }
      );
    }
  });
});

const animationButton = document.querySelector('.animation-toggle');
const patchImage = document.querySelector('#hero-patch');
animationButton.addEventListener('click', () => {
  const paused = animationButton.getAttribute('aria-pressed') !== 'true';
  patchImage.src = paused ? 'assets/patch-still.png' : 'assets/patch-rotating.gif';
  animationButton.setAttribute('aria-pressed', String(paused));
  animationButton.setAttribute('aria-label', paused ? 'Play patch animation' : 'Pause patch animation');
  animationButton.querySelector('.animation-label').textContent = paused ? 'Play' : 'Pause';
});

document.querySelector('.copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('contact.motorsense@gmail.com');
    status.textContent = 'Email copied';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('.contact-email'));
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Email selected — press Ctrl+C or ⌘C to copy.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Reveal each section once. Content stays visible without JS or with reduced motion.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-intro, .statistics, .technology-grid, .insights-copy, .insight-demo, .story-copy, .team-grid, .contact-grid').forEach(section => {
    section.classList.add('reveal');
    if (section.getBoundingClientRect().top >= window.innerHeight) section.classList.add('is-pending');
    observer.observe(section);
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      document.querySelectorAll('.is-pending').forEach(section => section.classList.remove('is-pending'));
      observer.disconnect();
    }
  });
}
