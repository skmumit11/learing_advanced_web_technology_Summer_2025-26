import { createStudent } from "./utils/student.js";
import { formatStudentReport } from "./utils/formatter.js";



const std1 = createStudent(
  "ABCD",
  23154,
  "CSE",
  "1st",
  100,
  55,
  0,
  60,
  85,
  54
);


console.log("Initial Studnt");
console.log(formatStudentReport(std1));


/* 
// Update student using spread operator
const updatedStudent = {
  ...std1,
  semester: "Final",
  marks: [...std1.marks, 88]
};

// Print updated report
console.log("Updated Report:");
console.log(formatStudentReport(updatedStudent));
 */