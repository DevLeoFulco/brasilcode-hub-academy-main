import { Course, CourseFilters } from '@/types/course';
import { mockCourses } from '@/data/mocks/courses';
import { APP_CONFIG } from '@/config/app';

class CourseService {
  private baseUrl = APP_CONFIG.API_BASE_URL;

  async getCourses(filters?: CourseFilters): Promise<Course[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return this.getMockCourses(filters);
    }
    
    return this.getApiCourses(filters);
  }

  async getCourseById(id: string): Promise<Course | null> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return this.getMockCourseById(id);
    }
    
    return this.getApiCourseById(id);
  }

  async getFeaturedCourses(): Promise<Course[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return mockCourses.filter(course => course.isNew || course.rating >= 4.8);
    }
    
    return this.getApiFeaturedCourses();
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    if (APP_CONFIG.USE_MOCK_DATA) {
      return mockCourses.filter(course => course.category === category);
    }
    
    return this.getApiCoursesByCategory(category);
  }

  // Métodos para dados mockados
  private getMockCourses(filters?: CourseFilters): Course[] {
    let filteredCourses = [...mockCourses];

    if (filters?.category) {
      filteredCourses = filteredCourses.filter(course => 
        course.category === filters.category
      );
    }

    if (filters?.technologies && filters.technologies.length > 0) {
      filteredCourses = filteredCourses.filter(course =>
        filters.technologies!.some(tech => 
          course.technologies.includes(tech)
        )
      );
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm)
        )
      );
    }

    return filteredCourses;
  }

  private getMockCourseById(id: string): Course | null {
    return mockCourses.find(course => course.id === id) || null;
  }

  // Métodos para API (implementar quando tiver backend)
  private async getApiCourses(filters?: CourseFilters): Promise<Course[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.technologies) {
        filters.technologies.forEach(tech => params.append('technologies', tech));
      }

      const response = await fetch(`${this.baseUrl}/courses?${params}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching courses from API:', error);
      return [];
    }
  }

  private async getApiCourseById(id: string): Promise<Course | null> {
    try {
      const response = await fetch(`${this.baseUrl}/courses/${id}`);
      if (!response.ok) return null;
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching course from API:', error);
      return null;
    }
  }

  private async getApiFeaturedCourses(): Promise<Course[]> {
    try {
      const response = await fetch(`${this.baseUrl}/courses/featured`);
      if (!response.ok) throw new Error('Failed to fetch featured courses');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured courses from API:', error);
      return [];
    }
  }

  private async getApiCoursesByCategory(category: string): Promise<Course[]> {
    try {
      const response = await fetch(`${this.baseUrl}/courses?category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch courses by category');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching courses by category from API:', error);
      return [];
    }
  }

  // Método para alternar entre mock e API
  setUseMockData(useMock: boolean) {
    (APP_CONFIG as any).USE_MOCK_DATA = useMock;
  }
}

export const courseService = new CourseService(); 