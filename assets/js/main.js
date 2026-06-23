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

  // Apply config values
  if (typeof CONFIG !== 'undefined') {
    function getConfigValue(path) {
      return path.split('.').reduce((o, k) => (o != null ? o[k] : undefined), CONFIG);
    }

    document.querySelectorAll('[data-config]').forEach(el => {
      const val = getConfigValue(el.dataset.config);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-config-html]').forEach(el => {
      const val = getConfigValue(el.dataset.configHtml);
      if (val != null) el.innerHTML = val;
    });

    if (CONFIG.org && CONFIG.org.name) {
      document.title = document.title.replace(/SpaceCats Works/g, CONFIG.org.name);
    }

    const ytLink = document.getElementById('social-youtube');
    if (ytLink && CONFIG.social.youtube) ytLink.href = CONFIG.social.youtube;

    const twLink = document.getElementById('social-twitter');
    if (twLink && CONFIG.social.twitter) twLink.href = CONFIG.social.twitter;

    const bugForm = document.getElementById('form-bug');
    if (bugForm && CONFIG.forms.bug) bugForm.href = CONFIG.forms.bug;

    const featureForm = document.getElementById('form-feature');
    if (featureForm && CONFIG.forms.feature) featureForm.href = CONFIG.forms.feature;

    document.querySelectorAll('.contact-email').forEach(el => {
      el.href = 'mailto:' + CONFIG.contact.email;
      el.textContent = CONFIG.contact.email;
    });
  }
});
