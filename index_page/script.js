// Wait for the DOM to be fully loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING =====
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== STICKY NAVIGATION =====
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (header && nav) {
        const navOffset = nav.offsetTop;
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > navOffset) {
                nav.classList.add('fixed');
                document.body.style.paddingTop = nav.offsetHeight + 'px';
            } else {
                nav.classList.remove('fixed');
                document.body.style.paddingTop = '0';
            }
        });
    }
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navContainer = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    
    // Only add mobile menu button if those elements exist
    if (navContainer && navList) {
        // Add mobile menu button on smaller screens
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleScreenChange(e) {
            if (e.matches) {
                if (!document.querySelector('.mobile-menu-toggle')) {
                    navContainer.prepend(mobileMenuToggle);
                }
            } else {
                const toggle = document.querySelector('.mobile-menu-toggle');
                if (toggle) {
                    toggle.remove();
                }
                navList.classList.remove('active');
            }
        }
        
        mediaQuery.addEventListener('change', handleScreenChange);
        handleScreenChange(mediaQuery);
        
        // Toggle mobile menu
        document.addEventListener('click', function(e) {
            if (e.target.closest('.mobile-menu-toggle')) {
                navList.classList.toggle('active');
                const icon = document.querySelector('.mobile-menu-toggle i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            }
        });
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    const icon = document.querySelector('.mobile-menu-toggle i');
                    if (icon && icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    // Add the fade-in class to elements we want to animate
    const animatedElements = document.querySelectorAll('section, .card, .team-member, .welcome-text, .welcome-image, .publication-item');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.fade-in');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check and add scroll listener for animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Ensure welcome section is visible on page load
    setTimeout(() => {
        const welcomeSection = document.querySelector('#welcome');
        if (welcomeSection) {
            welcomeSection.classList.add('visible');
        }
        
        const welcomeElements = document.querySelectorAll('#welcome .fade-in');
        welcomeElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
    
    // ===== PUBLICATIONS ABSTRACT TOGGLE =====
    const publicationItems = document.querySelectorAll('.publication-item');
    
    publicationItems.forEach(item => {
        const title = item.querySelector('.publication-title');
        const abstract = item.querySelector('.publication-abstract');
        
        if (title && abstract) {
            // Add expand/collapse functionality
            abstract.style.display = 'none'; // Hide abstract initially
            
            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'abstract-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show Abstract';
            
            // Insert button after the source info
            const sourceInfo = item.querySelector('.publication-source');
            if (sourceInfo) {
                sourceInfo.insertAdjacentElement('afterend', toggleBtn);
            }
            
            // Add toggle functionality
            toggleBtn.addEventListener('click', function() {
                const isVisible = abstract.style.display !== 'none';
                abstract.style.display = isVisible ? 'none' : 'block';
                
                // Change button text and icon
                this.innerHTML = isVisible 
                    ? '<i class="fas fa-chevron-down"></i> Show Abstract' 
                    : '<i class="fas fa-chevron-up"></i> Hide Abstract';
            });
        }
    });
});

// Add styles for the mobile menu and abstract toggle
const extraStyles = document.createElement('style');
extraStyles.textContent = `
    .mobile-menu-toggle {
        display: none;
        background: transparent;
        border: none;
        color: var(--light-text);
        font-size: 1.5rem;
        cursor: pointer;
        position: absolute;
        top: 1rem;
        right: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        nav {
            position: relative;
        }
        
        nav ul {
            display: none;
        }
        
        nav ul.active {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem 0;
        }
    }
    
    .abstract-toggle {
        background: none;
        border: none;
        color: var(--secondary-color);
        font-size: 0.9rem;
        cursor: pointer;
        padding: 0.5rem 0;
        display: block;
        text-align: left;
        margin-top: 0.5rem;
    }
    
    .abstract-toggle:hover {
        color: var(--primary-color);
    }
    
    .publication-abstract {
        transition: all 0.3s ease;
    }
`;

document.head.appendChild(extraStyles);