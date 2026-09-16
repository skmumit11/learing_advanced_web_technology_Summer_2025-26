import { useEffect, useContext } from "react";
import DashboardHeader from "./components/DashboardHeader";
import StatBadge from "./components/StatBadge";
import StudentCard from "./components/StudentCard";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import AddStudentForm from "./components/AddStudentForm";
import { StudentContext } from "./context/StudentContext";

function App() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("App must be used within a StudentProvider");
  }

  const { students, searchQuery, sortOption } = context;

  // Derived state: Filtering
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.major.toLowerCase().includes(query)
    );
  });

  // Derived state: Sorting
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "gpa-desc") {
      return b.gpa - a.gpa;
    }
    return 0; // default
  });

  // 4. Dynamic Document Title
  useEffect(() => {
    const isInitialLoad = students.length === 0;
    if (!isInitialLoad) {
      document.title = `Dashboard — ${sortedStudents.length} Students`;
    } else {
      document.title = "Dashboard — Loading...";
    }
  }, [sortedStudents.length, students.length]);

  const navigationItems = [
    { label: "Dashboard", targetId: "dashboard" },
    { label: "Students", targetId: "students" },
    { label: "Courses", targetId: "courses" },
  ];

  const totalStudents = sortedStudents.length;
  const totalGpa = sortedStudents.reduce((total, student) => total + student.gpa, 0);
  const averageGpa = totalStudents > 0 ? totalGpa / totalStudents : 0;
  const totalCredits = sortedStudents.reduce((total, student) => total + student.credits, 0);

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Academic progress at a glance"
        navigationItems={navigationItems}
      />

      <main id="dashboard">
        <section className="hero-section">
          <div className="container hero-section__content">
            <div className="hero-section__text">
              <p className="eyebrow">Academic Overview</p>
              <h1>Welcome to the Student Dashboard</h1>
              <p className="hero-section__description">
                View student information, academic statistics, majors, semesters, and
                enrolled courses from one organized dashboard.
              </p>
            </div>

            <div className="dashboard-summary" aria-label="Dashboard summary">
              <StatBadge label="Students" value={totalStudents} variant="primary" />
              <StatBadge label="Average GPA" value={averageGpa.toFixed(2)} variant="success" />
              <StatBadge label="Total Credits" value={totalCredits} />
            </div>
          </div>
        </section>

        <section id="students" className="students-section" aria-labelledby="students-heading">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Student Directory</p>
                <h2 id="students-heading">Enrolled Students</h2>
              </div>
              <p className="section-heading__count">{totalStudents} students found</p>
            </div>

            <div className="controls-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
              <SearchBar />
              <SortControls />
            </div>

            {students.length === 0 ? (
              <div className="loading-spinner" style={{ textAlign: 'center', padding: '3rem' }}>
                <div className="spinner"></div>
                <p>Loading student data...</p>
              </div>
            ) : (
              <div className="student-grid">
                {sortedStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    name={student.name}
                    id={student.id}
                    avatar={student.avatar}
                    gpa={student.gpa}
                    major={student.major}
                    credits={student.credits}
                    semester={student.semester}
                    courses={student.courses}
                  />
                ))}
                {sortedStudents.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                    <p>No students match your search criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section id="registration" className="registration-section" aria-labelledby="registration-heading">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <div className="section-heading" style={{ marginBottom: '1rem' }}>
                <div>
                  <p className="eyebrow">Student Registration</p>
                  <h2 id="registration-heading">Add a Student</h2>
                </div>
              </div>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Fill out the form to register a new student. Validation is applied to ensure data integrity.
                The student directory will automatically update upon successful registration.
              </p>
            </div>
            <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--border-radius-large)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
              <AddStudentForm />
            </div>
          </div>
        </section>

        <section id="courses" className="courses-information" aria-labelledby="courses-heading">
          <div className="container">
            <div className="courses-information__box">
              <div>
                <p className="eyebrow">Course Information</p>
                <h2 id="courses-heading">Current Semester</h2>
              </div>
              <p>
                The course tags inside each student card represent the student's current
                course enrollment.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="container">
          <p>Student Dashboard — React Lab Task 3</p>
        </div>
      </footer>
    </div>
  );
}

export default App;