// Realistic Mock Data for EduTrack - Academic Performance & Report Management System

export const INSTITUTION_INFO = {
  name: "Apex Institute of Science & Technology",
  shortName: "AIST",
  tagline: "Autonomous Institution • Accredited NAAC 'A+' Grade • NBA Tier-1",
  address: "Knowledge City Campus, Tech Boulevard, Sector 62, Bengaluru, 560103",
  code: "AIST-BLR-042",
  affiliation: "Affiliated to State Technological University & Approved by AICTE",
  contact: {
    email: "registrar@aist.edu.in",
    phone: "+91 80 2845 9000",
    website: "https://aist.edu.in"
  },
  currentAcademicYear: "2024-2025",
  currentSemester: "Fall Semester (Odd)"
};

export const GRADING_SCALE = [
  { min: 90, max: 100, grade: 'O', point: 10, description: 'Outstanding', color: 'emerald' },
  { min: 80, max: 89, grade: 'A+', point: 9, description: 'Excellent', color: 'indigo' },
  { min: 70, max: 79, grade: 'A', point: 8, description: 'Very Good', color: 'blue' },
  { min: 60, max: 69, grade: 'B+', point: 7, description: 'Good', color: 'teal' },
  { min: 55, max: 59, grade: 'B', point: 6, description: 'Above Average', color: 'amber' },
  { min: 50, max: 54, grade: 'C', point: 5, description: 'Pass', color: 'orange' },
  { min: 0, max: 49, grade: 'F', point: 0, description: 'Fail / Re-appear', color: 'rose' }
];

export const MOCK_USERS = [
  {
    id: "ADM001",
    role: "admin",
    name: "Dr. K. S. Ramanathan",
    email: "admin@edutrack.edu",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    designation: "Academic Dean & Registrar",
    department: "Institutional Administration",
    phone: "+91 98450 12345"
  },
  {
    id: "FAC001",
    role: "faculty",
    name: "Prof. Sneha Sen",
    email: "faculty@edutrack.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    designation: "Associate Professor & Class Incharge",
    department: "Computer Science & Engineering",
    phone: "+91 98450 67890",
    assignedSubjects: ["SUB-CSE501", "SUB-CSE503"],
    assignedClasses: ["CSE-5A", "CSE-5B"]
  },
  {
    id: "STU2024001",
    role: "student",
    name: "Rohan Sharma",
    rollNumber: "22CSE042",
    email: "student@edutrack.edu",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    department: "Computer Science & Engineering",
    program: "B.Tech (Hons.) Computer Science",
    classId: "CSE-5A",
    semester: 5,
    admissionYear: 2022,
    cgpa: 8.64,
    attendanceRate: 88.5,
    parentId: "PAR001",
    phone: "+91 91234 56789"
  },
  {
    id: "PAR001",
    role: "parent",
    name: "Mr. Ramesh Sharma",
    email: "parent@edutrack.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    relation: "Father",
    studentId: "STU2024001",
    occupation: "Senior Technical Architect",
    phone: "+91 98111 22334"
  }
];

export const MOCK_SUBJECTS = [
  { id: "SUB-CSE501", code: "CS501", name: "Design & Analysis of Algorithms", credits: 4, facultyId: "FAC001", facultyName: "Prof. Sneha Sen", department: "CSE", semester: 5, totalClasses: 45 },
  { id: "SUB-CSE502", code: "CS502", name: "Database Management Systems", credits: 4, facultyId: "FAC002", facultyName: "Dr. Rajesh Kumar", department: "CSE", semester: 5, totalClasses: 42 },
  { id: "SUB-CSE503", code: "CS503", name: "Computer Networks & Security", credits: 3, facultyId: "FAC001", facultyName: "Prof. Sneha Sen", department: "CSE", semester: 5, totalClasses: 38 },
  { id: "SUB-CSE504", code: "CS504", name: "Theory of Computation", credits: 3, facultyId: "FAC003", facultyName: "Dr. Amit Trivedi", department: "CSE", semester: 5, totalClasses: 36 },
  { id: "SUB-CSE505", code: "CS505", name: "Full-Stack Web Engineering", credits: 3, facultyId: "FAC004", facultyName: "Prof. Meera Pillai", department: "CSE", semester: 5, totalClasses: 40 },
  { id: "SUB-CSE506", code: "CS506P", name: "DBMS & Algorithms Laboratory", credits: 2, facultyId: "FAC001", facultyName: "Prof. Sneha Sen", department: "CSE", semester: 5, totalClasses: 28 },
];

