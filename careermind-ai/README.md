# CareerMind AI

An AI-Powered Career Advisor designed specifically for engineering students to help them practice mock interviews, review resumes, and access high-quality engineering notes and courses.

## Features

- **AI Career Agent**: Intelligent chat interface to practice Technical, HR, and System Design rounds. Get instant scoring and feedback.
- **Engineering Notes**: Expertly curated notes on DSA, DBMS, OS, Computer Networks, and System Design.
- **Premium Courses**: Project and outcome-driven courses to crack top-tier companies.
- **Mock Interviews Simulator**: Interactive UI for simulating real world interview processes.
- **Authentication**: JWT-based login and registration.

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS v4 for utility-first styling
- Framer Motion for beautiful micro-animations
- React Router DOM
- Axios
- Lucide React (Icons)

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcryptjs for password hashing
- Environment Variables

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local MongoDB instance

### Environment Variables
Create a `.env` file in the `/backend` folder with the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/careermind
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```

### Setup Backend
```bash
cd backend
npm install
node server.js
# Or start with nodemon if installed globally
```

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

## Running the Application

Open your browser and navigate to `http://localhost:5173`. 
The backend server runs on `http://localhost:5000`.

## Architecture & Design
The UI strictly adheres to a modern, dynamic, and premium aesthetic:
- **Primary Colors**: Green (`#16A34A`), Dark Green (`#14532D`), Red Accent (`#EF4444`)
- **Animations**: Soft hover effects, glassmorphic styles, typing text effects.
- **Responsive**: Fully optimized for mobile, tablet, and desktop screens.
