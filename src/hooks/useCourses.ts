import { useState, useEffect } from 'react';
import { Course, CourseFilters } from '@/types/course';
import { courseService } from '@/services/courseService';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CourseFilters>({});

  const fetchCourses = async (newFilters?: CourseFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedCourses = await courseService.getCourses(newFilters || filters);
      setCourses(fetchedCourses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cursos');
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const featuredCourses = await courseService.getFeaturedCourses();
      setCourses(featuredCourses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cursos em destaque');
    } finally {
      setLoading(false);
    }
  };

  const fetchCoursesByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const categoryCourses = await courseService.getCoursesByCategory(category);
      setCourses(categoryCourses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cursos por categoria');
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<CourseFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchCourses(updatedFilters);
  };

  const clearFilters = () => {
    setFilters({});
    fetchCourses({});
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    filters,
    fetchCourses,
    fetchFeaturedCourses,
    fetchCoursesByCategory,
    updateFilters,
    clearFilters,
    refetch: () => fetchCourses(filters)
  };
}; 