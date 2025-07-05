import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { CourseFilters } from '@/types/course';

interface FilterBarProps {
  onFilterChange?: (filters: Partial<CourseFilters>) => void;
  onClearFilters?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onClearFilters }) => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  const areas = [
    'Frontend', 'Backend', 'DevOps', 'Mobile', 'IA', 'Cloud', 'Data Science', 'Cybersecurity'
  ];

  const durations = [
    'Até 5h', '5h - 15h', '15h - 30h', 'Mais de 30h'
  ];

  const technologies = [
    'React', 'JavaScript', 'Python', 'Java', 'Node.js', 'TypeScript', 'Angular', 'Vue.js'
  ];

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    const filters: Partial<CourseFilters> = {};
    
    if (filterType === 'category') {
      filters.category = value as string;
      setSelectedCategory(value as string);
    } else if (filterType === 'technologies') {
      filters.technologies = value as string[];
      setSelectedTechnologies(value as string[]);
    }
    
    onFilterChange?.(filters);
  };

  const handleQuickFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'todos') {
      onClearFilters?.();
      setSelectedCategory('');
      setSelectedTechnologies([]);
    }
  };

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
            onClick={() => handleQuickFilter('todos')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'todos' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => handleQuickFilter('recentes')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'recentes' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Recentes
          </button>
          <button
            onClick={() => handleQuickFilter('populares')}
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
                  onClick={() => {
                    handleFilterChange('category', area);
                    setShowAreaDropdown(false);
                  }}
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
                  onClick={() => {
                    const newTechs = selectedTechnologies.includes(tech)
                      ? selectedTechnologies.filter(t => t !== tech)
                      : [...selectedTechnologies, tech];
                    handleFilterChange('technologies', newTechs);
                  }}
                  className={`w-full text-left px-4 py-2 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedTechnologies.includes(tech)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {(selectedCategory || selectedTechnologies.length > 0) && (
          <button
            onClick={() => {
              onClearFilters?.();
              setSelectedCategory('');
              setSelectedTechnologies([]);
              setActiveFilter('todos');
            }}
            className="px-3 py-1 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors"
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
