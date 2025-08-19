// Wait for DOM to load before executing script
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form element and all input elements
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const eventType = document.getElementById('eventType');
    const terms = document.getElementById('terms');
    const successMessage = document.getElementById('successMessage');

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

    // Validation functions for each field
    function validateFullName() {
        const value = fullName.value.trim();
        const errorElement = document.getElementById('fullNameError');
        
        if (value === '') {
            showError(fullName, errorElement, 'Full name is required');
            return false;
        } else if (!nameRegex.test(value)) {
            showError(fullName, errorElement, 'Name must contain only letters and spaces (min 2 characters)');
            return false;
        } else {
            showSuccess(fullName, errorElement);
            return true;
        }
    }

    function validateEmail() {
        const value = email.value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (value === '') {
            showError(email, errorElement, 'Email address is required');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(email, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(email, errorElement);
            return true;
        }
    }

    function validatePhone() {
        const value = phone.value.trim();
        const errorElement = document.getElementById('phoneError');
        
        if (value === '') {
            showError(phone, errorElement, 'Phone number is required');
            return false;
        } else if (!phoneRegex.test(value)) {
            showError(phone, errorElement, 'Phone number must be exactly 10 digits');
            return false;
        } else {
            showSuccess(phone, errorElement);
            return true;
        }
    }

    function validateAge() {
        const value = parseInt(age.value);
        const errorElement = document.getElementById('ageError');
        
        if (age.value === '') {
            showError(age, errorElement, 'Age is required');
            return false;
        } else if (isNaN(value) || value < 18) {
            showError(age, errorElement, 'You must be 18 years or older to register');
            return false;
        } else if (value > 120) {
            showError(age, errorElement, 'Please enter a valid age');
            return false;
        } else {
            showSuccess(age, errorElement);
            return true;
        }
    }

    function validatePassword() {
        const value = password.value;
        const errorElement = document.getElementById('passwordError');
        
        if (value === '') {
            showError(password, errorElement, 'Password is required');
            return false;
        } else if (!passwordRegex.test(value)) {
            showError(password, errorElement, 'Password must be 8+ characters with uppercase, lowercase, and number');
            return false;
        } else {
            showSuccess(password, errorElement);
            return true;
        }
    }

    function validateConfirmPassword() {
        const value = confirmPassword.value;
        const passwordValue = password.value;
        const errorElement = document.getElementById('confirmPasswordError');
        
        if (value === '') {
            showError(confirmPassword, errorElement, 'Please confirm your password');
            return false;
        } else if (value !== passwordValue) {
            showError(confirmPassword, errorElement, 'Passwords do not match');
            return false;
        } else {
            showSuccess(confirmPassword, errorElement);
            return true;
        }
    }

    function validateEventType() {
        const value = eventType.value;
        const errorElement = document.getElementById('eventTypeError');
        
        if (value === '') {
            showError(eventType, errorElement, 'Please select an event type');
            return false;
        } else {
            showSuccess(eventType, errorElement);
            return true;
        }
    }

    function validateTerms() {
        const errorElement = document.getElementById('termsError');
        
        if (!terms.checked) {
            showError(terms, errorElement, 'You must agree to the terms and conditions');
            return false;
        } else {
            showSuccess(terms, errorElement);
            return true;
        }
    }

    // Helper functions to show error and success states
    function showError(input, errorElement, message) {
        input.classList.remove('valid');
        input.classList.add('error');
        errorElement.textContent = message;
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.textContent = '';
    }

    // Add real-time validation listeners
    fullName.addEventListener('blur', validateFullName);
    email.addEventListener('blur', validateEmail);
    phone.addEventListener('blur', validatePhone);
    age.addEventListener('blur', validateAge);
    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', validateConfirmPassword);
    eventType.addEventListener('change', validateEventType);
    terms.addEventListener('change', validateTerms);

    // Also validate confirm password when main password changes
    password.addEventListener('input', function() {
        if (confirmPassword.value !== '') {
            validateConfirmPassword();
        }
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Run all validations
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isAgeValid = validateAge();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isEventTypeValid = validateEventType();
        const isTermsValid = validateTerms();

        // Check if all validations pass
        const isFormValid = isFullNameValid && isEmailValid && isPhoneValid && 
                           isAgeValid && isPasswordValid && isConfirmPasswordValid && 
                           isEventTypeValid && isTermsValid;

        if (isFormValid) {
            // Hide the form and show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted successfully!');
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});