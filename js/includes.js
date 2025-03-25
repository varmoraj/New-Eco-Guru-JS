
// Function to load HTML components
function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  
  includes.forEach(element => {
    const file = element.getAttribute('data-include');
    
    if (file) {
      fetch(file)
        .then(response => response.text())
        .then(data => {
          element.innerHTML = data;
        })
        .catch(err => console.log("Error loading component: ", err));
    }
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', includeHTML);
