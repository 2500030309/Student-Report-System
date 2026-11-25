# EduTrack – Student Academic Performance & Report Management System

> **A Premium, Production-Quality Educational SaaS Application**  
> Autonomous Campus Academic Portal • Designed for NAAC 'A+' & NBA Tier-1 Higher Education Institutions  

---

## 🌟 Executive Summary

**EduTrack** is an enterprise-grade academic management system designed to monitor student performance, attendance compliance, and examination metrics. It features four distinct role-based dashboards:
1. **Administrator (Academic Dean / Registrar)**
2. **Faculty / Teacher (Class Incharge & Evaluator)**
3. **Student (Autonomous Learner)**
4. **Parent / Guardian (Active Monitor)**

The system is built as a 100% frontend-ready, interactive application leveraging **React, Vite, Tailwind CSS, Context API, and LocalStorage** for real-time persistence without introducing external database overhead during Phase 1.

---

## 🚀 Key Features

### 1. Multi-Role Authentication & Demo Selector
- Single Sign-On (SSO) login experience with quick 1-click demo role switching.
- Persistent sessions using `localStorage` and `sessionStorage`.
- Forgot password workflow with simulated verification dispatch.

### 2. Administrator Portal
- **KPI Metrics:** Total Students, Total Faculty, Active Courses, Average Attendance, Institutional CGPA.
- **Student Management:** Comprehensive student roster, multi-filter by department/semester/attendance status, search, Add Student modal, Edit Student modal, Student Dossier view, and Delete confirmation.
- **Faculty Management:** Complete faculty directory, qualifications, experience, and subject allocations.
- **Classes & Curriculum:** Course catalog with credit weightages, semester rosters, and classroom mapping.
- **Academic Reports:** Institute-wide digital transcript generation with printable layout.
- **Analytics:** Longitudinal progression trajectories, pass ratios, and grade distribution charts.
- **Announcements & Broadcasts:** Multi-audience circular publishing with priority tags.
- **Institutional Settings:** Minimum attendance threshold customization (default 75%), grading rules, and factory reset.

### 3. Faculty / Teacher Portal
- **Dashboard:** Today's schedule (theory + lab), class attendance health, pending assessment reminders.
- **Attendance Management:** Interactive daily attendance sheet (Present, Absent, Late), 1-click "Mark All Present", real-time attendance rate calculation, and localStorage persistence.
- **Marks & Grades Management:** Continuous evaluation entry for Internal Assessment 1, Internal Assessment 2, Lab/Assignments, and End-Semester exams with automatic grade and grade-point calculations.
- **Student Remarks:** Individual qualitative observations and behavioral advisory.
- **Consolidated Grade Sheets:** Class tabulation register with print-ready tables.

### 4. Student Portal
- **Personalized Dashboard:** CGPA (8.64), Attendance gauge (88.5%), subject count, semester trajectory.
- **Subject-Wise Attendance Breakdown:** Visual attendance meters for all enrolled courses with exam eligibility alerts.
- **Examination Results:** Course-by-course component breakdown (Internal 1, Internal 2, Assignment, End Sem).
- **Official Digital Report Card:** Complete transcript with institutional crest, QR code verification, credits breakdown, SGPA, CGPA, faculty remarks, and printable PDF styling with confetti celebration!
- **Examination Timetable & Announcements:** Upcoming dates and venues.

### 5. Parent / Guardian Portal
- **Child Dossier:** Real-time visibility into ward's performance (Rohan Sharma, 22CSE042).
- **Attendance Compliance:** Instant check against the institutional 75% threshold.
- **Results & Marks:** Subject-wise performance tracking and distinction status.
- **Faculty Remarks:** Direct feedback from class teachers and department mentors.
- **Progress Report Card:** High-resolution digital report card ready for print/download.

---

## 🛠️ Technology Stack

- **Framework:** React 18 (Functional Components & Hooks)
- **Bundler:** Vite 6
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti
- **State & Persistence:** Context API + LocalStorage Service Layer

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Primary Persona |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@edutrack.edu` | *Any / demopass123* | Dr. K. S. Ramanathan (Dean) |
| **Faculty** | `faculty@edutrack.edu` | *Any / demopass123* | Prof. Sneha Sen (Class Incharge) |
| **Student** | `student@edutrack.edu` | *Any / demopass123* | Rohan Sharma (22CSE042) |
| **Parent** | `parent@edutrack.edu` | *Any / demopass123* | Mr. Ramesh Sharma (Father) |

*(You can also use the 1-click demo persona buttons on the login page or the persistent switcher in the navigation sidebar.)*

---

## 💻 Local Setup & Execution

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production preview
npm run build
```

---

## 📐 Project Structure

```
src/
├── assets/
├── components/
│   ├── common/             # Card, Badge, Modal, Button, StatsCard, SimpleCharts
│   ├── layout/             # Sidebar, Navbar, AppLayout
│   └── reports/            # StudentReportCard (Print & PDF ready)
├── context/
│   ├── AuthContext.jsx     # Demo authentication & active user state
│   ├── ThemeContext.jsx    # Light / Dark theme toggling
│   └── AcademicDataContext.jsx # Unified data store & localStorage persistence
├── data/
│   └── mockData.js         # Realistic university data, courses, marks & students
├── pages/
│   ├── auth/               # LoginPage with demo role switch
│   ├── admin/              # Dashboard, Students, Faculty, Classes, Analytics, Reports, Settings
│   ├── faculty/            # Dashboard, Students, Attendance, Marks, Remarks, Reports
│   ├── student/            # Dashboard, Attendance, Results, Progress, ReportCard, Profile
│   └── parent/             # Dashboard, Attendance, Results, Remarks, ReportCard, Profile
├── styles/
│   ├── variables.css       # Design tokens & color variables
│   ├── animations.css      # Smooth transitions, keyframes & glassmorphism
│   └── globals.css         # Tailwind base & print stylesheets
├── utils/
│   ├── calculations.js     # GPA, SGPA, CGPA & grade calculation algorithms
│   └── storage.js          # LocalStorage abstraction layer
├── App.jsx
└── main.jsx
```
