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

  // Close mobile menu and smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Ignore top anchor
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile nav menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (menuIconHam) menuIconHam.style.display = 'block';
          if (menuIconClose) menuIconClose.style.display = 'none';
        }
        
        // Smooth scroll to target with navbar offset
        const navbarHeight = document.getElementById('navbar').offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Dedicated handler for "프로젝트 보기" hero button
  const heroBtnProjects = document.getElementById('hero-btn-projects');
  if (heroBtnProjects) {
    heroBtnProjects.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('projects');
      if (target) {
        const navbarHeight = document.getElementById('navbar').offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  }


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

  /* ==========================================
     POS EVALUATION REPORT MODAL & CAROUSEL
     ========================================== */
  const openReportBtn = document.getElementById('proj-link-honam-report');
  const posModal = document.getElementById('pos-report-modal');
  const posOverlay = document.getElementById('pos-modal-overlay');
  const closeReportBtn = document.getElementById('pos-modal-close-btn');

  // Telemetry Demo Video is now handled as a standalone subpage (telemetry_demo.html)

  if (openReportBtn && posModal) {
    openReportBtn.addEventListener('click', () => {
      posModal.classList.add('active');
      posModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Ensure icons are rendered inside the modal
      lucide.createIcons();
    });
  }

  function closePosModal() {
    if (posModal) {
      posModal.classList.remove('active');
      posModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (closeReportBtn) {
    closeReportBtn.addEventListener('click', closePosModal);
  }
  if (posOverlay) {
    posOverlay.addEventListener('click', closePosModal);
  }

  // Close on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (posModal && posModal.classList.contains('active')) {
        closePosModal();
      }
    }
  });

  // Carousel Logic
  const slides = document.querySelectorAll('.pos-slide');
  const prevBtn = document.getElementById('pos-carousel-prev');
  const nextBtn = document.getElementById('pos-carousel-next');
  const dots = document.querySelectorAll('.pos-dot');
  let currentSlide = 0;

  function showSlide(index) {
    if (!slides.length) return;

    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.target.getAttribute('data-slide'));
      showSlide(slideIndex);
    });
  });


  /* ==========================================
     SCSS PROJECT AUTO PLAY CAROUSEL
     ========================================== */
  const scssSlides = document.querySelectorAll('.scss-slide');
  const scssIndicators = document.querySelectorAll('.scss-indicator');
  const scssCarouselContainer = document.querySelector('.scss-carousel-container');
  let scssCurrentSlide = 0;
  let scssIntervalId = null;
  let isAutoPlayStoppedByUser = false; // Flag to permanently disable autoplay on manual control

  function showScssSlide(index) {
    if (!scssSlides.length) return;

    if (index >= scssSlides.length) {
      scssCurrentSlide = 0;
    } else if (index < 0) {
      scssCurrentSlide = scssSlides.length - 1;
    } else {
      scssCurrentSlide = index;
    }

    scssSlides.forEach((slide, i) => {
      if (i === scssCurrentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    scssIndicators.forEach((ind, i) => {
      if (i === scssCurrentSlide) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }

  function startScssAutoPlay() {
    if (!scssSlides.length || isAutoPlayStoppedByUser) return;
    scssIntervalId = setInterval(() => {
      showScssSlide(scssCurrentSlide + 1);
    }, 4000); // Transitions every 4 seconds
  }

  function stopScssAutoPlay() {
    if (scssIntervalId) {
      clearInterval(scssIntervalId);
      scssIntervalId = null;
    }
  }

  // Initialize auto play
  if (scssSlides.length) {
    startScssAutoPlay();

    // Pause auto play when mouse hovers over the container
    if (scssCarouselContainer) {
      scssCarouselContainer.addEventListener('mouseenter', stopScssAutoPlay);
      scssCarouselContainer.addEventListener('mouseleave', () => {
        if (!isAutoPlayStoppedByUser) {
          startScssAutoPlay();
        }
      });
    }

    // Helper to permanently stop autoplay on click
    function handleManualInteraction() {
      isAutoPlayStoppedByUser = true;
      stopScssAutoPlay();
    }

    // Indicator dots click handler
    scssIndicators.forEach(ind => {
      ind.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'));
        handleManualInteraction();
        showScssSlide(slideIndex);
      });
    });

    // Arrow controls click handler
    const prevScssBtn = document.getElementById('scss-carousel-prev');
    const nextScssBtn = document.getElementById('scss-carousel-next');

    if (prevScssBtn) {
      prevScssBtn.addEventListener('click', () => {
        handleManualInteraction();
        showScssSlide(scssCurrentSlide - 1);
      });
    }
    if (nextScssBtn) {
      nextScssBtn.addEventListener('click', () => {
        handleManualInteraction();
        showScssSlide(scssCurrentSlide + 1);
      });
    }
  }

  /* ==========================================
     HERO F1 CAR ZOOM ANIMATION (RB19)
     ========================================== */
  const heroCar = document.querySelector('.animating-f1-car');
  const heroSection = document.getElementById('hero');

  function triggerCarZoom() {
    if (!heroCar) return;

    // Reset animation
    heroCar.classList.remove('zoom');

    // Trigger reflow
    void heroCar.offsetWidth;

    // Add active animation class
    heroCar.classList.add('zoom');
  }

  // Trigger on load after 800ms
  if (heroCar) {
    setTimeout(triggerCarZoom, 800);
  }

  // Re-trigger zoom animation when clicking on the hero section (but not buttons)
  if (heroSection) {
    heroSection.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) return;
      triggerCarZoom();
    });
  }

  /* ==========================================
     TOAST NOTIFICATION ENGINE
     ========================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'info', duration = 4000) {
    if (!toastContainer) return;

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Select Lucide icon name based on toast type
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle-2';
    if (type === 'error') iconName = 'alert-triangle';
    if (type === 'loading') iconName = 'loader';

    // Set inside content
    toast.innerHTML = `
      <div class="toast-icon">
        <i data-lucide="${iconName}" class="${type === 'loading' ? 'spin' : ''}"></i>
      </div>
      <div class="toast-content">${message}</div>
    `;

    // Append to container
    toastContainer.appendChild(toast);

    // Render Lucide icons for this new element
    lucide.createIcons({
      attrs: {
        'stroke-width': 2
      },
      nameAttr: 'data-lucide',
      root: toast
    });

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Auto remove logic (unless duration is 0 / manual)
    if (duration > 0) {
      setTimeout(() => {
        dismissToast(toast);
      }, duration);
    }

    return toast;
  }

  function dismissToast(toast) {
    toast.classList.remove('show');
    // Wait for transition to end before removing from DOM
    toast.addEventListener('transitionend', function handler() {
      toast.remove();
      toast.removeEventListener('transitionend', handler);
    });
  }

  /* ==========================================
     CONTACT FORM SUBMISSION WITH FALLBACK
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  // Change this if you have a Web3Forms access key
  const WEB3FORMS_ACCESS_KEY = '4e485f3b-980a-42e8-a44e-047f6390e3df';

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('form-name').value.trim();
      const emailVal = document.getElementById('form-email').value.trim();
      const typeVal = document.getElementById('form-type').value;
      const messageVal = document.getElementById('form-message').value.trim();
      const consentChecked = document.getElementById('form-consent').checked;

      // Basic empty field checks
      if (!nameVal || !emailVal || !typeVal || !messageVal) {
        showToast('모든 필드를 입력해 주세요.', 'error');
        return;
      }

      // Email validation (Regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        showToast('올바른 이메일 형식을 입력해 주세요.', 'error');
        return;
      }

      // Consent check validation
      if (!consentChecked) {
        showToast('개인정보 수집 및 이용에 동의해 주세요.', 'error');
        return;
      }

      // Save original button content
      const originalBtnHTML = submitBtn.innerHTML;

      // Set button to loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> 전송 중...`;
      lucide.createIcons({ root: submitBtn });

      // Show loading toast
      const loadingToast = showToast('메시지를 전송하고 있습니다. (약 2~3초 소요)', 'loading', 0);

      // Helper function to trigger mailto fallback
      const triggerMailtoFallback = (infoMsg) => {
        dismissToast(loadingToast);
        showToast(infoMsg, 'info', 5000);

        const emailRecipient = 'gudals6234@chosun.ac.kr';
        const subject = encodeURIComponent(`[Portfolio Contact] ${nameVal}님으로부터의 메시지 (${typeVal})`);
        const body = encodeURIComponent(`보낸 사람: ${nameVal}\n이메일: ${emailVal}\n문의 유형: ${typeVal}\n동의 여부: 동의 완료\n\n내용:\n${messageVal}`);

        // Open email client
        window.location.href = `mailto:${emailRecipient}?subject=${subject}&body=${body}`;

        // Reset form inputs after fallback is launched
        contactForm.reset();
      };

      // Check if access key is the default placeholder or empty
      if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE' || !WEB3FORMS_ACCESS_KEY.trim()) {
        // Fallback directly
        setTimeout(() => {
          triggerMailtoFallback('데모 모드: 이메일 작성을 위해 메일 클라이언트를 실행합니다.');
          resetBtnState();
        }, 1200); // Small delay for nice UX feeling
        return;
      }

      // Key exists - attempt background send via Web3Forms API
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: nameVal,
            email: emailVal,
            inquiry_type: typeVal,
            subject: `[Portfolio Contact] ${nameVal}님으로부터의 메시지 (${typeVal})`,
            message: messageVal,
            consent_agreed: '동의 완료'
          })
        });

        const result = await response.json();

        dismissToast(loadingToast);

        if (response.status === 200 && result.success) {
          showToast('메시지가 성공적으로 전송되었습니다! 확인 후 연락드리겠습니다.', 'success', 5000);
          contactForm.reset();
        } else {
          // API error
          console.error('Web3Forms Error:', result);
          triggerMailtoFallback('메시지 발송 실패: 이메일 클라이언트를 실행합니다.');
        }
      } catch (error) {
        console.error('Network Error:', error);
        dismissToast(loadingToast);
        triggerMailtoFallback('네트워크 오류: 이메일 클라이언트를 실행합니다.');
      } finally {
        resetBtnState();
      }

      function resetBtnState() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        lucide.createIcons({ root: submitBtn });
      }
    });
  }
});
