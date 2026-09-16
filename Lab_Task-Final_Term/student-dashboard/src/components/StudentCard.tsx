import PropTypes from "prop-types";
import { useState, useContext } from "react";
import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";
import type { Course } from "../types/student";
import { StudentContext } from "../context/StudentContext";

interface StudentCardProps {
  name: string;
  id: string;
  avatar: string;
  gpa: number;
  major: string;
  credits: number;
  semester: string;
  courses: Course[];
}


function StudentCard({
  name,
  id,
  avatar,
  gpa,
  major,
  credits,
  semester,
  courses,
}: StudentCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("StudentCard must be used within a StudentProvider");
  }

  const { incrementFavorite, decrementFavorite, removeStudent } = context;

  const handleFavoriteClick = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (newState) {
      incrementFavorite();
    } else {
      decrementFavorite();
    }
  };
  return (
    <article className="student-card">
      <div className="student-card__top">
        {avatar}

        <span className="student-card__status">
          Active
        </span>
        
        <button 
          type="button" 
          className={`student-card__favorite ${isFavorite ? "is-favorite" : ""}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="student-card__identity">
        <h3 className="student-card__name">
          {name}
        </h3>

        <p className="student-card__id">
          Student ID: {id}
        </p>

        <p className="student-card__major">
          {major}
        </p>

        <p className="student-card__semester">
          {semester}
        </p>
      </div>

      <div className="student-card__stats">
        <StatBadge
          label="GPA"
          value={gpa.toFixed(2)}
          variant="primary"
        />

        <StatBadge
          label="Credits"
          value={credits}
          variant="success"
        />
      </div>

      <div className="student-card__courses">
        <h4 className="student-card__courses-title">
          Enrolled Courses
        </h4>

        <div className="student-card__course-list">
          {courses.map((course) => (
            <CourseTag
              key={course.courseName}
              courseName={course.courseName}
              color={course.color}
            />
          ))}
        </div>
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => removeStudent(id)}
          style={{ 
            padding: '0.4rem 0.8rem', 
            background: '#fee2e2', 
            color: '#dc2626', 
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600
          }}
        >
          Remove Student
        </button>
      </div>
    </article>
  );
}

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  credits: PropTypes.number.isRequired,
  semester: PropTypes.string.isRequired,

  courses: PropTypes.arrayOf(
    PropTypes.shape({
      courseName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default StudentCard;