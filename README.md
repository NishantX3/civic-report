# 🌍 Civic Report — AI-Powered Local Issue Reporting Platform

Civic Report is a full-stack web platform designed to make reporting and managing local civic issues simple, transparent, and efficient.

Citizens can report problems such as potholes, sanitation issues, electricity-related problems, road damage, and other local issues with images and location details. Authorities can access a dedicated dashboard to review, manage, track, and resolve reported issues.

The platform also integrates AI-powered functionality to assist with identifying the type of issue and generating useful descriptions from uploaded images.

---

## ✨ Key Features

### 👤 Citizen Features

* 📝 Report local civic issues with detailed information
* 📸 Upload images related to the reported issue
* 📍 Automatically capture issue location using geolocation
* 🤖 AI-assisted issue detection from uploaded images
* ✍️ AI-assisted issue description/caption generation
* 📊 Track submitted reports and their current status
* 🔎 View and manage personal reports
* 🌐 Hindi and English language support
* 📱 Responsive interface for desktop and mobile devices
* 🔐 Secure authentication and protected user functionality

### 🏛️ Authority Features

* 🏢 Dedicated authority portal
* 📋 View citizen-submitted reports
* 🔍 Review issue details and uploaded images
* 📍 Access reported issue locations
* 🔄 Update issue status
* 📊 Monitor reported issues through the authority dashboard
* ⚡ Manage issues throughout their lifecycle from reporting to resolution

### 🤖 AI-Powered Functionality

Civic Report uses AI-assisted functionality to make the reporting process easier and more informative.

* Automatic issue-type detection from uploaded images
* AI-generated descriptions/captions
* Faster and more structured issue reporting
* Reduced manual effort while submitting civic complaints

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* Framer Motion
* React Icons
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Multer
* CORS
* dotenv

### Additional Integrations

* Nodemailer
* Twilio
* node-fetch
* AI-powered image/issue processing

---

## 🏗️ Project Architecture

```text
civic-report/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── authorityServer.js
│   └── server.js
│
├── public/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── index.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔐 Authentication & Security

The application includes authentication and protected functionality using:

* JWT-based authentication
* Password hashing with bcryptjs
* Protected routes
* Environment-based configuration
* CORS configuration
* Secure API communication

Sensitive credentials and API keys should be stored in environment variables and should never be committed to the repository.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB
* Git

---

### 1. Install Dependencies

Clone the repository and enter the project directory:

```bash
git clone https://github.com/NishantX3/civic-report.git
cd civic-report
npm install
```

---

### 2. Configure Environment Variables

Create a `.env` file according to the environment variables required by the application.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any additional API credentials required by the AI, email, SMS, or other integrations.

> Never commit your real `.env` file or private API keys to GitHub.

---

### 3. Start the Application

The project provides separate scripts for the frontend, backend, and authority server.

### Start everything together

```bash
npm run dev
```

### Start frontend only

```bash
npm start
```

### Start backend

```bash
npm run start:backend
```

### Start authority server

```bash
npm run start:authority
```

---

## 🔄 Issue Lifecycle

```text
Citizen
   │
   ▼
Report Issue
   │
   ├── Image
   ├── Description
   └── Location
   │
   ▼
AI-Assisted Processing
   │
   ▼
Authority Dashboard
   │
   ▼
Issue Review
   │
   ▼
Status Update
   │
   ├── Pending
   ├── In Progress
   └── Resolved
   │
   ▼
Citizen Tracking
```

---

## 🎯 Problem It Solves

Local civic problems are often difficult to report, track, and follow up on efficiently.

Civic Report provides a centralized digital platform where citizens can:

* Report problems from their location
* Attach visual evidence
* Provide accurate issue information
* Track the progress of their reports

At the same time, authorities get a structured interface for managing reported issues and updating their status.

---

## 💡 Why Civic Report?

Civic Report focuses on three important aspects of civic issue management:

### Accessibility

Citizens can report issues through a simple and responsive interface with Hindi and English language support.

### Transparency

Users can track the progress of their submitted reports instead of relying only on offline communication.

### Efficiency

AI-assisted reporting and a dedicated authority dashboard help organize issue information and streamline issue management.

---

## 📱 Responsive Experience

The application is designed to work across different screen sizes, providing a consistent experience on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

---

## 🔮 Future Improvements

Potential improvements include:

* 🔔 Real-time notifications
* 🗺️ Advanced issue mapping
* 📊 Advanced analytics and statistics
* 🤖 More intelligent issue classification
* 🏛️ Integration with municipal systems
* 📍 Nearby issue discovery
* 👥 Community-based issue verification
* 🌐 Additional Indian language support
* 📲 Progressive Web App support

---

## 👨‍💻 Developer

### Nishant Kumar

Full-Stack Developer focused on building practical web applications using modern frontend and backend technologies.

**Technologies:** React.js · JavaScript · Node.js · Express.js · MongoDB · Mongoose · Tailwind CSS · REST APIs · JWT

---

## 📄 License

This project is intended for educational, development, and demonstration purposes.

---

## ⭐ Civic Report

**Report. Track. Resolve.**

A technology-driven approach to making local civic issue reporting more accessible and transparent.
