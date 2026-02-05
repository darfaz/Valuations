// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
const body = document.body;

function toggleMenu() {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
}

navToggle?.addEventListener('click', toggleMenu);

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Navbar scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.querySelector('.testimonial-dots');
let currentTestimonial = 0;
let testimonialInterval;

// Create dots
if (testimonials.length > 0 && dotsContainer) {
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => {
            goToTestimonial(index);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });
}

const dots = document.querySelectorAll('.dot');

function goToTestimonial(index) {
    testimonials[currentTestimonial].classList.remove('active');
    dots[currentTestimonial]?.classList.remove('active');
    
    currentTestimonial = index;
    
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial]?.classList.add('active');
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    goToTestimonial(next);
}

function resetInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Start auto-rotation
if (testimonials.length > 1) {
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add scroll-animate class to sections
document.querySelectorAll('.service-card, .experience-item, .why-card, .about-grid, .contact-grid').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// Parallax effect on hero glow
const heroGlow = document.querySelector('.hero-bg-glow');
if (heroGlow) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="btn-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
                    <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        submitBtn.innerHTML = `
            <span>Message Sent!</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 13l4 4L19 7"/>
            </svg>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// Add CSS for dots
const style = document.createElement('style');
style.textContent = `
    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0;
    }
    
    .dot:hover {
        background: rgba(255, 255, 255, 0.4);
    }
    
    .dot.active {
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        width: 24px;
        border-radius: 5px;
    }
    
    .btn-spinner {
        width: 18px;
        height: 18px;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const num = parseInt(text);
            const suffix = text.replace(/[0-9]/g, '');
            
            if (!isNaN(num)) {
                animateCounter(target, 0, num, 2000, suffix);
            }
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateCounter(element, start, end, duration, suffix) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Cursor glow effect (desktop only)
if (window.matchMedia('(min-width: 768px)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-glow {
            position: fixed;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 0;
            transition: opacity 0.3s ease;
            opacity: 0;
        }
        
        body:hover .cursor-glow {
            opacity: 1;
        }
    `;
    document.head.appendChild(cursorStyle);
    
    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    function animateCursor() {
        currentX += (cursorX - currentX) * 0.1;
        currentY += (cursorY - currentY) * 0.1;
        
        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

console.log('🚀 Dar Fazulyanov - Valuation Expert | Site loaded');
