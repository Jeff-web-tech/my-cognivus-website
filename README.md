# 🎓 Cognivus

**Engineering the Mind's Frontier**

A modern platform for creating, practicing, and mastering world-class tests in **Mathematics, Statistics**, and **Computer Science**.

---

## ✨ Features

- 📝 **Generate Custom Exams** - Create tailored exams by subject, difficulty, and question count
- ❓ **Interactive Quizzes** - Practice with instantly generated quiz questions
- 👤 **User Authentication** - Secure signup and login with password hashing
- 📊 **Dashboard** - Personalized learning hub for each user
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🔐 **Security-First** - Bcrypt encryption, session management, input validation

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Templating**: EJS
- **Authentication**: Bcrypt + Express Sessions

---

## 📋 Prerequisites

- Node.js v18+ 
- MongoDB (running locally or Atlas)
- npm or yarn

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Jeff-web-tech/my-cognivus-website.git
cd my-cognivus-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your settings (optional if using defaults)
```

### 4. Start MongoDB
Make sure MongoDB is running on `mongodb://127.0.0.1:27017`

```bash
# If using MongoDB locally (Windows example)
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 5. Run the application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start at `http://localhost:3000`

---

## 📂 Project Structure

```
Cognivus/
├── server.js              # Main server file
├── package.json           # Dependencies & scripts
├── .env.example           # Environment variables template
├── models/
│   └── User.js            # MongoDB User schema
├── views/                 # EJS templates
│   ├── index.ejs          # Home page
│   ├── signup.ejs         # Sign up page
│   ├── login.ejs          # Sign in page
│   ├── dashboard.ejs      # User dashboard
│   ├── exam.ejs           # Exam generation
│   ├── quiz.ejs           # Quiz page
│   ├── logout.ejs         # Logout confirmation
│   └── 404.ejs            # Error page
└── public/
    ├── script.js          # Client-side JavaScript
    ├── style.css          # Global styles
    └── images/            # Logo and assets
```

---

## 🔐 Security Features

✅ **Password Hashing** - All passwords are securely hashed with bcrypt  
✅ **Input Validation** - Server-side validation on all user inputs  
✅ **Session Management** - Secure session cookies with 24-hour expiration  
✅ **Email Uniqueness** - Prevents duplicate accounts  
✅ **SQL Injection Prevention** - Uses MongoDB with Mongoose schema validation  
✅ **XSS Protection** - EJS auto-escaping by default  

---

## 🧪 Testing the Application

### Sign Up
1. Go to http://localhost:3000/signup
2. Enter full name, email, password
3. Confirm password and submit

### Sign In
1. Go to http://localhost:3000/login
2. Use credentials from signup
3. Access dashboard

### Generate Exam
1. From dashboard, click "Generate Exam"
2. Select subject, difficulty, and question count
3. Click "Generate Exam" to create quiz

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running. Start it with `mongod` command.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: Change PORT in `.env` or kill the process using port 3000.

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Run `npm install` to install all dependencies.

---

## 📝 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/cognivus

# Server Configuration
PORT=3000
NODE_ENV=development

# Session Secret (CHANGE IN PRODUCTION!)
SESSION_SECRET=your-super-secret-key-change-this

# Security
BCRYPT_ROUNDS=10
```

---

## 🚀 Deployment

### Deploy to Heroku

1. Create a Heroku account and install CLI
2. Update `.env` with production MongoDB URI (e.g., MongoDB Atlas)
3. Deploy:
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy to Other Platforms
Use the Node.js deployment options and configure environment variables in your platform's dashboard.

---

## 📈 Future Enhancements

- [ ] Question bank database with AI-generated questions
- [ ] Progress tracking and analytics
- [ ] Leaderboard system
- [ ] Mobile app with React Native
- [ ] Real-time collaboration features
- [ ] Advanced exam scheduling
- [ ] Integration with popular learning platforms

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Jeff-web-tech**  
GitHub: [@Jeff-web-tech](https://github.com/Jeff-web-tech)

---

## 📞 Support

For issues, questions, or suggestions, open an issue on GitHub.

---

**Engineering the Mind's Frontier** 🚀
