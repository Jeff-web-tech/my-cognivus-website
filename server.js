const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./models/User");

const app = express();


// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Public folder for CSS/images
app.use(express.static("public"));

// Session setup
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: false
}));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cognivus", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// Auth middleware
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/signup'); // redirect to signup if not logged in
    }
}  



// ✅ ROUTES

// Root route - redirect to signup or dashboard
app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/signup");
  }
});

// Home (index.ejs can be added later)
app.get("/index", (req, res) => {
  res.render("index");
});

// Signup
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
    const { fullname, email, password, confirmPassword} = req.body;

    if (password !== confirmPassword) {
        return  res.render("signup", { error: "Passwords do not match" });
    }
  

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("signup", { error: "Email already exists" });
        }

        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ fullname, email, password: hashedPassword });
        await newUser.save();

        // Redirect to Log In page (not logged in yet)
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

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email or password"});
    }

    // Compare password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("login", { error: "Invalid email or password" });
    }  

    // Set session user
    req.session.user = { id: user._id, email: user.email, fullname: user.fullname };

    // Redirect to Dashboard
    res.redirect('/dashboard');

} catch (err) {
    console.error('Sign In error:', err);
    res.render('login', { error: 'An error occurred during sign in. Please try again.' });
}
});

app.get("/quiz", (req, res) => {
  res.render("quiz");
});

// Dashboard
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  res.render("dashboard", { user: req.session.user });
});


function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        // Not logged in → redirect to Sign In
        res.redirect('/login');
    }
}
app.get("/exam", (req, res) => {
    res.render("exam");
});


// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});


app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
