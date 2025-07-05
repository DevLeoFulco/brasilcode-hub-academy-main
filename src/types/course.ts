export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  rating: number;
  students: number;
  category: string;
  technologies: string[];
  isNew?: boolean;
  instructor_id?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CourseFilters {
  category?: string;
  difficulty?: string;
  technologies?: string[];
  search?: string;
}

export interface CourseEnrollment {
  id: string;
  user_id: number;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
}

export interface CourseRating {
  id: string;
  user_id: number;
  course_id: string;
  rating: number;
  comment?: string;
  created_at: string;
} 