// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressBar = document.getElementById('progress-bar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id], div[id]');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navbar animation on page load
    setTimeout(() => {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
    }, 100);
});

// Enhanced interactions
        document.querySelectorAll('.tech-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
            
            item.addEventListener('click', function() {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-2px) scale(1.05)';
                }, 150);
            });
        });

        // Smooth scrolling for CTA buttons
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Stats counter animation
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach((stat, index) => {
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue);
                
                if (!isNaN(numericValue)) {
                    let current = 0;
                    const increment = numericValue / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            stat.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
                        }
                    }, 50);
                }
            });
        }

        // Trigger stats animation after delay
        setTimeout(animateStats, 3000);

        // Parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            const floatingIcons = document.querySelector('.floating-icons');
            if (floatingIcons) {
                floatingIcons.style.transform = `translate(-50%, -50%) translate(${xPos}px, ${yPos}px)`;
            }
            
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const multiplier = (index + 1) * 0.5;
                shape.style.transform = `translate(${xPos * multiplier}px, ${yPos * multiplier}px)`;
            });
        });

        // Enhanced cursor effect
        let cursor = null;
        document.addEventListener('mousemove', (e) => {
            if (!cursor) {
                cursor = document.createElement('div');
                cursor.className = 'cursor-glow';
                cursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: all 0.1s ease;
                `;
                document.body.appendChild(cursor);
            }
            
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Interactive tech icons
        document.querySelectorAll('.tech-icon').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.background = 'rgba(0, 212, 255, 0.2)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.background = 'rgba(0, 212, 255, 0.1)';
            });
        });

        // Enhanced service card interactions
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                
                // Add glow effect to tech badges
                this.querySelectorAll('.tech-badge').forEach(badge => {
                    badge.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                });
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                
                // Remove glow effect from tech badges
                this.querySelectorAll('.tech-badge').forEach(badge => {
                    badge.style.boxShadow = 'none';
                });
            });
        });

        // Tech badge click effects
        document.querySelectorAll('.tech-badge').forEach(badge => {
            badge.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(0, 212, 255, 0.6);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Process step interactions
        document.querySelectorAll('.process-step').forEach((step, index) => {
            step.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(0, 212, 255, 0.2)';
                this.style.transform = 'scale(1.2)';
                
                // Highlight corresponding label
                const labels = document.querySelectorAll('.step-label');
                if (labels[index]) {
                    labels[index].style.color = '#00d4ff';
                    labels[index].style.transform = 'scale(1.1)';
                }
            });
            
            step.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255, 255, 255, 0.05)';
                this.style.transform = 'scale(1)';
                
                // Reset label
                const labels = document.querySelectorAll('.step-label');
                if (labels[index]) {
                    labels[index].style.color = '#94a3b8';
                    labels[index].style.transform = 'scale(1)';
                }
            });
        });

        // Smooth scrolling for service buttons
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add click animation
                this.style.transform = 'translateY(-2px) scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-2px) scale(1)';
                }, 150);
                
                // Smooth scroll to contact (if it exists)
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Parallax effect for background shapes
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 30;
            const yPos = (clientY / innerHeight - 0.5) * 30;
            
            document.querySelectorAll('.bg-shape').forEach((shape, index) => {
                const multiplier = (index + 1) * 0.3;
                shape.style.transform = `translate(${xPos * multiplier}px, ${yPos * multiplier}px)`;
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.service-card, .process-step, .step-label').forEach(el => {
            observer.observe(el);
        });

        // Add ripple effect to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(0, 212, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: cardRipple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS animations via JavaScript
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes cardRipple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);


         document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add click animation to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add CSS animation for ripple effect
        // Check if the style element already exists to prevent redeclaration
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style'; // Add an ID to easily check for its existence
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Parallax effect for floating elements
        window.addEventListener('mousemove', (e) => {
            const circles = document.querySelectorAll('.floating-circle');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 0.5;
                const xPos = (x - 0.5) * speed * 50;
                const yPos = (y - 0.5) * speed * 50;
                
                circle.style.transform = `translate(${xPos}px, ${yPos}px)`;
            });
        });
        
        // Smooth scroll animation when cards come into view
        // Ensure observerOptions and observer are declared only once
        if (typeof observerOptions === 'undefined') {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
        }
        
        if (typeof observer === 'undefined') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    }
                });
            });
        }
        
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
        
        // Add fadeInUp animation
        const fadeInUpStyle = document.createElement('style');
        fadeInUpStyle.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(fadeInUpStyle);


         document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const buttonText = document.getElementById('buttonText');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            // Clear previous messages
            successMessage.classList.remove('show');
            errorMessage.classList.remove('show');
            
            // Validate form
            if (validateForm()) {
                // Show loading state
                submitBtn.classList.add('loading');
                buttonText.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    buttonText.textContent = 'Send Message';
                    successMessage.classList.add('show');
                    
                    // Reset form
                    this.reset();
                }, 2000);
            }
        });
        
        function validateForm() {
            const fields = ['firstName', 'lastName', 'email', 'subject', 'message'];
            let isValid = true;
            
            fields.forEach(field => {
                const input = document.getElementById(field);
                const error = document.getElementById(field + 'Error');
                
                if (!input.value.trim()) {
                    showError(input, error, 'This field is required');
                    isValid = false;
                } else if (field === 'email' && !isValidEmail(input.value)) {
                    showError(input, error, 'Please enter a valid email address');
                    isValid = false;
                } else {
                    clearError(input, error);
                }
            });
            
            return isValid;
        }
        
        function showError(input, errorElement, message) {
            input.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        function clearError(input, errorElement) {
            input.classList.remove('error');
            errorElement.classList.remove('show');
        }
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        // Clear errors on input
        document.querySelectorAll('.input-field').forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement) {
                    clearError(this, errorElement);
                }
            });
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Show/hide back to top button
        window.addEventListener('scroll', function() {
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                if (window.pageYOffset > 300) {
                    backToTop.style.opacity = '1';
                } else {
                    backToTop.style.opacity = '0';
                }
            }
        });
        
        // Newsletter form submission
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('Thank you for subscribing! You will receive updates at: ' + email);
            this.reset();
        });

        // Contact form is handled by contact-form.js