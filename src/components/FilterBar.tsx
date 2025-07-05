import React, { useState, useRef, useEffect } from 'react';
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
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  // Refs para detectar quando o mouse sai dos dropdowns
  const areaDropdownRef = useRef<HTMLDivElement>(null);
  const durationDropdownRef = useRef<HTMLDivElement>(null);
  const techDropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  const areas = [
    'Frontend', 'Backend', 'DevOps', 'Mobile', 'IA', 'Cloud', 'Data Science', 'Cybersecurity'
  ];

  const durations = [
    'Até 5h', '5h - 15h', '15h - 30h', 'Mais de 30h'
  ];

  const technologies = [
    'React', 'JavaScript', 'Python', 'Java', 'Node.js', 'TypeScript', 'Angular', 'Vue.js'
  ];

  const companies = [
    'Banco do Brasil', 'Banco Inter', 'Itaú', 'Bradesco', 'Santander', 'Nubank', 'C6 Bank', 'Outras'
  ];

  const prices = [
    'Gratuito', 'Até R$ 50', 'R$ 50 - R$ 100', 'R$ 100 - R$ 200', 'Acima de R$ 200'
  ];

  const types = [
    'Cursos', 'Bootcamp'
  ];

  // Função para fechar todos os dropdowns
  const closeAllDropdowns = () => {
    setShowAreaDropdown(false);
    setShowDurationDropdown(false);
    setShowTechDropdown(false);
    setShowCompanyDropdown(false);
    setShowPriceDropdown(false);
    setShowTypeDropdown(false);
  };

  // Event listeners para detectar quando o mouse sai dos dropdowns
  useEffect(() => {
    const handleMouseLeave = (ref: React.RefObject<HTMLDivElement>, setter: (value: boolean) => void) => {
      const handleLeave = () => {
        setTimeout(() => {
          if (ref.current && !ref.current.matches(':hover')) {
            setter(false);
          }
        }, 100);
      };

      const element = ref.current;
      if (element) {
        element.addEventListener('mouseleave', handleLeave);
        return () => element.removeEventListener('mouseleave', handleLeave);
      }
    };

    handleMouseLeave(areaDropdownRef, setShowAreaDropdown);
    handleMouseLeave(durationDropdownRef, setShowDurationDropdown);
    handleMouseLeave(techDropdownRef, setShowTechDropdown);
    handleMouseLeave(companyDropdownRef, setShowCompanyDropdown);
    handleMouseLeave(priceDropdownRef, setShowPriceDropdown);
    handleMouseLeave(typeDropdownRef, setShowTypeDropdown);
  }, []);

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    const filters: Partial<CourseFilters> = {};
    
    if (filterType === 'category') {
      filters.category = value as string;
      setSelectedCategory(value as string);
    } else if (filterType === 'technologies') {
      filters.technologies = value as string[];
      setSelectedTechnologies(value as string[]);
    } else if (filterType === 'company') {
      filters.company = value as string;
      setSelectedCompany(value as string);
    } else if (filterType === 'price') {
      filters.price = value as string;
      setSelectedPrice(value as string);
    } else if (filterType === 'type') {
      filters.type = value as string;
      setSelectedType(value as string);
    }
    
    onFilterChange?.(filters);
  };

  const handleQuickFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'todos') {
      onClearFilters?.();
      setSelectedCategory('');
      setSelectedTechnologies([]);
      setSelectedCompany('');
      setSelectedPrice('');
      setSelectedType('');
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between gap-4">
        {/* Header com ícone */}
        <div className="flex items-center gap-3 min-w-fit">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-white font-medium">Filtros:</span>
        </div>

        {/* Quick Filters - Centralizados */}
        <div className="flex gap-3 flex-1 justify-center">
          <button
            onClick={() => handleQuickFilter('todos')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === 'todos' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => handleQuickFilter('recentes')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === 'recentes' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            Recentes
          </button>
          <button
            onClick={() => handleQuickFilter('populares')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === 'populares' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            Populares
          </button>
        </div>

        {/* Filtros Avançados - Direita */}
        <div className="flex items-center gap-2 min-w-fit flex-wrap">
          {/* Type Filter */}
          <div className="relative" ref={typeDropdownRef}>
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowTypeDropdown(!showTypeDropdown);
              }}
              onMouseEnter={() => setShowTypeDropdown(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 hover:text-white transition-all duration-200 font-medium"
            >
              Tipo
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showTypeDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showTypeDropdown && (
              <div className="absolute top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      handleFilterChange('type', type);
                      setShowTypeDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg font-medium"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Company Filter */}
          <div className="relative" ref={companyDropdownRef}>
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowCompanyDropdown(!showCompanyDropdown);
              }}
              onMouseEnter={() => setShowCompanyDropdown(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 hover:text-white transition-all duration-200 font-medium"
            >
              Empresa
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showCompanyDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showCompanyDropdown && (
              <div className="absolute top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                {companies.map((company) => (
                  <button
                    key={company}
                    onClick={() => {
                      handleFilterChange('company', company);
                      setShowCompanyDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg font-medium"
                  >
                    {company}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="relative" ref={priceDropdownRef}>
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowPriceDropdown(!showPriceDropdown);
              }}
              onMouseEnter={() => setShowPriceDropdown(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 hover:text-white transition-all duration-200 font-medium"
            >
              Preço
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showPriceDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showPriceDropdown && (
              <div className="absolute top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                {prices.map((price) => (
                  <button
                    key={price}
                    onClick={() => {
                      handleFilterChange('price', price);
                      setShowPriceDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg font-medium"
                  >
                    {price}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Area Filter */}
          <div className="relative" ref={areaDropdownRef}>
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowAreaDropdown(!showAreaDropdown);
              }}
              onMouseEnter={() => setShowAreaDropdown(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 hover:text-white transition-all duration-200 font-medium"
            >
              Área
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAreaDropdown ? 'rotate-180' : ''}`} />
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
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg font-medium"
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Duration Filter */}
          <div className="relative" ref={durationDropdownRef}>
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowDurationDropdown(!showDurationDropdown);
              }}
              onMouseEnter={() => setShowDurationDropdown(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 hover:text-white transition-all duration-200 font-medium"
            >
              Duração
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showDurationDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showDurationDropdown && (
              <div className="absolute top-full mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg font-medium"
                  >
                    {duration}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Technology Filter */}
          <div className="relative" ref={techDropdownRef}>
            <button
              onClick={() => {
                closeAllDropdowns();
                setShowTechDropdown(!showTechDropdown);
              }}
              onMouseEnter={() => setShowTechDropdown(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 hover:text-white transition-all duration-200 font-medium"
            >
              Tech
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showTechDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showTechDropdown && (
              <div className="absolute top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => {
                      const newTechs = selectedTechnologies.includes(tech)
                        ? selectedTechnologies.filter(t => t !== tech)
                        : [...selectedTechnologies, tech];
                      handleFilterChange('technologies', newTechs);
                    }}
                    className={`w-full text-left px-4 py-3 transition-colors first:rounded-t-lg last:rounded-b-lg font-medium ${
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
          {(selectedCategory || selectedTechnologies.length > 0 || selectedCompany || selectedPrice || selectedType) && (
            <button
              onClick={() => {
                onClearFilters?.();
                setSelectedCategory('');
                setSelectedTechnologies([]);
                setSelectedCompany('');
                setSelectedPrice('');
                setSelectedType('');
                setActiveFilter('todos');
              }}
              className="px-3 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-all duration-200 font-medium"
            >
              Limpar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
