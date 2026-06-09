document.addEventListener('DOMContentLoaded', () => {
  // Parallax Scrolling Background Effect
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const body = document.querySelector('body');

        // Move background elements at different speeds for parallax effect
        // ::after pseudo-element moves slower (more distant)
        const parallaxStrength = 0.5;
        if (body) {
          body.style.setProperty('--parallax-offset', scrollY * parallaxStrength + 'px');
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // Sticky Header Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('nav');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');

      const isExpanded = nav.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded.toString());

      if (isExpanded) {
        mobileToggle.innerHTML = '&#x2715;';
      } else {
        mobileToggle.innerHTML = '&#x2630;';
      }
    });

    // Close menu when clicking links on mobile
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.innerHTML = '&#x2630;';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active Link Highlighting based on current path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.endsWith(linkPath.replace('../', ''))) {
      link.classList.add('active');
    }
  });
});
