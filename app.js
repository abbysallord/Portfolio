// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize theme without localStorage to avoid sandbox issues
    let currentTheme = 'light';
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle__icon');
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }
    
    // Set initial theme
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme Toggle Functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-color-scheme', currentTheme);
            updateThemeIcon(currentTheme);
            console.log('Theme switched to:', currentTheme);
        });
    }

    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('show');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link Based on Scroll Position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Ensure external links work properly
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for external links
            console.log('External link clicked:', this.href);
        });
    });

    // Skill Progress Bar Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill__progress');
        
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (rect.top <= windowHeight * 0.75) {
                bar.style.width = level + '%';
            }
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.stat, .highlight, .skill-category, .project-card, .timeline__item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animated Counter for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat__number');
        
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.75 && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                const target = counter.textContent.trim();
                const isNumber = /^\d+/.test(target);
                
                if (isNumber) {
                    const finalNumber = parseInt(target.match(/\d+/)[0]);
                    const suffix = target.replace(/^\d+/, '');
                    let current = 0;
                    const increment = finalNumber / 30;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalNumber) {
                            counter.textContent = finalNumber + suffix;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + suffix;
                        }
                    }, 50);
                }
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Create mailto link
            const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject}`);
            const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:contact@dhanushshenoy.dev?subject=${mailtoSubject}&body=${mailtoBody}`;
            
            // Open email client
            try {
                window.open(mailtoLink, '_self');
                showNotification('Opening email client...', 'success');
                
                // Reset form after a short delay
                setTimeout(() => {
                    this.reset();
                }, 1000);
            } catch (error) {
                showNotification('Please copy this email: contact@dhanushshenoy.dev', 'info');
                console.log('Mailto error:', error);
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            fontSize: '14px'
        });
        
        if (type === 'success') {
            notification.style.backgroundColor = '#10b981';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#ef4444';
        } else if (type === 'info') {
            notification.style.backgroundColor = '#3b82f6';
        }
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    // Scroll Event Listeners
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                animateSkillBars();
                animateCounters();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);
    
    // Initial calls
    updateActiveNavLink();
    animateSkillBars();
    animateCounters();

    // Add loading animation for project cards
    const projectCardsContainer = document.querySelector('.projects__grid');
    if (projectCardsContainer) {
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Add hover effects to project cards
    projectCards.forEach(card => {
        const links = card.querySelectorAll('.project-card__links .btn');
        
        card.addEventListener('mouseenter', function() {
            links.forEach(link => {
                link.style.transform = 'translateY(-2px)';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            links.forEach(link => {
                link.style.transform = 'translateY(0)';
            });
        });
    });

    // Add smooth reveal animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline__item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });
        
        timelineObserver.observe(item);
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            if (navMenu) {
                navMenu.classList.remove('show');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });

    // Add focus management for better accessibility
    const focusableElements = document.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Ensure all project card styles are properly initialized
    setTimeout(() => {
        projectCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
        });
    }, 500);

    console.log('Portfolio website initialized successfully!');
    console.log('Theme toggle, navigation, filtering, and forms are ready.');
});