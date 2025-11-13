const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("./models/User");

const app = express();

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session setup
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cognivus", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// ============================================
// ROUTES
// ============================================

// Root route - redirect to signup or dashboard
app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/index");
  }
});

// Home page
app.get("/index", (req, res) => {
  res.render("index");
});

// Signup
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  // Input validation
  if (!fullname || !email || !password) {
    return res.render("signup", { error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.render("signup", { error: "Passwords do not match" });
  }

  if (password.length < 6) {
    return res.render("signup", { error: "Password must be at least 6 characters" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered" });
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ 
      fullname, 
      email: email.toLowerCase(), 
      password: hashedPassword,
      createdAt: new Date()
    });
    await newUser.save();

    // Redirect to Log In page
    res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err);
    res.render("signup", { error: "Something went wrong. Please try again." });
  }
});

// Login
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", { error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    // Compare password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("login", { error: "Invalid email or password" });
    }

    // Set session user
    req.session.user = { 
      id: user._id, 
      email: user.email, 
      fullname: user.fullname 
    };

    // Redirect to Dashboard
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    res.render('login', { error: 'An error occurred. Please try again.' });
  }
});

// Dashboard
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

// Exam page
app.get("/exam", (req, res) => {
  res.render("exam");
});

// Quiz page
app.get("/quiz", (req, res) => {
  res.render("quiz");
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("/index");
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', { path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
