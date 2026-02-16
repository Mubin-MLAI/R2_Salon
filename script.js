// ===================================
// R2 SALON - COMPREHENSIVE JAVASCRIPT
// ===================================

// ===  NAVBAR FUNCTIONALITY ===
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        if (window.scrollY > 300) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    }
});

// Mobile menu toggle
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const spans = menuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });
}

// === SCROLL TO TOP FUNCTIONALITY ===
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === STAT COUNTER ANIMATION ===
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateStats() {
    if (hasAnimated) return;
    
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
        hasAnimated = true;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (!target) return;
            
            let count = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(count);
                }
            }, 30);
        });
    }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// === SERVICES FILTER ===
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('[data-category]');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items
        serviceCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// === BOOKING FORM HANDLING ===
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const gender = document.getElementById('gender').value;
        const service = document.getElementById('service').value;
        const stylist = document.getElementById('stylist').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const notes = document.getElementById('notes').value;
        
        // Format the WhatsApp message
        let message = `*New Appointment Request*\n\n`;
        message += `👤 *Name:* ${fullName}\n`;
        message += `📞 *Phone:* ${phone}\n`;
        if (email) message += `📧 *Email:* ${email}\n`;
        message += `⚧ *Gender:* ${gender}\n`;
        message += `💇 *Service:* ${service}\n`;
        if (stylist) message += `✂️ *Preferred Stylist:* ${stylist}\n`;
        message += `📅 *Date:* ${date}\n`;
        message += `🕐 *Time:* ${time}\n`;
        if (notes) message += `📝 *Notes:* ${notes}\n`;
        message += `\nLooking forward to visiting R2 Salon!`;
        
        // WhatsApp number
        const whatsappNumber = '917977934485';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.add('show');
            
            // Hide form temporarily
            bookingForm.style.display = 'none';
            
            // Redirect to WhatsApp after 2 seconds
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Reset form and hide success message after redirect
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    bookingForm.style.display = 'block';
                    bookingForm.reset();
                }, 1000);
            }, 2000);
        } else {
            // Immediate redirect if no success message element
            window.open(whatsappURL, '_blank');
            bookingForm.reset();
        }
    });
}

// === CONTACT FORM HANDLING ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('contactPhone').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Format the WhatsApp message
        let whatsappMessage = `*New Contact Message*\n\n`;
        whatsappMessage += `👤 *Name:* ${name}\n`;
        whatsappMessage += `📞 *Phone:* ${phone}\n`;
        if (email) whatsappMessage += `📧 *Email:* ${email}\n`;
        whatsappMessage += `📋 *Subject:* ${subject}\n\n`;
        whatsappMessage += `*Message:*\n${message}`;
        
        // WhatsApp number
        const whatsappNumber = '917977934485';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Show success message
        const successMessage = document.getElementById('contactSuccessMessage');
        if (successMessage) {
            successMessage.classList.add('show');
            contactForm.style.display = 'none';
            
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    contactForm.style.display = 'block';
                    contactForm.reset();
                }, 1000);
            }, 2000);
        } else {
            window.open(whatsappURL, '_blank');
            contactForm.reset();
        }
    });
}

// === GALLERY MODAL ===
let currentGalleryIndex = 0;
const galleryData = [
    {
        title: 'Balayage & Haircut',
        description: 'Soft layering with honey blonde highlights'
    },
    {
        title: 'Ombre Hair Color',
        description: 'Dark to light gradient coloring'
    },
    {
        title: 'Nanoplastia Treatment',
        description: 'Smooth, frizz-free hair transformation'
    },
    {
        title: 'Soft Curls Styling',
        description: 'Elegant soft waves for special occasion'
    },
    {
        title: 'Layered Bob Cut',
        description: 'Modern layered bob with texture'
    },
    {
        title: 'Highlights & Lowlights',
        description: 'Multi-dimensional color technique'
    },
    {
        title: 'Bridal Hairstyle',
        description: 'Elegant updo with floral accessories'
    },
    {
        title: "Men's Fade Haircut",
        description: 'Clean fade with textured top'
    },
    {
        title: 'Hair Botox Treatment',
        description: 'Restored shine and volume'
    },
    {
        title: 'Sleek Straight Style',
        description: 'Glass hair finish with perfect shine'
    },
    {
        title: 'Pixie Cut with Color',
        description: 'Bold short cut with vibrant color'
    },
    {
        title: 'Bridal Makeup Look',
        description: 'Complete bridal makeover package'
    }
];

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.add('active');
        updateGalleryModal();
        document.body.style.overflow = 'hidden';
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateGalleryModal();
}

function prevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateGalleryModal();
}

function updateGalleryModal() {
    const data = galleryData[currentGalleryIndex];
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDescription) modalDescription.textContent = data.description;
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGalleryModal();
    } else if (e.key === 'ArrowRight') {
        nextGalleryImage();
    } else if (e.key === 'ArrowLeft') {
        prevGalleryImage();
    }
});

// Close modal on background click
const galleryModal = document.getElementById('galleryModal');
if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGalleryModal();
        }
    });
}

// === ANIMATION ON SCROLL (AOS) ===
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize AOS on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAOS);
} else {
    initAOS();
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// === FORM VALIDATION ENHANCEMENTS ===
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.classList.add('error');
            
            // Add error message
            let errorMsg = input.parentElement.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#EF4444';
                errorMsg.style.fontSize = '0.875rem';
                errorMsg.style.marginTop = '0.25rem';
                errorMsg.style.display = 'block';
                input.parentElement.appendChild(errorMsg);
            }
            
            if (input.validity.valueMissing) {
                errorMsg.textContent = 'This field is required';
            } else if (input.validity.typeMismatch) {
                errorMsg.textContent = 'Please enter a valid ' + input.type;
            } else if (input.validity.patternMismatch) {
                errorMsg.textContent = 'Please match the requested format';
            }
        });
        
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorMsg = input.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
});

// === PRELOADER (Optional) ===
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// === LAZY LOADING FOR IMAGES ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === CONSOLE MESSAGE ===
console.log('%c🌟 R2 Unisex Salon & Beauty Academy 🌟', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%cWebsite developed with care and precision', 'font-size: 14px; color: #b0b0b0;');
console.log('%cFor inquiries: 079779 34485', 'font-size: 14px; color: #b0b0b0;');

// === PREVENT CONTEXT MENU ON GALLERY IMAGES (Optional) ===
const galleryImages = document.querySelectorAll('.gallery-image, .gallery-item');
galleryImages.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// === AUTO-HIDE SUCCESS MESSAGES ===
document.querySelectorAll('.success-message.show').forEach(message => {
    setTimeout(() => {
        message.classList.remove('show');
    }, 5000);
});

// === INITIALIZE EVERYTHING ON PAGE LOAD ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    console.log('R2 Salon website initialized successfully!');
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});
