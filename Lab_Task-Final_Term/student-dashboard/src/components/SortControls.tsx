import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function SortControls() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("SortControls must be used within a StudentProvider");
  }

  const { sortOption, setSortOption } = context;

  return (
    <div className="sort-controls" aria-label="Sort options">
      <span className="sort-controls__label">Sort by:</span>
      <button
        type="button"
        className={`sort-controls__btn ${sortOption === "default" ? "active" : ""}`}
        onClick={() => setSortOption("default")}
      >
        Default
      </button>
      <button
        type="button"
        className={`sort-controls__btn ${sortOption === "name-asc" ? "active" : ""}`}
        onClick={() => setSortOption("name-asc")}
      >
        Name (A-Z)
      </button>
      <button
        type="button"
        className={`sort-controls__btn ${sortOption === "gpa-desc" ? "active" : ""}`}
        onClick={() => setSortOption("gpa-desc")}
      >
        GPA (High to Low)
      </button>
    </div>
  );
}

export default SortControls;
