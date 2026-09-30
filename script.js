// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#login' && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Login Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
}

function toggleSignup() {
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm.style.display === 'none') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Store login data in localStorage (for demo purposes)
    const loginData = {
        email: email,
        password: password,
        remember: remember,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('userLogin', JSON.stringify(loginData));
    
    // Show success message
    alert(`Welcome back, ${email}!\n\nYou have been successfully logged in.\n\nDashboard access coming soon!`);
    
    // Reset form
    document.querySelector('.login-form').reset();
    
    // Close modal
    closeLoginModal();
}

// Signup Handler
function handleSignup(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validation
    if (!fullname || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Store signup data
    const signupData = {
        fullname: fullname,
        email: email,
        password: password,
        signupTime: new Date().toISOString()
    };
    
    localStorage.setItem('newUser', JSON.stringify(signupData));
    
    // Show success message
    alert(`Welcome, ${fullname}!\n\nYour account has been created successfully.\n\nYou can now login with your email: ${email}`);
    
    // Reset form and switch back to login
    document.querySelector('.signup-form form').reset();
    toggleSignup();
}

// Contact Form Handler
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Store contact message
    const contactData = {
        name: name,
        email: email,
        message: message,
        sentTime: new Date().toISOString()
    };
    
    // In a real application, this would be sent to a server
    console.log('Contact Form Data:', contactData);
    localStorage.setItem('lastContactMessage', JSON.stringify(contactData));
    
    // Show success message
    alert(`Thank you, ${name}!\n\nYour message has been received.\n\nWe will get back to you shortly at ${email} or through WhatsApp: +964 775 709 1723`);
    
    // Reset form
    form.reset();
}

// Check if user is remembered on page load
window.addEventListener('load', () => {
    const savedLogin = localStorage.getItem('userLogin');
    if (savedLogin) {
        const loginData = JSON.parse(savedLogin);
        if (loginData.remember) {
            console.log('User remembered:', loginData.email);
            // You can auto-fill the login form or redirect to dashboard
        }
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.login-btn)');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add some interactive features
const statsBoxes = document.querySelectorAll('.stat-box');
statsBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'scale(1.05)';
        box.style.transition = 'transform 0.3s ease';
    });
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'scale(1)';
    });
});

console.log('Investment Website Loaded Successfully');
console.log('Contact: the.active.mind.a@gmail.com | WhatsApp: +964 775 709 1723');