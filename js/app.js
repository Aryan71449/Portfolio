// app.js - Interactivity for Aryan Chopra's portfolio

// Short helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));

// Update year in footer
document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
});

// NAV toggle (mobile)
const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('primary-menu');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('show');
});

// Close menu on link click for mobile
$$('.menu a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('show');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// IntersectionObserver for scroll spy (highlight active menu)
const sections = $$('main section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.menu a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      $$('.menu a').forEach(a => a.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'true');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
sections.forEach(s => observer.observe(s));

// Back to top
const toTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) toTop.classList.add('show');
  else toTop.classList.remove('show');
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Theme toggle with persistence
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light' || (!savedTheme && prefersLight)) root.classList.add('light');

themeToggle.addEventListener('click', () => {
  const isLight = root.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Simple contact form client validation (demo)
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { "Accept": "application/json" }
  })
  .then(response => {
    if (response.ok) {
      successMsg.classList.add("show");
      form.reset();
      setTimeout(() => successMsg.classList.remove("show"), 5000);
    } else {
      alert("❌ Oops! Something went wrong. Try again.");
    }
  })
  .catch(() => alert("❌ Oops! Something went wrong. Try again."));
});


// Hamburger toggle
 navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav .menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if(window.scrollY > 300){
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));




