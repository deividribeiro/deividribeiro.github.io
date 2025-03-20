// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
  // Navigation active state
  const currentLocation = window.location.pathname;
  const menuItems = document.querySelectorAll('.nav-menu a');
  
  menuItems.forEach(item => {
    const itemPath = item.getAttribute('href');
    if (currentLocation === itemPath) {
      item.classList.add('active');
    }
  });
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(event) {
      event.stopPropagation();
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }

  // Add scroll behavior to hide/show the menu
  let lastScrollTop = 0;
  const siteNav = document.querySelector('.site-nav');

  if (siteNav) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (window.innerWidth <= parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md'))) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down
          siteNav.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          siteNav.style.transform = 'translateY(0)';
        }
      } else {
        siteNav.style.transform = 'translateY(0)';
      }

      lastScrollTop = scrollTop;
    });
  }
});
