# MERN Todo App

A simple Todo List application built with the MERN stack (MongoDB, Express, React, Node.js).  
This project allows users to add, update, delete, and toggle tasks as done or pending (CRUD Operations).

---

## Features

- Add new tasks  
- Update existing tasks  
- Delete tasks  
- Mark tasks as done or pending  
- View task list in real-time  
- Clean and responsive UI with React and React Icons  

---

## Folder Structure

```  
/client       # React frontend source code  
/server       # Express backend API and database models  
.env          # Environment variables for sensitive info (e.g. DB connection string)  
.gitignore    # Files/folders to ignore in Git  
README.md     # This file  
```

---

## Getting Started

### Prerequisites

- Node.js installed (v14+ recommended)  
- MongoDB installed and running locally or have a MongoDB Atlas cluster  
- npm or yarn package manager  

### Installation

1. Clone the repository

```bash
git clone https://github.com/PrajwalWadekar/MERN-To-Do-App.git
cd mern-todo-app
```

2. Setup backend

```bash
cd server
npm install
```

3. Create `.env` file inside `server` folder with:

```env
MONGO_URI=mongodb://127.0.0.1:27017/database_name
PORT=3000
```

Replace the URI with your MongoDB connection string if using Atlas or remote DB.

4. Start backend server:

```bash
npm run dev
```

5. Setup frontend

```bash
cd ../client
npm install
npm start
```

6. Open [http://localhost:3000] in your browser to use the app.

---

## Scripts

- `npm run dev` (in server) — starts backend with nodemon for live reload  
- `npm start` (in client) — starts React development server  

---

## Technologies Used

- MongoDB (Database)  
- Mongoose (MongoDB ORM)  
- Express.js (Backend framework)  
- React.js (Frontend library)  
- Axios (HTTP client)  
- React Icons (Icons)  
- Cors (CORS middleware)  

---

## 🌐 Live Demo

Check out the live version of the app:  
🔗 [MERN Todo App Live](https://mern-to-do-app-frontend.vercel.app)

---

## 📸 Screenshot

![App Screenshot](./output.png)




