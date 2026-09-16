import type { Student } from "../types/student";

const students: Student[] = [
  {
    id: "24-00001-1",
    name: "Ayesha Rahman",
    avatar: "/student-avatar.svg",
    gpa: 3.5,
    major: "Computer Science",
    credits: 90,
    semester: "8th Semester",
    courses: [
      {
        courseName: "React Development",
        color: "#2563eb",
      },
      {
        courseName: "Database Systems",
        color: "#8f2e85",
      },
      {
        courseName: "Algorithms",
        color: "#5b8c00",
      },
      {
        courseName: "Web Technologies",
        color: "#4d5d00",
      },
    ],
  },
  {
    id: "24-00002-1",
    name: "Fahim Ahmed",
    avatar: "/student-avatar.svg",
    gpa: 3.8,
    major: "Cyber Security",
    credits: 90,
    semester: "9th Semester",
    courses: [
      {
        courseName: "Network Security",
        color: "#2563eb",
      },
      {
        courseName: "Ethical Hacking",
        color: "#8f2e85",
      },
      {
        courseName: "Digital Forensics",
        color: "#4d5d00",
      },
    ],
  },
  {
    id: "24-00003-1",
    name: "Nusrat Jahan",
    avatar: "/student-avatar.svg",
    gpa: 3.7,
    major: "Software Engineering",
    credits: 84,
    semester: "7th Semester",
    courses: [
      {
        courseName: "Web Engineering",
        color: "#ea580c",
      },
      {
        courseName: "Software Testing",
        color: "#dc2626",
      },
      {
        courseName: "UI/UX Design",
        color: "#0891b2",
      },
    ],
  },
  {
    id: "24-00004-1",
    name: "Tanvir Hasan",
    avatar: "/student-avatar.svg",
    gpa: 3.9,
    major: "Information Technology",
    credits: 96,
    semester: "10th Semester",
    courses: [
      {
        courseName: "Cloud Computing",
        color: "#0284c7",
      },
      {
        courseName: "Data Analytics",
        color: "#16a34a",
      },
      {
        courseName: "Computer Networks",
        color: "#4f46e5",
      },
    ],
  },
];

export default students;