// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    }
  }
});

// Mobile nav toggle
const toggle = document.querySelector(" .menu-toggle");
const navLinks = document.querySelector(" .nav-links");
toggle.addEventListener("click", () => navLinks.classList.toggle("active"));

// Redirect to quiz page on form submit
const form = document.getElementById("exam-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "quiz.html";
});