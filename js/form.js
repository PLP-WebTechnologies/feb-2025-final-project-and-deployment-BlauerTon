document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Form Validation
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]');
            const feedback = this.querySelector('.form-feedback');
            
            if (validateEmail(email.value)) {
                // Simulate form submission
                feedback.textContent = 'Thank you for subscribing!';
                feedback.style.color = 'green';
                email.value = '';
                
                // Store in localStorage
                localStorage.setItem('subscribedEmail', email.value);
            } else {
                feedback.textContent = 'Please enter a valid email address';
                feedback.style.color = 'red';
            }
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const statusDiv = this.querySelector('.form-status');
            
            // Validate name
            const name = this.querySelector('#name');
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                clearError(name);
            }
            
            // Validate email
            const email = this.querySelector('#email');
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // Validate message
            const message = this.querySelector('#message');
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                clearError(message);
            }
            
            if (isValid) {
                // Simulate form submission
                statusDiv.textContent = 'Your message has been sent!';
                statusDiv.className = 'form-status success';
                contactForm.reset();
                
                // Store form data in localStorage
                const formData = {
                    name: name.value,
                    email: email.value,
                    subject: this.querySelector('#subject').value,
                    message: message.value,
                    date: new Date().toISOString()
                };
                saveContactFormData(formData);
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message');
        input.style.borderColor = 'red';
        error.textContent = message;
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message');
        input.style.borderColor = '';
        error.textContent = '';
    }
    
    function saveContactFormData(data) {
        let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
        submissions.push(data);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    }
});