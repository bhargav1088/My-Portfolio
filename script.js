// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href');
      if (id && id.startsWith('#')) {
        const target = document.querySelector(id);
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
      // close mobile nav when clicked
      if (siteNav.classList.contains('open')) toggleNav();
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  function toggleNav(){
    siteNav.classList.toggle('open');
    navToggle.classList.toggle('open');
  }
  navToggle.addEventListener('click', toggleNav);

  // Click outside to close mobile nav
  document.addEventListener('click', (e) => {
    const isClickInside = siteNav.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInside && siteNav.classList.contains('open')) toggleNav();
  });

  // Contact form handling (client-side)
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      feedback.style.color = 'crimson';
      feedback.textContent = 'Please fill all fields before sending.';
      return;
    }
    // Show success (you can hook this into a backend later)
    feedback.style.color = 'green';
    feedback.textContent = 'Thanks! Your message has been recorded (demo). I will get back to you soon.';
    form.reset();
    setTimeout(()=> feedback.textContent = '', 6000);
  });

  // Highlight nav on scroll (simple)
  const sections = document.querySelectorAll('main > section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.site-nav a[href="#${id}"]`);
      if (link) link.classList.toggle('active', entry.isIntersecting);
    });
  }, {threshold: 0.5});
  sections.forEach(s => observer.observe(s));
});

