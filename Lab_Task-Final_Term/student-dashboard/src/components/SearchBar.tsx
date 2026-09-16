import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function SearchBar() {
  const context = useContext(StudentContext);
  
  if (!context) {
    throw new Error("SearchBar must be used within a StudentProvider");
  }

  const { searchQuery, setSearchQuery } = context;

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search students by name or major..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar__input"
        aria-label="Search students"
      />
    </div>
  );
}

export default SearchBar;
