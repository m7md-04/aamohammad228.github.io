const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

// Mobile menu: toggle and close after clicking a link
menuIcon.onclick = () => navLinks.classList.toggle('active');
navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('active'))
);

// Dark / light mode (remembered)
const themeBtn = document.querySelector('#theme-toggle');
function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    themeBtn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}
let savedDark = false;
try { savedDark = localStorage.getItem('theme') === 'dark'; } catch (e) {}
applyTheme(savedDark);
themeBtn.onclick = () => {
    const dark = !document.body.classList.contains('dark');
    applyTheme(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
};

// Typing effect
const roles = ['Software Engineer', 'SOC Analyst', 'AI/ML Engineer', 'UI/UX Designer'];
const typingEl = document.querySelector('#typing');
let r = 0, c = 0, deleting = false;
function type() {
    const word = roles[r];
    typingEl.textContent = word.slice(0, c);
    if (!deleting && c < word.length) { c++; setTimeout(type, 90); }
    else if (!deleting) { deleting = true; setTimeout(type, 1200); }
    else if (c > 0) { c--; setTimeout(type, 45); }
    else { deleting = false; r = (r + 1) % roles.length; setTimeout(type, 300); }
}
type();

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('show');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Highlight the active nav link
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));

// Contact form: validate all fields, then confirm with an alert
const form = document.querySelector('#contact-form');
const errorBox = document.querySelector('#form-error');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [
        ['#c-name', 'Full Name'],
        ['#c-email', 'Email address'],
        ['#c-country', 'Country'],
        ['#c-msg', 'Comments']
    ];
    errorBox.textContent = '';
    for (const [sel, label] of fields) {
        const input = document.querySelector(sel);
        if (input.value.trim() === '') {
            errorBox.textContent = 'Please fill in the ' + label + ' field.';
            input.focus();
            return;
        }
    }
    const email = document.querySelector('#c-email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorBox.textContent = 'Please enter a valid email address.';
        document.querySelector('#c-email').focus();
        return;
    }
    alert('Thank you! Your form was submitted successfully.');
    form.reset();
});
