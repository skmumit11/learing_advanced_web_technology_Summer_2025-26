import { useState, useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function AddStudentForm() {
  const context = useContext(StudentContext);
  if (!context) throw new Error("AddStudentForm must be used within a StudentProvider");

  const { students, addStudent } = context;

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    major: "",
    gpa: "",
    courses: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.id.trim()) {
      newErrors.id = "Student ID is required.";
    } else if (!/^\d+(-\d+)*$/.test(formData.id) && !/^\d+$/.test(formData.id.replace(/-/g, ''))) {
        // Simple numeric check, allowing hyphens for format like 24-00001-1
        newErrors.id = "Student ID must be numeric (hyphens allowed).";
    } else if (students.some((s) => s.id === formData.id)) {
      newErrors.id = "Student ID must be unique.";
    }

    if (!formData.major.trim()) {
      newErrors.major = "Major is required.";
    }

    const gpaNum = parseFloat(formData.gpa);
    if (!formData.gpa.trim() || isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      newErrors.gpa = "GPA must be a number between 0 and 4.0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const courseList = formData.courses
        .split(",")
        .filter((c) => c.trim())
        .map((c) => ({
          courseName: c.trim(),
          color: "#4f46e5", // Default color for new courses
        }));

      addStudent({
        name: formData.name,
        id: formData.id,
        major: formData.major,
        gpa: parseFloat(formData.gpa),
        courses: courseList,
        avatar: "/student-avatar.svg",
        credits: courseList.length * 3, // Dummy calculation
        semester: "1st Semester", // Default
      });

      setFormData({ name: "", id: "", major: "", gpa: "", courses: "" });
      setErrors({});
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="add-student-form">
      <h3>Add New Student</h3>
      
      {showSuccess && (
        <div className="notification success" style={{ padding: '1rem', background: '#ecfdf5', color: '#047857', border: '1px solid #10b981', borderRadius: '8px', marginBottom: '1rem' }}>
          Student added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
          />
          {errors.name && <span className="error" style={{ color: '#dc2626', fontSize: '0.8rem' }}>{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="id">Student ID</label>
          <input
            type="text"
            id="id"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
          />
          {errors.id && <span className="error" style={{ color: '#dc2626', fontSize: '0.8rem' }}>{errors.id}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="major">Major</label>
          <input
            type="text"
            id="major"
            value={formData.major}
            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
          />
          {errors.major && <span className="error" style={{ color: '#dc2626', fontSize: '0.8rem' }}>{errors.major}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="gpa">GPA</label>
          <input
            type="text"
            id="gpa"
            value={formData.gpa}
            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
          />
          {errors.gpa && <span className="error" style={{ color: '#dc2626', fontSize: '0.8rem' }}>{errors.gpa}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="courses">Courses (comma-separated)</label>
          <input
            type="text"
            id="courses"
            value={formData.courses}
            onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
          />
        </div>

        <button type="submit" style={{ padding: '0.75rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudentForm;
