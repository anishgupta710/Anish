document.addEventListener('DOMContentLoaded', () => {
    // Typed.js initialization
    const typedElement = document.getElementById('typed');
    if (typedElement) {
        new Typed(typedElement, {
            stringsElement: '#typed-strings',
            strings: ['A Data Analyst', 'A Python Developer', 'A Machine Learning Enthusiast'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', 
                mobileMenuToggle.classList.contains('active').toString());
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                if (navLinks && mobileMenuToggle) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.experience-card, .project-card, .education-card').forEach(card => {
        observer.observe(card);
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
            contactForm.reset();
            // Show a success message to the user
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for your message. We\'ll get back to you soon!';
            successMessage.className = 'success-message';
            contactForm.appendChild(successMessage);
            setTimeout(() => successMessage.remove(), 5000);
        });
    }

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadImage = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = () => image.removeAttribute('data-src');
    };

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        lazyImages.forEach(lazyLoadImage);
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const toggleDarkMode = () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            darkModeToggle.setAttribute('aria-label', 
                document.body.classList.contains('dark-mode') ? 'Switch to light mode' : 'Switch to dark mode');
        };

        darkModeToggle.addEventListener('click', toggleDarkMode);

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            toggleDarkMode();
        }
    }

    // Add a simple animation to the hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            heroContent.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        });
    }

    // Add keyboard navigation for the main menu
    const menuItems = document.querySelectorAll('.nav-links a');
    menuItems.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                menuItems[(index + 1) % menuItems.length].focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                menuItems[(index - 1 + menuItems.length) % menuItems.length].focus();
            }
        });
    });
});