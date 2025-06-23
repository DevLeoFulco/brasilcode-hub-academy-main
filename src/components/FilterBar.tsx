
import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showTechDropdown, setShowTechDropdown] = useState(false);

  const areas = [
    'Frontend', 'Backend', 'DevOps', 'Mobile', 'IA', 'Cloud', 'Data Science', 'Cybersecurity'
  ];

  const durations = [
    'Até 5h', '5h - 15h', '15h - 30h', 'Mais de 30h'
  ];

  const technologies = [
    'React', 'JavaScript', 'Python', 'Java', 'Node.js', 'TypeScript', 'Angular', 'Vue.js'
  ];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-white font-medium">Filtros:</span>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveFilter('todos')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'todos' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveFilter('recentes')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'recentes' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Recentes
          </button>
          <button
            onClick={() => setActiveFilter('populares')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'populares' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Populares
          </button>
        </div>

        {/* Area Filter */}
        <div className="relative">
          <button
            onClick={() => setShowAreaDropdown(!showAreaDropdown)}
            className="flex items-center gap-2 px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors"
          >
            Área de Atuação
            <ChevronDown className="h-4 w-4" />
          </button>
          {showAreaDropdown && (
            <div className="absolute top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
              {areas.map((area) => (
                <button
                  key={area}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {area}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Duration Filter */}
        <div className="relative">
          <button
            onClick={() => setShowDurationDropdown(!showDurationDropdown)}
            className="flex items-center gap-2 px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors"
          >
            Duração
            <ChevronDown className="h-4 w-4" />
          </button>
          {showDurationDropdown && (
            <div className="absolute top-full mt-2 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
              {durations.map((duration) => (
                <button
                  key={duration}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {duration}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Technology Filter */}
        <div className="relative">
          <button
            onClick={() => setShowTechDropdown(!showTechDropdown)}
            className="flex items-center gap-2 px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors"
          >
            Tecnologias
            <ChevronDown className="h-4 w-4" />
          </button>
          {showTechDropdown && (
            <div className="absolute top-full mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {tech}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
