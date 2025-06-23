
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CourseCard from '@/components/CourseCard';
import FilterBar from '@/components/FilterBar';
import Footer from '@/components/Footer';
import { Code, Zap, Target } from 'lucide-react';

const Home = () => {
  // Mock data for courses
  const courses = [
    {
      id: '1',
      title: 'React Avançado: Do Zero ao Deploy',
      description: 'Aprenda React do básico ao avançado com projetos práticos e deploy em produção.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      duration: '42h',
      rating: 4.9,
      students: 15420,
      category: 'Frontend',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      isNew: true
    },
    {
      id: '2',
      title: 'Python para Data Science',
      description: 'Domine Python para análise de dados, machine learning e visualização.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      duration: '35h',
      rating: 4.8,
      students: 12890,
      category: 'Data Science',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
      isNew: false
    },
    {
      id: '3',
      title: 'DevOps com Docker e Kubernetes',
      description: 'Aprenda containerização e orquestração para deploy escalável.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      duration: '28h',
      rating: 4.7,
      students: 8950,
      category: 'DevOps',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      isNew: false
    },
    {
      id: '4',
      title: 'Node.js e APIs REST',
      description: 'Construa APIs robustas e escaláveis com Node.js e Express.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      duration: '32h',
      rating: 4.8,
      students: 11200,
      category: 'Backend',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      isNew: false
    },
    {
      id: '5',
      title: 'React Native: Apps Multiplataforma',
      description: 'Desenvolva aplicativos mobile para iOS e Android com React Native.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      duration: '38h',
      rating: 4.6,
      students: 9750,
      category: 'Mobile',
      technologies: ['React Native', 'Expo', 'TypeScript', 'Redux'],
      isNew: false
    },
    {
      id: '6',
      title: 'AWS Cloud Fundamentals',
      description: 'Domine os serviços essenciais da AWS para cloud computing.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      duration: '25h',
      rating: 4.9,
      students: 7820,
      category: 'Cloud',
      technologies: ['AWS', 'EC2', 'S3', 'Lambda'],
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Sidebar />
      
      <main className="ml-0 md:ml-16 transition-all duration-300">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Brasil<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">CodeGap</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="text-yellow-400 font-semibold">Transforme</span> sua carreira em tecnologia. 
              <span className="text-blue-400 font-semibold"> Domine</span> as habilidades do futuro. 
              <span className="text-purple-400 font-semibold"> Conecte-se</span> ao mercado global.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Que tecnologia você quer dominar hoje?"
                  className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
                  Buscar
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Code className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                <p className="text-gray-300">Cursos Especializados</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Target className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">98%</h3>
                <p className="text-gray-300">Taxa de Aprovação</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
                <p className="text-gray-300">Suporte Especializado</p>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Cursos em Destaque</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore nossa seleção de cursos criados por especialistas da indústria
              </p>
            </div>

            <FilterBar />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold">
                Ver Mais Cursos
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
