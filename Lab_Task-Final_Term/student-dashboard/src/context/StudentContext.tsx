import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import initialStudents from "../data/student";
import type { Student } from "../types/student";

type SortOption = "default" | "name-asc" | "gpa-desc";

interface StudentContextType {
  students: Student[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  favoriteCount: number;
  incrementFavorite: () => void;
  decrementFavorite: () => void;
  addStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
}

export const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Load from localStorage or initial state
  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      setStudents(JSON.parse(stored));
    } else {
      // Simulate API fetch delay
      const timer = setTimeout(() => {
        setStudents(initialStudents);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Save to localStorage when students change
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students]);

  const incrementFavorite = () => setFavoriteCount((prev) => prev + 1);
  const decrementFavorite = () => setFavoriteCount((prev) => Math.max(0, prev - 1));

  const addStudent = (student: Student) => {
    setStudents((prev) => [student, ...prev]);
  };

  const removeStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        favoriteCount,
        incrementFavorite,
        decrementFavorite,
        addStudent,
        removeStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
