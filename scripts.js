// scripts.js

// Dark Mode Toggle
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
});

// Check for saved user preference
if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
}

// Form Handling
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Example of data handling - replace with actual implementation
    console.log('Form Submitted:', data);
    alert('Thank you for your submission!');
    form.reset();
});

