// Function to include HTML components
function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  
  includes.forEach(element => {
    const file = element.getAttribute('data-include');
    
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load ${file}: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          element.innerHTML = data;
          // Re-attach event listeners if needed
          if (file.includes('navbar')) {
            initMobileMenu();
          }
        })
        .catch(err => console.error("Error loading component:", err));
    }
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', function() {
  includeHTML();
  
  // Highlight current page in navigation
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
