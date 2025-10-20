// Fade-in sections on scroll
(function fadeInHandler() {
    const onScroll = () => {

        document.querySelectorAll('.fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) el.classList.add('visible');
        });
    };
    document.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('load', onscroll);
})();

/* ------- Utilities: Web Crypto SHA-256 to hex ------- */
async function hashPassword(password) {
    const enc = new TextEncoder();
    const data = enc.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex
}

/* ------- Local Storage helpers ------- */
const USERS_KEY = 'cognivus_users';

function loadUsers() {
    const raw = localStorage.getItem(USERS_KEY);
    try {
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* ------- Signup handler (if signup form exists) ------- */
(function setupSignup() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const fullNameEl = document.getElementById('fullName');
    const emailEl = document.getElementById('email');
    const pwdEl = document.getElementById('password');
    const confirmEl = document.getElementById('confirmPassword');
    const errorEl = document.getElementById('signup-error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.textContent = '';

        const name = (fullNameEl.value || '').trim();
        const email = (emailEl.value || '').trim().toLowerCase();
        const pwd = pwdEl.value || '';
        const confirm = confirmEl.value || '';

        // Basic validation
        if (!name) return errorEl.textContent = 'Please enter your full name.';
        if (!email || !/ ^\S+@\S+\.\S+$/.test(email)) return errorEl.textContent = 'Please enter a valid email.';
        if (pwd.length < 8) return errorEl.textContent = 'Passwords do not match.';
        
        // Load users & check existing
        const users = loadUsers();
        if (user[email]) return errorEl.textContent = 'An account with this email already exists. Try signing in.';

        // Hash password and save user
        try {
            const hashed = await hashPassword(pwd);
            users[email] = {
                name,
                email,
                passHash: hashed,
                createdAt: new Date().toISOString()
            };
            saveUsers(users);

            // Success - create a lightweight "session" and redirect

            sessionStorage.setItem('cognivus_session', JSON.stringify({email, name}));
            // Redirect to exam generation page
            window.location.href = 'exam.html';
        }   catch (err) {
            console.error(err);
            errorEl.textContent = 'An unexpected error occurred. Please try again.';
        }
    });
})();

/* ------- Signin handler (if signin form exists) ------- */
(function setupSignin() {
    const form = document.getElementById('signin-form');
    if (!form) return;

    const emailEl = document.getElementById('loginEmail');
    const pwdEl = document.getElementById('loginPassword');
    const errorEl = document.getElementById('signin-error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.textContent = '';

        const email = (emailEl.value || '').trim().toLowerCase();
        const pwd = pwdEl.value || '';

        if (!email || !/ ^\S+@\S+\.\S+$/.test(email)) return errorEl.textContent = 'Please enter a valid email.';
        if (!pwd) return errorEl.textContent = 'Please enter your passwword.';

        const users = loadUsers();
        const user = users[email];
        if (!user) return errorEl.textContent = 'No account found with that email.';

        try {
            const hashed = await hashPassword(pwd);
            if (hashed !== user.passHash) return errorEl.textContent = 'Incorrect password.';

            // Auth success

            sessionStorage.setItem('cognivus_session', JSON.stringify({ email: user.email, name: user.name }));
            window.location.href = 'exam.html';
        }   catch (err) {
            console.error(err);
            errorEl.textContent = 'Login failed. Please try again.';
        }
    });
})();