export const MOCK_CLASSES = [
  { id: "CSE-5A", name: "B.Tech CSE - 5th Sem (Section A)", department: "CSE", semester: 5, studentsCount: 42, classTeacher: "Prof. Sneha Sen", room: "Tech Block - Room 302" },
  { id: "CSE-5B", name: "B.Tech CSE - 5th Sem (Section B)", department: "CSE", semester: 5, studentsCount: 40, classTeacher: "Dr. Rajesh Kumar", room: "Tech Block - Room 304" },
  { id: "ECE-5A", name: "B.Tech ECE - 5th Sem (Section A)", department: "ECE", semester: 5, studentsCount: 38, classTeacher: "Dr. Amit Trivedi", room: "Newton Hall - Room 108" },
  { id: "CSE-3A", name: "B.Tech CSE - 3rd Sem (Section A)", department: "CSE", semester: 3, studentsCount: 45, classTeacher: "Prof. Meera Pillai", room: "Tech Block - Room 201" }
];

export const MOCK_FACULTY_LIST = [
  {
    id: "FAC001",
    name: "Prof. Sneha Sen",
    email: "faculty@edutrack.edu",
    phone: "+91 98450 67890",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    qualification: "M.Tech, Ph.D (Pursuing)",
    experience: "9 Years",
    subjects: ["Design & Analysis of Algorithms", "Computer Networks & Security"],
    assignedClasses: ["CSE-5A", "CSE-5B"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    id: "FAC002",
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@edutrack.edu",
    phone: "+91 98450 11223",
    designation: "Professor & Head of Department",
    department: "Computer Science & Engineering",
    qualification: "Ph.D (IIT Bombay)",
    experience: "16 Years",
    subjects: ["Database Management Systems"],
    assignedClasses: ["CSE-5A", "CSE-5B"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    id: "FAC003",
    name: "Dr. Amit Trivedi",
    email: "amit.trivedi@edutrack.edu",
    phone: "+91 98450 33445",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    qualification: "Ph.D (IISc Bangalore)",
    experience: "11 Years",
    subjects: ["Theory of Computation"],
    assignedClasses: ["CSE-5A", "ECE-5A"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    id: "FAC004",
    name: "Prof. Meera Pillai",
    email: "meera.pillai@edutrack.edu",
    phone: "+91 98450 55667",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    qualification: "M.Tech (Software Engg)",
    experience: "6 Years",
    subjects: ["Full-Stack Web Engineering"],
    assignedClasses: ["CSE-5A", "CSE-3A"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    status: "Active"
  }
];

export const MOCK_STUDENTS = [
  {
    id: "STU2024001",
    rollNumber: "22CSE042",
    name: "Rohan Sharma",
    email: "student@edutrack.edu",
    gender: "Male",
    dob: "2004-05-14",
    department: "Computer Science & Engineering",
    classId: "CSE-5A",
    className: "B.Tech CSE - Sem 5A",
    semester: 5,
    cgpa: 8.64,
    attendanceRate: 88.5,
    status: "Active",
    parentId: "PAR001",
    parentName: "Mr. Ramesh Sharma",
    parentPhone: "+91 98111 22334",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    address: "Flat 402, Green Meadows Apt, Indiranagar, Bengaluru",
    bloodGroup: "B+",
    facultyRemarks: "Consistent performer with sharp analytical skills in Algorithms and DBMS. Proactively participates in technical discussions.",
    remarksDate: "2024-11-15",
    remarksAuthor: "Prof. Sneha Sen"
  },
  {
    id: "STU2024002",
    rollNumber: "22CSE043",
    name: "Aarav Patel",
    email: "aarav.patel@student.edutrack.edu",
    gender: "Male",
    dob: "2004-08-22",
    department: "Computer Science & Engineering",
    classId: "CSE-5A",
    className: "B.Tech CSE - Sem 5A",
    semester: 5,
    cgpa: 7.92,
    attendanceRate: 82.0,
    status: "Active",
    parentName: "Mr. Vikram Patel",
    parentPhone: "+91 98222 33445",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    address: "12, Koramangala 4th Block, Bengaluru",
    bloodGroup: "O+",
    facultyRemarks: "Good grasping power, needs more focus on laboratory implementations and timely submissions.",
    remarksDate: "2024-11-12",
    remarksAuthor: "Prof. Sneha Sen"
  },
  {
    id: "STU2024003",
    rollNumber: "22CSE044",
    name: "Priya Nair",
    email: "priya.nair@student.edutrack.edu",
    gender: "Female",
    dob: "2004-02-18",
    department: "Computer Science & Engineering",
    classId: "CSE-5A",
    className: "B.Tech CSE - Sem 5A",
    semester: 5,
    cgpa: 9.42,
    attendanceRate: 94.8,
    status: "Active",
    parentName: "Mrs. Radhika Nair",
    parentPhone: "+91 98333 44556",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    address: "74, HSR Layout Sector 2, Bengaluru",
    bloodGroup: "A+",
    facultyRemarks: "Exceptional academic performance. Top ranker in mid-term assessments and outstanding laboratory conduct.",
    remarksDate: "2024-11-18",
    remarksAuthor: "Dr. Rajesh Kumar"
  },
  {
    id: "STU2024004",
    rollNumber: "22CSE045",
    name: "Vikram Rao",
    email: "vikram.rao@student.edutrack.edu",
    gender: "Male",
    dob: "2003-11-30",
    department: "Computer Science & Engineering",
    classId: "CSE-5A",
    className: "B.Tech CSE - Sem 5A",
    semester: 5,
    cgpa: 6.85,
    attendanceRate: 68.4, // Warning < 75%
    status: "Active",
    parentName: "Mr. Suresh Rao",
    parentPhone: "+91 98444 55667",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    address: "88, Whitefield Main Road, Bengaluru",
    bloodGroup: "AB+",
    facultyRemarks: "Attendance is critically low (below 75% threshold). Requires mandatory remedial sessions in CS504.",
    remarksDate: "2024-11-10",
    remarksAuthor: "Prof. Sneha Sen"
  },
  {
    id: "STU2024005",
    rollNumber: "22CSE046",
    name: "Ananya Verma",
    email: "ananya.verma@student.edutrack.edu",
    gender: "Female",
    dob: "2004-07-09",
    department: "Computer Science & Engineering",
    classId: "CSE-5A",
    className: "B.Tech CSE - Sem 5A",
    semester: 5,
    cgpa: 8.95,
    attendanceRate: 91.2,
    status: "Active",
    parentName: "Dr. Alok Verma",
    parentPhone: "+91 98555 66778",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    address: "21, Malleshwaram 15th Cross, Bengaluru",
    bloodGroup: "O-",
    facultyRemarks: "Very creative in Web Engineering projects. Excellent teamwork in group capstone assignments.",
    remarksDate: "2024-11-16",
    remarksAuthor: "Prof. Meera Pillai"
  },
  {
    id: "STU2024006",
    rollNumber: "22CSE047",
    name: "Devanshu Deshmukh",
    email: "devanshu.d@student.edutrack.edu",
    gender: "Male",
    dob: "2003-09-15",
    department: "Computer Science & Engineering",
    classId: "CSE-5A",
    className: "B.Tech CSE - Sem 5A",
    semester: 5,
    cgpa: 7.45,
    attendanceRate: 78.5,
    status: "Active",
    parentName: "Mr. Nitin Deshmukh",
    parentPhone: "+91 98666 77889",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    address: "310, Jayanagar 4th Block, Bengaluru",
    bloodGroup: "B-",
    facultyRemarks: "Steady improvement in programming evaluations. Good potential in networking concepts.",
    remarksDate: "2024-11-08",
    remarksAuthor: "Prof. Sneha Sen"
  },
  {
    id: "STU2024007",
    rollNumber: "22CSE048",
    name: "Kavya Subramaniam",
    email: "kavya.s@student.edutrack.edu",
    gender: "Female",
    dob: "2004-03-25",
    department: "Computer Science & Engineering",
    classId: "CSE-5A",
    className: "B.Tech CSE - Sem 5A",
    semester: 5,
    cgpa: 8.78,
    attendanceRate: 92.0,
    status: "Active",
    parentName: "Mr. K. Subramaniam",
    parentPhone: "+91 98777 88990",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    address: "54, Electronic City Phase 1, Bengaluru",
    bloodGroup: "A-",
    facultyRemarks: "Great dedication in Database lab projects. Well structured code and prompt test submissions.",
    remarksDate: "2024-11-14",
    remarksAuthor: "Dr. Rajesh Kumar"
  },
  {
    id: "STU2024008",
    rollNumber: "22CSE049",
    name: "Tanmay Bansal",
    email: "tanmay.b@student.edutrack.edu",
    gender: "Male",
    dob: "2004-10-04",
    department: "Computer Science & Engineering",
    classId: "CSE-5A",
    className: "B.Tech CSE - Sem 5A",
    semester: 5,
    cgpa: 8.12,
    attendanceRate: 85.0,
    status: "Active",
    parentName: "Mr. Rajiv Bansal",
    parentPhone: "+91 98888 99001",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    address: "18, Marathahalli Outer Ring Road, Bengaluru",
    bloodGroup: "O+",
    facultyRemarks: "Active participant in algorithms coding competitions. Demonstrates strong problem solving aptitude.",
    remarksDate: "2024-11-17",
    remarksAuthor: "Prof. Sneha Sen"
  }
];

// Subject-wise Marks for Students across examinations
export const MOCK_MARKS_RECORDS = [
  // Rohan Sharma STU2024001
  {
    id: "MRK-001",
    studentId: "STU2024001",
    studentName: "Rohan Sharma",
    rollNumber: "22CSE042",
    classId: "CSE-5A",
    subjectId: "SUB-CSE501",
    subjectCode: "CS501",
    subjectName: "Design & Analysis of Algorithms",
    credits: 4,
    assessments: {
      internal1: { scored: 44, max: 50 },
      internal2: { scored: 46, max: 50 },
      assignment: { scored: 18, max: 20 },
      endSem: { scored: 86, max: 100 }
    },
    totalPercentage: 88.0,
    grade: "A+",
    gradePoint: 9,
    status: "Pass"
  },
  {
    id: "MRK-002",
    studentId: "STU2024001",
    studentName: "Rohan Sharma",
    rollNumber: "22CSE042",
    classId: "CSE-5A",
    subjectId: "SUB-CSE502",
    subjectCode: "CS502",
    subjectName: "Database Management Systems",
    credits: 4,
    assessments: {
      internal1: { scored: 42, max: 50 },
      internal2: { scored: 45, max: 50 },
      assignment: { scored: 19, max: 20 },
      endSem: { scored: 84, max: 100 }
    },
    totalPercentage: 86.2,
    grade: "A+",
    gradePoint: 9,
    status: "Pass"
  },
  {
    id: "MRK-003",
    studentId: "STU2024001",
    studentName: "Rohan Sharma",
    rollNumber: "22CSE042",
    classId: "CSE-5A",
    subjectId: "SUB-CSE503",
    subjectCode: "CS503",
    subjectName: "Computer Networks & Security",
    credits: 3,
    assessments: {
      internal1: { scored: 41, max: 50 },
      internal2: { scored: 43, max: 50 },
      assignment: { scored: 18, max: 20 },
      endSem: { scored: 82, max: 100 }
    },
    totalPercentage: 83.5,
    grade: "A+",
    gradePoint: 9,
    status: "Pass"
  },
  {
    id: "MRK-004",
    studentId: "STU2024001",
    rollNumber: "22CSE042",
    studentName: "Rohan Sharma",
    classId: "CSE-5A",
    subjectId: "SUB-CSE504",
    subjectCode: "CS504",
    subjectName: "Theory of Computation",
    credits: 3,
    assessments: {
      internal1: { scored: 39, max: 50 },
      internal2: { scored: 41, max: 50 },
      assignment: { scored: 17, max: 20 },
      endSem: { scored: 79, max: 100 }
    },
    totalPercentage: 79.5,
    grade: "A",
    gradePoint: 8,
    status: "Pass"
  },
  {
    id: "MRK-005",
    studentId: "STU2024001",
    rollNumber: "22CSE042",
    studentName: "Rohan Sharma",
    classId: "CSE-5A",
    subjectId: "SUB-CSE505",
    subjectCode: "CS505",
    subjectName: "Full-Stack Web Engineering",
    credits: 3,
    assessments: {
      internal1: { scored: 48, max: 50 },
      internal2: { scored: 47, max: 50 },
      assignment: { scored: 20, max: 20 },
      endSem: { scored: 92, max: 100 }
    },
    totalPercentage: 93.8,
    grade: "O",
    gradePoint: 10,
    status: "Pass"
  },
  {
    id: "MRK-006",
    studentId: "STU2024001",
    rollNumber: "22CSE042",
    studentName: "Rohan Sharma",
    classId: "CSE-5A",
    subjectId: "SUB-CSE506",
    subjectCode: "CS506P",
    subjectName: "DBMS & Algorithms Laboratory",
    credits: 2,
    assessments: {
      internal1: { scored: 47, max: 50 },
      internal2: { scored: 48, max: 50 },
      assignment: { scored: 19, max: 20 },
      endSem: { scored: 95, max: 100 }
    },
    totalPercentage: 95.0,
    grade: "O",
    gradePoint: 10,
    status: "Pass"
  },

  // Aarav Patel STU2024002
  {
    id: "MRK-007",
    studentId: "STU2024002",
    studentName: "Aarav Patel",
    rollNumber: "22CSE043",
    classId: "CSE-5A",
    subjectId: "SUB-CSE501",
    subjectCode: "CS501",
    subjectName: "Design & Analysis of Algorithms",
    credits: 4,
    assessments: { internal1: { scored: 38, max: 50 }, internal2: { scored: 40, max: 50 }, assignment: { scored: 16, max: 20 }, endSem: { scored: 78, max: 100 } },
    totalPercentage: 78.2,
    grade: "A",
    gradePoint: 8,
    status: "Pass"
  },
  // Priya Nair STU2024003
  {
    id: "MRK-008",
    studentId: "STU2024003",
    studentName: "Priya Nair",
    rollNumber: "22CSE044",
    classId: "CSE-5A",
    subjectId: "SUB-CSE501",
    subjectCode: "CS501",
    subjectName: "Design & Analysis of Algorithms",
    credits: 4,
    assessments: { internal1: { scored: 49, max: 50 }, internal2: { scored: 50, max: 50 }, assignment: { scored: 20, max: 20 }, endSem: { scored: 97, max: 100 } },
    totalPercentage: 97.5,
    grade: "O",
    gradePoint: 10,
    status: "Pass"
  },
  // Vikram Rao STU2024004 (Needs attention)
  {
    id: "MRK-009",
    studentId: "STU2024004",
    studentName: "Vikram Rao",
    rollNumber: "22CSE045",
    classId: "CSE-5A",
    subjectId: "SUB-CSE501",
    subjectCode: "CS501",
    subjectName: "Design & Analysis of Algorithms",
    credits: 4,
    assessments: { internal1: { scored: 31, max: 50 }, internal2: { scored: 34, max: 50 }, assignment: { scored: 14, max: 20 }, endSem: { scored: 63, max: 100 } },
    totalPercentage: 64.5,
    grade: "B+",
    gradePoint: 7,
    status: "Pass"
  },
  // Ananya Verma STU2024005
  {
    id: "MRK-010",
    studentId: "STU2024005",
    studentName: "Ananya Verma",
    rollNumber: "22CSE046",
    classId: "CSE-5A",
    subjectId: "SUB-CSE501",
    subjectCode: "CS501",
    subjectName: "Design & Analysis of Algorithms",
    credits: 4,
    assessments: { internal1: { scored: 45, max: 50 }, internal2: { scored: 47, max: 50 }, assignment: { scored: 19, max: 20 }, endSem: { scored: 90, max: 100 } },
    totalPercentage: 90.5,
    grade: "O",
    gradePoint: 10,
    status: "Pass"
  }
];

// Detailed Attendance records for subjects & students
export const MOCK_ATTENDANCE_SUMMARY = [
  { subjectId: "SUB-CSE501", subjectCode: "CS501", subjectName: "Design & Analysis of Algorithms", totalClasses: 45, attendedClasses: 40, percentage: 88.9, faculty: "Prof. Sneha Sen" },
  { subjectId: "SUB-CSE502", subjectCode: "CS502", subjectName: "Database Management Systems", totalClasses: 42, attendedClasses: 38, percentage: 90.5, faculty: "Dr. Rajesh Kumar" },
  { subjectId: "SUB-CSE503", subjectCode: "CS503", subjectName: "Computer Networks & Security", totalClasses: 38, attendedClasses: 33, percentage: 86.8, faculty: "Prof. Sneha Sen" },
  { subjectId: "SUB-CSE504", subjectCode: "CS504", subjectName: "Theory of Computation", totalClasses: 36, attendedClasses: 30, percentage: 83.3, faculty: "Dr. Amit Trivedi" },
  { subjectId: "SUB-CSE505", subjectCode: "CS505", subjectName: "Full-Stack Web Engineering", totalClasses: 40, attendedClasses: 37, percentage: 92.5, faculty: "Prof. Meera Pillai" },
  { subjectId: "SUB-CSE506", subjectCode: "CS506P", subjectName: "DBMS & Algorithms Lab", totalClasses: 28, attendedClasses: 26, percentage: 92.8, faculty: "Prof. Sneha Sen" }
];

export const MOCK_DAILY_ATTENDANCE = [
  { date: "2024-11-25", classId: "CSE-5A", subjectId: "SUB-CSE501", statusMap: { "STU2024001": "Present", "STU2024002": "Present", "STU2024003": "Present", "STU2024004": "Absent", "STU2024005": "Present", "STU2024006": "Present", "STU2024007": "Present", "STU2024008": "Late" } },
  { date: "2024-11-22", classId: "CSE-5A", subjectId: "SUB-CSE501", statusMap: { "STU2024001": "Present", "STU2024002": "Present", "STU2024003": "Present", "STU2024004": "Absent", "STU2024005": "Present", "STU2024006": "Late", "STU2024007": "Present", "STU2024008": "Present" } },
  { date: "2024-11-20", classId: "CSE-5A", subjectId: "SUB-CSE501", statusMap: { "STU2024001": "Present", "STU2024002": "Late", "STU2024003": "Present", "STU2024004": "Present", "STU2024005": "Present", "STU2024006": "Present", "STU2024007": "Present", "STU2024008": "Present" } }
];

// Announcements
export const MOCK_ANNOUNCEMENTS = [
  {
    id: "ANN001",
    title: "End Semester Examinations Schedule – Dec 2024",
    category: "Examination",
    date: "2024-11-24",
    author: "Office of Controller of Examinations",
    priority: "High",
    target: "All",
    content: "The comprehensive timetable for End Semester Examinations (Fall 2024) has been officially released. Theory exams commence from 12th December 2024. Hall tickets will be issued upon clearance of minimum 75% attendance criteria."
  },
  {
    id: "ANN002",
    title: "HackNovation 2024 - Annual Technical Hackathon",
    category: "Events",
    date: "2024-11-20",
    author: "Dept. of Computer Science",
    priority: "Medium",
    target: "Students",
    content: "Registrations are now open for HackNovation 2024! 36-hour non-stop codeathon with prize pool of ₹1,50,000. Themes include AI in Education, Green Tech, and FinTech. Register your teams before 30th November."
  },
  {
    id: "ANN003",
    title: "Parent-Teacher Academic Review Meeting (PTM)",
    category: "Academic",
    date: "2024-11-18",
    author: "Academic Dean",
    priority: "High",
    target: "Parents",
    content: "The mid-semester PTM will be conducted in hybrid mode on Saturday, 30th November 2024, from 9:30 AM to 1:00 PM. Parents can review academic reports and discuss progress with respective faculty members."
  },
  {
    id: "ANN004",
    title: "Library Special Study Hours during Exam Prep Week",
    category: "Campus",
    date: "2024-11-15",
    author: "Central Library",
    priority: "Low",
    target: "All",
    content: "The Central Library reading halls and digital research labs will remain open 24x7 from 1st December through 20th December for student preparation."
  }
];

// Recent Institutional Activities Log
export const MOCK_ACTIVITIES = [
  { id: "ACT001", action: "Marks Updated", detail: "Prof. Sneha Sen submitted Mid-Term 2 marks for CS501 (Algorithms)", timestamp: "10 mins ago", type: "marks" },
  { id: "ACT002", action: "Attendance Logged", detail: "Dr. Rajesh Kumar marked today's attendance for B.Tech CSE 5A (DBMS)", timestamp: "45 mins ago", type: "attendance" },
  { id: "ACT003", action: "New Student Enrolled", detail: "Admissions office registered 2 lateral entry students in CSE 3rd Sem", timestamp: "2 hours ago", type: "admin" },
  { id: "ACT004", action: "Academic Alert Triggered", detail: "Vikram Rao (22CSE045) flagged for attendance below 75%", timestamp: "3 hours ago", type: "alert" },
  { id: "ACT005", action: "Report Generated", detail: "Consolidated Semester 4 grade cards finalized and issued to student portals", timestamp: "Yesterday", type: "report" }
];

// Notifications
export const MOCK_NOTIFICATIONS = [
  { id: "NOTIF001", title: "Internal Assessment 2 Results Published", message: "Your CS501 and CS502 marks are now verified and available.", time: "1 hour ago", unread: true, category: "grades" },
  { id: "NOTIF002", title: "Attendance Warning", message: "CS504 attendance is close to 80%. Ensure attendance in upcoming lectures.", time: "1 day ago", unread: true, category: "warning" },
  { id: "NOTIF003", title: "PTM Invitation", message: "Reminder: Hybrid Parent-Teacher Meeting on Saturday 30th Nov.", time: "2 days ago", unread: false, category: "info" }
];

// Semester History for Student
export const MOCK_SEMESTER_HISTORY = [
  { semester: "Semester 1", sgpa: 8.42, credits: 21, status: "Passed", badge: "Distinction" },
  { semester: "Semester 2", sgpa: 8.55, credits: 22, status: "Passed", badge: "Distinction" },
  { semester: "Semester 3", sgpa: 8.70, credits: 24, status: "Passed", badge: "First Class" },
  { semester: "Semester 4", sgpa: 8.82, credits: 23, status: "Passed", badge: "Distinction" },
  { semester: "Semester 5 (Current)", sgpa: 8.64, credits: 19, status: "In Progress", badge: "Current" }
];
