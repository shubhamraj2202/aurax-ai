// Cosmic Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Create additional floating particles
    createFloatingParticles();
    
    // Add mouse follow effect
    addMouseFollowEffect();
    
    // Smooth scrolling for navigation links
    addSmoothScrolling();
    
    // Add intersection observer for animations
    addScrollAnimations();
});

function createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    const colors = ['#8B5CF6', '#06B6D4', '#10B981'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            opacity: ${Math.random() * 0.8 + 0.2};
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 8}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
}

function addMouseFollowEffect() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Create cursor glow effect
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursorGlow);
    
    function updateCursorGlow() {
        cursorGlow.style.transform = `translate(${mouseX - 100}px, ${mouseY - 100}px)`;
        requestAnimationFrame(updateCursorGlow);
    }
    updateCursorGlow();
}

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Animate feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Add cosmic cursor trail
function addCosmicTrail() {
    const trail = [];
    const trailLength = 8;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Create trail dots
        trail.forEach((point, index) => {
            if (index === trail.length - 1) return;
            
            const dot = document.createElement('div');
            const age = Date.now() - point.time;
            const opacity = Math.max(0, 1 - age / 1000);
            const size = Math.max(2, 6 - index);
            
            dot.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${size}px;
                height: ${size}px;
                background: rgba(139, 92, 246, ${opacity});
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: fadeOut 1s ease-out forwards;
            `;
            
            document.body.appendChild(dot);
            
            setTimeout(() => {
                if (dot.parentNode) {
                    dot.parentNode.removeChild(dot);
                }
            }, 1000);
        });
    });
}

// Initialize cosmic trail
addCosmicTrail();