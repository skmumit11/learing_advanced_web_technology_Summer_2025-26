import DashboardHeader from "./components/DashboardHeader";
import StatBadge from "./components/StatBadge";
import StudentCard from "./components/StudentCard";
import students from "./data/student";

function App() {
  const navigationItems = [
    {
      label: "Dashboard",
      targetId: "dashboard",
    },
    {
      label: "Students",
      targetId: "students",
    },
    {
      label: "Courses",
      targetId: "courses",
    },
  ];

  const totalStudents = students.length;

  const totalGpa = students.reduce(
    (total, student) => total + student.gpa,
    0,
  );

  const averageGpa =
    totalStudents > 0
      ? totalGpa / totalStudents
      : 0;

  const totalCredits = students.reduce(
    (total, student) =>
      total + student.credits,
    0,
  );

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
              <p className="eyebrow">
                Academic Overview
              </p>

              <h1>
                Welcome to the Student Dashboard
              </h1>

              <p className="hero-section__description">
                View student information, academic
                statistics, majors, semesters, and
                enrolled courses from one organized
                dashboard.
              </p>
            </div>

            <div
              className="dashboard-summary"
              aria-label="Dashboard summary"
            >
              <StatBadge
                label="Students"
                value={totalStudents}
                variant="primary"
              />

              <StatBadge
                label="Average GPA"
                value={averageGpa.toFixed(2)}
                variant="success"
              />

              <StatBadge
                label="Total Credits"
                value={totalCredits}
              />
            </div>
          </div>
        </section>

        <section
          id="students"
          className="students-section"
          aria-labelledby="students-heading"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  Student Directory
                </p>

                <h2 id="students-heading">
                  Enrolled Students
                </h2>
              </div>

              <p className="section-heading__count">
                {totalStudents} students found
              </p>
            </div>

            <div className="student-grid">
              {students.map((student) => (
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
            </div>
          </div>
        </section>

        <section
          id="courses"
          className="courses-information"
          aria-labelledby="courses-heading"
        >
          <div className="container">
            <div className="courses-information__box">
              <div>
                <p className="eyebrow">
                  Course Information
                </p>

                <h2 id="courses-heading">
                  Current Semester
                </h2>
              </div>

              <p>
                The course tags inside each student
                card represent the student's current
                course enrollment.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="container">
          <p>
            Student Dashboard — React Lab Task 1
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;