import React, { useState } from 'react';
import { Home, BookOpen, Users, BarChart3, Settings, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Início', path: '/home' },
    { icon: BookOpen, label: 'Cursos', path: '/courses' },
    { icon: Users, label: 'Comunidade', path: '/community' },
    { icon: BarChart3, label: 'Progresso', path: '/progress' },
    { icon: Settings, label: 'Admin', path: '/admin' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 z-40 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        } hover:w-64 group`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="pt-20 px-3">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className={`ml-3 transition-opacity duration-300 whitespace-nowrap ${
                    isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
