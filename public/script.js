// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

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
    window.location.href = "/quiz";
});



const subjectSelect = document.getElementById('subject');
const subContainer = document.getElementById('sub-subject-container');
const subSelect = document.getElementById('subSubject');

subjectSelect.addEventListener('change', () => {
  const selected = subjectSelect.value ;
  subSelect.innerHTML = ''; // Clear previous options

  if (selected === 'computer_science') {
    const csCourses = ['DCIT 103', 'DCIT 101', 'DCIT 104', 'DCIT 102'];
    csCourses.forEach(course => {
      const opt = document.createElement('option');
      opt.value = course;
      opt.textContent.appendChild(opt);
    });
    subContainer.style.display = 'block';
  } else {
    subContainer.style.display = 'none';
  }
});
