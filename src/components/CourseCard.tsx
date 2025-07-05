
import React from 'react';
import { Clock, Star, Users, Play } from 'lucide-react';

interface CourseCardProps {
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
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  duration,
  rating,
  students,
  category,
  technologies,
  isNew = false
}) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700">
      {/* Course Image */}
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        {isNew && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Novo
          </span>
        )}
        <div className="absolute top-3 right-3 bg-black bg-opacity-50 rounded-full p-2">
          <Play className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
            {category}
          </span>
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm text-gray-300">{rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-full">
              +{technologies.length - 3}
            </span>
          )}
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{students.toLocaleString('pt-BR')} alunos</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold">
          Iniciar Curso
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
