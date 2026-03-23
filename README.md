# Shortify Pro - URL Shortener Application

This project is a full-stack URL Shortener where users can create short links and track analytics.  

**Live Demo:** [Frontend Link](https://url-frontend-eta-two.vercel.app/)  
**Backend Link:** (https://url-0bp8.onrender.com/)

---

## Features

### Authentication
- User signup and login
- Protected dashboard routes
- Each user manages only their own URLs

### URL Shortening
- Submit a long URL and generate a unique short URL
- Redirect to original URL when short URL is clicked
- URL validation before shortening

### Dashboard
- View all created short URLs
- Display:
  - Original URL
  - Short URL
  - Creation date
  - Total clicks
- Copy or delete short URL

### Analytics
- Count number of clicks per short URL
- Record timestamp of each visit
- Show:
  - Total clicks
  - Last visited time
  - Recent visit history

### UI / Bonus Features
- Responsive and clean interface
- Gradient background
- Application name: **Shortify Pro**
- (Optional: QR codes, charts, custom alias, etc.)

---

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: JWT
- Styling: CSS with gradient backgrounds
- Deployment: Vercel (frontend), Render/Railway (backend)

---

## Setup Instructions

### Backend
1. Clone backend repo: `<backend-repo-link>`
2. Install dependencies:
   ```bash
   npm install

🌐 Live Project

👉 Frontend: https://url-frontend-g7cb0w33c-vishva-vaisnavis-projects.vercel.app?_vercel_share=LRfJ0778lS5eKEZ0F2fmPVUHKY7zW5Xs
👉 Backend: https://url-0bp8.onrender.com

🤖 AI Planning & Development Notes

This project was built using structured AI-assisted development:

Designed REST APIs for authentication and URL management
Implemented JWT-based protected routes
Used MongoDB schema for users and URLs
Built modular frontend components (Login, Register, Dashboard)
Integrated backend APIs using Axios
Designed responsive UI using Tailwind CSS
Iteratively improved UX and UI using AI prompts

## 🎬 Video Demo

Watch the full demo of **Shortify Pro** here: [Loom Video](https://www.loom.com/share/e6264d93f2f74b118a5b9332aa9b4ef4)

This video demonstrates:
- Signup/Login
- URL shortening
- Dashboard functionality
- Analytics tracking
- Redirect working
- Backend logs & database entries
