// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
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

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate counters if they exist in this section
            if (entry.target.querySelector('.stat-number')) {
                animateCounters(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Counter Animation
function animateCounters(container) {
    const counters = container.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        if (isNaN(target)) return; // Skip if not a number (like "4+")

        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        };

        updateCounter();
    });
}

// Particle Background (Canvas)
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

let particles = [];
const particleCount = 50;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#00f5ff' : '#b537f2';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();

        // Connect particles
        particles.forEach(other => {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 - distance / 1500})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// 3D Tilt Effect for Cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Cursor Trail Effect
const cursorDot = document.createElement('div');
cursorDot.style.width = '8px';
cursorDot.style.height = '8px';
cursorDot.style.background = 'var(--color-accent-cyan)';
cursorDot.style.borderRadius = '50%';
cursorDot.style.position = 'fixed';
cursorDot.style.pointerEvents = 'none';
cursorDot.style.zIndex = '9999';
cursorDot.style.transition = 'transform 0.1s';
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.style.width = '40px';
cursorOutline.style.height = '40px';
cursorOutline.style.border = '1px solid var(--color-accent-purple)';
cursorOutline.style.borderRadius = '50%';
cursorOutline.style.position = 'fixed';
cursorOutline.style.pointerEvents = 'none';
cursorOutline.style.zIndex = '9998';
cursorOutline.style.transition = 'transform 0.2s, top 0.1s, left 0.1s';
document.body.appendChild(cursorOutline);

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorDot.style.transform = 'translate(-50%, -50%)';

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
    cursorOutline.style.transform = 'translate(-50%, -50%)';
});

// Contact Form Handling (EmailJS)
const contactForm = document.getElementById('contact-form');
const statusDiv = document.getElementById('status');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        // Using user provided Service ID and Template ID
        const serviceID = 'service_kis250b';
        const templateID = 'template_gyji50l';

        emailjs.sendForm(serviceID, templateID, '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                btn.innerText = 'Message Sent!';
                btn.style.background = 'var(--color-accent-cyan)';
                if (statusDiv) statusDiv.innerHTML = "Email sent successfully!";
                statusDiv.style.color = 'var(--color-accent-cyan)';

                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = ''; // Reset to original
                    if (statusDiv) statusDiv.innerHTML = "";
                }, 5000);
            }, function (error) {
                console.log('FAILED...', error);
                btn.innerText = 'Failed to Send';
                btn.style.background = 'var(--color-accent-pink)';
                if (statusDiv) statusDiv.innerHTML = "Email sending failed. Please try again.";
                statusDiv.style.color = 'var(--color-accent-pink)';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 5000);
            });
    });
}

// Console Easter Egg
console.log(
    "%c Hello there! 👋 \n%c If you're looking at this, we should probably talk code. \n%c Contact me at jaspartapgoomer@gmail.com",
    "font-size: 24px; font-weight: bold; color: #00f5ff;",
    "font-size: 14px; color: #b8c1ec;",
    "font-size: 14px; color: #b537f2;"
);
