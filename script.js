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
    // Select all sections and elements to animate
    const elementsToAnimate = gsap.utils.toArray('section, .app-planet, .contact-card, .footer');

    // Set initial state for all animated elements
    gsap.set(elementsToAnimate, { opacity: 0, y: 50 });

    // Animate sections and other elements to fade in
    elementsToAnimate.forEach(element => {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            // No ScrollTrigger here, just animate on load
        });
    });

    // Animate app-planet cards with subtle continuous orbital animation
    gsap.utils.toArray('.app-planet').forEach(planet => {
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

function addCosmicTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];
    const maxTrail = 6;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Add new trail point
        trail.push({ x: mouseX, y: mouseY });
        
        // Limit trail length
        if (trail.length > maxTrail) {
            trail.shift();
        }
        
        // Create trail dots
        trail.forEach((point, index) => {
            const dot = document.createElement('div');
            const size = Math.max(3, 8 - index);
            const opacity = (maxTrail - index) / maxTrail;
            
            dot.style.cssText = `
                position: fixed;
                left: ${point.x - size/2}px;
                top: ${point.y - size/2}px;
                width: ${size}px;
                height: ${size}px;
                background: rgba(139, 92, 246, ${opacity * 0.7});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease-out;
            `;
            
            document.body.appendChild(dot);
            
            // Remove dot after short time
            setTimeout(() => {
                if (dot && dot.parentNode) {
                    dot.parentNode.removeChild(dot);
                }
            }, 200);
        });
    });
    
    console.log('Cosmic trail initialized!'); // Debug log
}

// Ensure GSAP ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

// Initialize cosmic trail
addCosmicTrail();