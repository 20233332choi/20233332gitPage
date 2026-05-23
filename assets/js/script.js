document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================
     THEME TOGGLE (DARK / LIGHT MODE)
     ========================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }

  /* ==========================================
     MOBILE NAVIGATION MENU
     ========================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const menuIconHam = document.getElementById('menu-icon-hamburger');
  const menuIconClose = document.getElementById('menu-icon-close');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isOpen = navMenu.classList.contains('active');

    if (isOpen) {
      menuIconHam.style.display = 'none';
      menuIconClose.style.display = 'block';
    } else {
      menuIconHam.style.display = 'block';
      menuIconClose.style.display = 'none';
    }
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuIconHam.style.display = 'block';
      menuIconClose.style.display = 'none';
    });
  });

  /* ==========================================
     INTERSECTION OBSERVER (SCROLL ANIMATIONS)
     ========================================== */
  const scrollElements = document.querySelectorAll('.fade-in-up');

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        elementObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
  });

  scrollElements.forEach(el => {
    elementObserver.observe(el);
  });

  /* ==========================================
     SKILL BARS FILL ANIMATION
     ========================================== */
  const skillSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const level = bar.getAttribute('data-level');
          bar.style.width = level;
        });
        skillObserver.unobserve(entry.target); // Fill only once
      }
    });
  }, {
    threshold: 0.2
  });

  if (skillSection) {
    skillObserver.observe(skillSection);
  }

  /* ==========================================
     NAVBAR SHADOW ON SCROLL
     ========================================== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = 'var(--shadow)';
      navbar.style.padding = '0.9rem 0';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '1.2rem 0';
    }
  });
});
