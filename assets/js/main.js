// public/js/main.js
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

  // Simple form validation for contact form (if exists)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        markInvalid(nameInput, 'Name is required');
        isValid = false;
      } else {
        markValid(nameInput);
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        markInvalid(emailInput, 'Valid email is required');
        isValid = false;
      } else {
        markValid(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        markInvalid(messageInput, 'Message is required');
        isValid = false;
      } else {
        markValid(messageInput);
      }
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  }
  
  // Helper functions
  function markInvalid(element, message) {
    element.classList.add('invalid');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
      element.parentNode.removeChild(existingError);
    }
    
    element.parentNode.appendChild(errorElement);
  }
  
  function markValid(element) {
    element.classList.remove('invalid');
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
      element.parentNode.removeChild(existingError);
    }
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
