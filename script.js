// Cosmic Interactive Effects (FEConf-inspired & Enhanced)

document.addEventListener('DOMContentLoaded', function() {
    initCosmicEffects();
    initHeroAnimations();
    initScrollAnimations();
    initOrbitalAppInteractions();
    addSmoothScrolling();
});

function initCosmicEffects() {
    // Enhanced floating particles (adjust count and animation as needed)
    createFloatingParticles(30); 
    // Mouse follow effect (subtle glow)
    addMouseFollowEffect();
    // Cosmic cursor trail (optional, can be performance intensive)
    // addCosmicTrail();
}

function createFloatingParticles(count) {
    const particleContainer = document.querySelector('.floating-particles');
    const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#E2E8F0']; // Added text color for more variety
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        gsap.set(particle, { // Use GSAP for initial positioning and animation
            position: 'absolute',
            width: gsap.utils.random(2, 6),
            height: gsap.utils.random(2, 6),
            background: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: '50%',
            opacity: gsap.utils.random(0.2, 0.8),
            x: gsap.utils.random(0, window.innerWidth),
            y: gsap.utils.random(0, window.innerHeight),
            zIndex: -1 // Ensure particles are behind content
        });
        particleContainer.appendChild(particle);

        gsap.to(particle, {
            x: '+=random(-200, 200)',
            y: '+=random(-200, 200)',
            rotation: '+=random(0, 360)',
            opacity: gsap.utils.random(0.4, 1),
            duration: gsap.utils.random(8, 20),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: gsap.utils.random(0, 5)
        });
    }
}

function addMouseFollowEffect() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    gsap.set(cursorGlow, {
        position: 'fixed',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        xPercent: -50,
        yPercent: -50,
        opacity: 0 // Start invisible
    });
    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursorGlow, {
            x: mouseX,
            y: mouseY,
            duration: 0.3,
            ease: 'power2.out',
            opacity: 1 // Fade in on mouse move
        });
    });

    // Fade out when mouse leaves document
    document.body.addEventListener('mouseleave', () => {
        gsap.to(cursorGlow, { opacity: 0, duration: 0.5 });
    });
}

function initHeroAnimations() {
    // GSAP timeline for hero section elements
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-name-line', { y: 50, opacity: 0, duration: 1.2 })
      .from('.hero-role-line', { y: 50, opacity: 0, duration: 1, delay: -0.8 })
      .from('.hero-tagline', { y: 30, opacity: 0, duration: 0.8, delay: -0.6 })
      .from('.hero-call-to-action .btn', { opacity: 0, y: 20, stagger: 0.2, duration: 0.6, delay: -0.4 });
}

function initScrollAnimations() {
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                // markers: true // For debugging
            }
        });
    });

    // Animate skills constellation list items
    gsap.utils.toArray('.skills-constellation li').forEach(item => {
        gsap.from(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
                // markers: true
            }
        });
    });

    // Animate app-planet cards
    gsap.utils.toArray('.app-planet').forEach(planet => {
        gsap.from(planet, {
            opacity: 0,
            y: 50,
            rotation: gsap.utils.random(-10, 10),
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: planet,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                // markers: true
            }
        });

        // Add subtle continuous orbital animation
        gsap.to(planet, {
            y: '+=random(-5, 5)',
            x: '+=random(-5, 5)',
            rotation: '+=random(-1, 1)',
            duration: gsap.utils.random(5, 10),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
    });

    // Animate contact cards
    gsap.utils.toArray('.contact-card').forEach(card => {
        gsap.from(card, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
                // markers: true
            }
        });
    });
}

function initOrbitalAppInteractions() {
    // Handle app-planet click to navigate
    document.querySelectorAll('.app-planet').forEach(planet => {
        planet.addEventListener('click', function(e) {
            if (this.classList.contains('placeholder')) {
                e.preventDefault(); // Prevent navigation for placeholder
                gsap.to(this, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.2, ease: 'power1.inOut' });
                alert("This app is coming soon! Stay tuned for more cosmic solutions.");
            } else {
                // Smooth transition to app page if it's a real app
                const targetUrl = this.getAttribute('href');
                if (targetUrl) {
                    e.preventDefault();
                    gsap.to('body', {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            window.location.href = targetUrl;
                        }
                    });
                }
            }
        });
    });
}

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target.offsetTop,
                        autoKill: false
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

// Ensure GSAP ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);