import BBJava from '@/assets/BBJava.png';
import BBNode from '@/assets/BBNode.png';
import BBCloud from '@/assets/BBCloud.png';
import InterTypeScript from '@/assets/InterTypeScript.png';
import InterDocker from '@/assets/InterDocker.png';
import InterReact from '@/assets/InterReact.png';

import { Course } from '@/types/course';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Banco Inter - React',
    description: 'Aprenda como o Banco Inter aplica o React no seu dia a dia.',
    image: InterReact,
    duration: '42h',
    rating: 4.9,
    students: 15420,
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    isNew: true,
    instructor_id: 1,
    is_published: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Banco Inter - Docker',
    description: 'Aprenda como o Banco Inter trabalha com o Docker no dia a dia.',
    image: InterDocker,
    duration: '35h',
    rating: 4.8,
    students: 12890,
    category: 'DevOps',
    technologies: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    isNew: false,
    instructor_id: 1,
    is_published: true,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    title: 'Banco Inter - TypeScript',
    description: 'Aprenda como o TypeScript é usado no dia a dia do Banco Inter.',
    image: InterTypeScript,
    duration: '58h',
    rating: 4.7,
    students: 8950,
    category: 'Backend',
    technologies: ['JavaScript', 'TypeScript'],
    isNew: false,
    instructor_id: 1,
    is_published: true,
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z'
  },
  {
    id: '4',
    title: 'Banco do Brasil - Node.js e APIs REST',
    description: 'Aprenda a construir APIs robustas e escaláveis da forma como o BB usa no dia a dia.',
    image: BBNode,
    duration: '42h',
    rating: 4.8,
    students: 11200,
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    isNew: false,
    instructor_id: 1,
    is_published: true,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '5',
    title: 'Banco do Brasil - Java',
    description: 'Aprenda a usar o Java de forma eficiente como o BB usa no dia a dia.',
    image: BBJava,
    duration: '78h',
    rating: 4.6,
    students: 9750,
    category: 'Backend',
    technologies: ['Java', 'Maven', 'Junit', 'POO'],
    isNew: false,
    instructor_id: 1,
    is_published: true,
    created_at: '2023-12-20T10:00:00Z',
    updated_at: '2023-12-20T10:00:00Z'
  },
  {
    id: '6',
    title: 'Banco do Brasil - AWS Cloud Fundamentals',
    description: 'Domine os serviços essenciais de cloud computing como o BB faz.',
    image: BBCloud,
    duration: '25h',
    rating: 4.9,
    students: 7820,
    category: 'Cloud',
    technologies: ['AWS', 'EC2', 'S3', 'Lambda'],
    isNew: false,
    instructor_id: 1,
    is_published: true,
    created_at: '2023-12-15T10:00:00Z',
    updated_at: '2023-12-15T10:00:00Z'
  }
];

export const mockCategories = [
  'Frontend',
  'Backend', 
  'DevOps',
  'Cloud',
  'Mobile',
  'Data Science',
  'AI/Machine Learning',
  'Cybersecurity'
];

export const mockTechnologies = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'AWS',
  'JavaScript',
  'Node.js',
  'Express',
  'MongoDB',
  'JWT',
  'Java',
  'Maven',
  'Junit',
  'POO',
  'EC2',
  'S3',
  'Lambda'
]; 