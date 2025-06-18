//email 
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;

    const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();
    alert(result.message);
});
  
// Initialize Lucide icons
lucide.createIcons();

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Skills data and progress animation
const skills = [
    { name: 'HTML', level: 90, color: 'from-orange-400 to-orange-600' },
    { name: 'CSS', level: 85, color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', level: 80, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Java', level: 75, color: 'from-red-400 to-red-600' },
    { name: 'C', level: 70, color: 'from-gray-400 to-gray-600' },
    { name: 'SQL', level: 75, color: 'from-green-400 to-green-600' },
    { name: 'Python', level: 80, color: 'from-blue-500 to-green-500' },
    { name: 'Cybersecurity', level: 65, color: 'from-purple-400 to-purple-600' },
];

function initializeSkills() {
    const container = document.getElementById('skills-container');

    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'space-y-2';
        skillElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <span class="font-medium text-gray-700">${skill.name}</span>
                    <span class="text-sm text-gray-500">${skill.level}%</span>
                </div>
                <div class="relative">
                    <div class="w-full bg-gray-200 rounded-full h-3"></div>
                    <div class="progress-bar absolute top-0 left-0 h-3 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out" 
                         style="width: 0%"></div>
                </div>
            `;
        container.appendChild(skillElement);
    });

    // Animate progress bars after a short delay
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach((bar, index) => {
            bar.style.width = skills[index].level + '%';
        });
    }, 500);
}

// Contact form handling
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simple form validation and feedback
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (name && email && message) {
            alert('Thank you for your message! I\'ll get back to you soon.');
            form.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeSkills();
    initializeContactForm();
    initializeAnimations();

    // Re-initialize Lucide icons after dynamic content is added
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
});

// Add active nav state on scroll
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navButtons = document.querySelectorAll('nav button');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navButtons.forEach(button => {
        button.classList.remove('text-purple-600');
        button.classList.add('text-gray-700');
        if (button.getAttribute('onclick').includes(current)) {
            button.classList.remove('text-gray-700');
            button.classList.add('text-purple-600');
        }
    });
});