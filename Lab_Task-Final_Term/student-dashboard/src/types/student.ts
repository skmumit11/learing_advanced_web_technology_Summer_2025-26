export interface Course {
  courseName: string;
  color: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  gpa: number;
  major: string;
  credits: number;
  semester: string;
  courses: Course[];
}