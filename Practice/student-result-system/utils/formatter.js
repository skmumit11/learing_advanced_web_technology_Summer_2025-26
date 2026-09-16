import {
    totalMarks,
    averageMarks,
    highestMarks,
    isPassed
} from "./marks.js";

export function formatStudentReport(student){
    const {id, name, dept, semester, marks} =student;

    const total = totalMarks(...marks);
    const average = averageMarks(...marks);
    const highest = highestMarks(...marks);
    const passed = isPassed(...marks);

    return`
    ==============================
    Student Result Report
    ==============================
    Student Name : ${name}
    Student ID   : ${id}
    Department   : ${dept}
    Semester     : ${semester}
    Marks        : ${marks.join(", ")}

    Total        : ${total}
    Average      : ${average.toFixed(2)}
    Highest Mark : ${highest}
    Result       : ${passed ? "Passed" : "Failed"}
    =============================
    `;
    
}


/* module.exports = {
  formatStudentReport
};
 */