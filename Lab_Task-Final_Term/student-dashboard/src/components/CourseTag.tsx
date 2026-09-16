import type { CSSProperties } from "react";
import PropTypes from "prop-types";

interface CourseTagProps {
  courseName: string;
  color: string;
}

interface CourseTagStyle extends CSSProperties {
  "--course-color": string;
}

function CourseTag({
  courseName,
  color,
}: CourseTagProps) {
  const tagStyle: CourseTagStyle = {
    "--course-color": color,
  };

  return (
    <span className="course-tag" style={tagStyle}>
      {courseName}
    </span>
  );
}

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CourseTag;