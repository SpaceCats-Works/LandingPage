document.addEventListener('DOMContentLoaded', () => {
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
      
      // Accessibility & Icon toggle (could expand if using SVG icons)
      const isExpanded = nav.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded.toString());
      
      // Simple visual indicator change
      if (isExpanded) {
        mobileToggle.innerHTML = '&#x2715;'; // X icon
      } else {
        mobileToggle.innerHTML = '&#x2630;'; // Hamburger icon
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
    // Simple path match
    if (linkPath && currentPath.endsWith(linkPath.replace('../', ''))) {
      link.classList.add('active');
    }
  });
});
