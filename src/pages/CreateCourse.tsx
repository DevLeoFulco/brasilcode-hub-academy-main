
import React, { useState } from 'react';
import { ArrowLeft, Upload, Plus, Trash2, Save, Eye, Video, FileText, HelpCircle, Code, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

interface Module {
  id: string;
  title: string;
  description: string;
  contentType: 'video' | 'text' | 'exercise' | 'mixed';
  videoUrl?: string;
  textContent?: string;
  exercises?: Exercise[];
}

interface Exercise {
  id: string;
  type: 'multiple_choice' | 'open_answer' | 'code_completion';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  codeTemplate?: string;
}

const CreateCourse = () => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState('#3B82F6');
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    technologies: [] as string[],
    price: ''
  });
  const [modules, setModules] = useState<Module[]>([
    { id: '1', title: '', description: '', contentType: 'video' as const }
  ]);
  const [activeModule, setActiveModule] = useState<string>('1');

  const categories = [
    'Frontend', 'Backend', 'DevOps', 'Mobile', 'IA/Machine Learning', 
    'Cloud Computing', 'Data Science', 'Cybersecurity', 'Game Development'
  ];

  const techOptions = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js',
    'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift',
    'Kotlin', 'Flutter', 'React Native', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'MySQL'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCoverImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCourseDataChange = (field: string, value: string | string[]) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const addModule = () => {
    const newId = (modules.length + 1).toString();
    setModules(prev => [...prev, {
      id: newId,
      title: '',
      description: '',
      contentType: 'video'
    }]);
    setActiveModule(newId);
  };

  const removeModule = (id: string) => {
    if (modules.length > 1) {
      setModules(prev => prev.filter(m => m.id !== id));
      setActiveModule(modules[0].id);
    }
  };

  const updateModule = (id: string, updates: Partial<Module>) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const addExercise = (moduleId: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      type: 'multiple_choice',
      question: '',
      options: ['', '']
    };
    
    updateModule(moduleId, {
      exercises: [...(modules.find(m => m.id === moduleId)?.exercises || []), newExercise]
    });
  };

  const updateExercise = (moduleId: string, exerciseId: string, updates: Partial<Exercise>) => {
    const module = modules.find(m => m.id === moduleId);
    if (module?.exercises) {
      const updatedExercises = module.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, ...updates } : ex
      );
      updateModule(moduleId, { exercises: updatedExercises });
    }
  };

  const currentModule = modules.find(m => m.id === activeModule);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Sidebar />
      
      <main className="ml-16 transition-all duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin" 
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Voltar ao Dashboard</span>
              </Link>
              <h1 className="text-3xl font-bold text-white">Criar Novo Curso</h1>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Save className="h-4 w-4" />
                <span>Salvar Curso</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Informações Básicas</h2>
                
                {/* Cover Image */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Imagem de Capa
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                    {coverImage ? (
                      <div className="relative">
                        <img 
                          src={coverImage} 
                          alt="Course cover" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setCoverImage(null)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <span className="text-gray-400">Clique para fazer upload da imagem</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Color Customization */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Cor Personalizada do Curso
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-16 h-10 rounded-lg border border-gray-600 bg-transparent cursor-pointer"
                    />
                    <div 
                      className="flex-1 h-10 rounded-lg border border-gray-600"
                      style={{ backgroundColor: customColor }}
                    />
                    <Palette className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    Esta cor será usada como tema principal do ambiente do curso
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Título do Curso
                    </label>
                    <input
                      type="text"
                      value={courseData.title}
                      onChange={(e) => handleCourseDataChange('title', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome do seu curso"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Categoria
                    </label>
                    <select
                      value={courseData.category}
                      onChange={(e) => handleCourseDataChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nível de Dificuldade
                    </label>
                    <select
                      value={courseData.difficulty}
                      onChange={(e) => handleCourseDataChange('difficulty', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecione o nível</option>
                      <option value="iniciante">Iniciante</option>
                      <option value="intermediario">Intermediário</option>
                      <option value="avancado">Avançado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Duração Estimada
                    </label>
                    <input
                      type="text"
                      value={courseData.duration}
                      onChange={(e) => handleCourseDataChange('duration', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: 8 horas"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Descrição do Curso
                  </label>
                  <textarea
                    rows={4}
                    value={courseData.description}
                    onChange={(e) => handleCourseDataChange('description', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Descreva o que os alunos aprenderão neste curso..."
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Tecnologias Utilizadas
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-600 rounded-lg p-3">
                    {techOptions.map(tech => (
                      <label key={tech} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={courseData.technologies.includes(tech)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleCourseDataChange('technologies', [...courseData.technologies, tech]);
                            } else {
                              handleCourseDataChange('technologies', courseData.technologies.filter(t => t !== tech));
                            }
                          }}
                          className="rounded border-gray-500 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-300">{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Module Content */}
              {currentModule && (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Conteúdo do Módulo: {currentModule.title || `Módulo ${activeModule}`}
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Título do Módulo
                        </label>
                        <input
                          type="text"
                          value={currentModule.title}
                          onChange={(e) => updateModule(activeModule, { title: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                          placeholder="Nome do módulo"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Tipo de Conteúdo
                        </label>
                        <select
                          value={currentModule.contentType}
                          onChange={(e) => updateModule(activeModule, { contentType: e.target.value as Module['contentType'] })}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="video">Apenas Vídeo</option>
                          <option value="text">Apenas Texto</option>
                          <option value="exercise">Apenas Exercícios</option>
                          <option value="mixed">Conteúdo Misto</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Descrição do Módulo
                      </label>
                      <textarea
                        rows={3}
                        value={currentModule.description}
                        onChange={(e) => updateModule(activeModule, { description: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Descreva o conteúdo deste módulo..."
                      />
                    </div>

                    {/* Content Type Specific Fields */}
                    {(currentModule.contentType === 'video' || currentModule.contentType === 'mixed') && (
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          <Video className="inline h-4 w-4 mr-2" />
                          Upload de Vídeo
                        </label>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-gray-400">Arraste o vídeo aqui ou clique para fazer upload</p>
                            <input type="file" accept="video/*" className="hidden" />
                          </div>
                        </div>
                      </div>
                    )}

                    {(currentModule.contentType === 'text' || currentModule.contentType === 'mixed') && (
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          <FileText className="inline h-4 w-4 mr-2" />
                          Conteúdo de Texto
                        </label>
                        <textarea
                          rows={8}
                          value={currentModule.textContent || ''}
                          onChange={(e) => updateModule(activeModule, { textContent: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 resize-none"
                          placeholder="Escreva o conteúdo textual do módulo..."
                        />
                      </div>
                    )}

                    {(currentModule.contentType === 'exercise' || currentModule.contentType === 'mixed') && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-sm font-medium text-white flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2" />
                            Exercícios
                          </label>
                          <button
                            onClick={() => addExercise(activeModule)}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Adicionar Exercício</span>
                          </button>
                        </div>

                        {currentModule.exercises?.map((exercise, index) => (
                          <div key={exercise.id} className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-white font-medium">Exercício {index + 1}</h4>
                              <select
                                value={exercise.type}
                                onChange={(e) => updateExercise(activeModule, exercise.id, { type: e.target.value as Exercise['type'] })}
                                className="bg-gray-600 border border-gray-500 rounded px-3 py-1 text-white text-sm"
                              >
                                <option value="multiple_choice">Múltipla Escolha</option>
                                <option value="open_answer">Resposta Aberta</option>
                                <option value="code_completion">Completar Código</option>
                              </select>
                            </div>

                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Pergunta</label>
                              <textarea
                                rows={2}
                                value={exercise.question}
                                onChange={(e) => updateExercise(activeModule, exercise.id, { question: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 resize-none text-sm"
                                placeholder="Digite a pergunta..."
                              />
                            </div>

                            {exercise.type === 'multiple_choice' && (
                              <div>
                                <label className="block text-sm text-gray-300 mb-1">Opções de Resposta</label>
                                {exercise.options?.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center space-x-2 mb-2">
                                    <input
                                      type="radio"
                                      name={`correct-${exercise.id}`}
                                      checked={exercise.correctAnswer === optIndex}
                                      onChange={() => updateExercise(activeModule, exercise.id, { correctAnswer: optIndex })}
                                      className="text-blue-600"
                                    />
                                    <input
                                      type="text"
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...(exercise.options || [])];
                                        newOptions[optIndex] = e.target.value;
                                        updateExercise(activeModule, exercise.id, { options: newOptions });
                                      }}
                                      className="flex-1 px-3 py-1 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 text-sm"
                                      placeholder={`Opção ${optIndex + 1}`}
                                    />
                                    {exercise.options && exercise.options.length > 2 && (
                                      <button
                                        onClick={() => {
                                          const newOptions = exercise.options?.filter((_, i) => i !== optIndex);
                                          updateExercise(activeModule, exercise.id, { options: newOptions });
                                        }}
                                        className="text-red-400 hover:text-red-300"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                                <button
                                  onClick={() => {
                                    const newOptions = [...(exercise.options || []), ''];
                                    updateExercise(activeModule, exercise.id, { options: newOptions });
                                  }}
                                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Adicionar opção</span>
                                </button>
                              </div>
                            )}

                            {exercise.type === 'code_completion' && (
                              <div>
                                <label className="block text-sm text-gray-300 mb-1 flex items-center">
                                  <Code className="h-4 w-4 mr-1" />
                                  Template de Código
                                </label>
                                <textarea
                                  rows={6}
                                  value={exercise.codeTemplate || ''}
                                  onChange={(e) => updateExercise(activeModule, exercise.id, { codeTemplate: e.target.value })}
                                  className="w-full px-3 py-2 bg-gray-900 border border-gray-500 rounded text-green-400 font-mono text-sm resize-none"
                                  placeholder="// Digite o código aqui..."
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modules Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Módulos do Curso</h3>
                  <button
                    onClick={addModule}
                    className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adicionar</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {modules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        activeModule === module.id
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                          : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveModule(module.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {module.title || `Módulo ${index + 1}`}
                          </p>
                          <p className="text-xs opacity-75">
                            {module.contentType === 'video' && 'Vídeo'}
                            {module.contentType === 'text' && 'Texto'}
                            {module.contentType === 'exercise' && 'Exercícios'}
                            {module.contentType === 'mixed' && 'Misto'}
                          </p>
                        </div>
                        {modules.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeModule(module.id);
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Preview */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Preview do Curso</h3>
                <div 
                  className="rounded-lg p-4 border-2"
                  style={{ 
                    backgroundColor: `${customColor}20`,
                    borderColor: customColor
                  }}
                >
                  {coverImage && (
                    <img 
                      src={coverImage} 
                      alt="Course preview" 
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h4 className="text-white font-medium mb-2">
                    {courseData.title || 'Título do Curso'}
                  </h4>
                  <p className="text-gray-300 text-sm mb-2">
                    {courseData.description || 'Descrição do curso...'}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: customColor }}>
                      {courseData.category || 'Categoria'}
                    </span>
                    <span className="text-gray-400">
                      {modules.length} módulo{modules.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;
