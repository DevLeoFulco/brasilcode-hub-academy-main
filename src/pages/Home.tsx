import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CourseCard from '@/components/CourseCard';
import FilterBar from '@/components/FilterBar';
import Footer from '@/components/Footer';
import { Code, Zap, Target, Loader2 } from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';

const Home = () => {
  const { 
    courses, 
    loading, 
    error, 
    updateFilters, 
    clearFilters 
  } = useCourses();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Erro ao carregar cursos</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

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
                  onChange={(e) => updateFilters({ search: e.target.value })}
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

            <FilterBar onFilterChange={updateFilters} onClearFilters={clearFilters} />

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                <span className="ml-2 text-white">Carregando cursos...</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>

                {courses.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">Nenhum curso encontrado</p>
                    <button 
                      onClick={clearFilters}
                      className="mt-4 text-blue-400 hover:text-blue-300"
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}

                {/* Load More */}
                <div className="text-center mt-12">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold">
                    Ver Mais Cursos
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
