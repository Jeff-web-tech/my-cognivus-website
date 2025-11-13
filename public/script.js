// ============================================
// Cognivus - Client-side JavaScript
// ============================================

// Mobile Menu Toggle (guard against missing elements)
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navItems = navLinks.querySelectorAll('a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
if (reveals && reveals.length > 0) {
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
}

// Redirect to quiz page on exam form submit
const form = document.getElementById('exam-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = '/quiz';
  });
}

// Subjects / Courses Mapping
const subjects = {
  mathematics: [
    'MATH 121 - Algebra and Trigonometry',
    'MATH 123 - Vectors and Geometry',
    'MATH 122 - Calculus I',
    'MATH 126 - Algebra and Geometry'
  ],
  statistics: [
    'STAT 111 - Introduction to Statistics and Probability I',
    'STAT 112 - Introduction to Statistics and Probability II'
  ],
  computer_science: [
    'DCIT 101 - Introduction to Computer Science',
    'DCIT 103 - Office Productivity Tools',
    'DCIT 104 - Programming Fundamentals',
    'DCIT 102 - Computer Hardware Fundamentals and Circuits'
  ]
};

// Subject selector with course loader
const subjectSelect = document.getElementById('subject');
const courseSelect = document.getElementById('course');
const courseContainer = document.getElementById('course-container');

if (subjectSelect && courseSelect) {
  subjectSelect.addEventListener('change', function () {
    const subject = this.value;

    // reset course dropdown
    courseSelect.innerHTML = '<option value="">-- Select Course --</option>';

    if (subjects[subject]) {
      subjects[subject].forEach(course => {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
      });

      if (courseContainer) {
        courseContainer.style.display = 'block';
        courseContainer.style.animation = 'fadeIn 0.3s ease-in-out';
      }
    } else {
      if (courseContainer) {
        courseContainer.style.display = 'none';
      }
    }
  });
}