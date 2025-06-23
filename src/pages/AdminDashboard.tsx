
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Mail, 
  Eye, 
  TrendingUp,
  Plus,
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total de Cursos', value: '24', icon: BookOpen, color: 'blue' },
    { label: 'Usuários Ativos', value: '15.2K', icon: Users, color: 'green' },
    { label: 'Acessos Hoje', value: '2.4K', icon: Eye, color: 'purple' },
    { label: 'Taxa de Conversão', value: '12.5%', icon: TrendingUp, color: 'yellow' },
  ];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'courses', label: 'Gerenciar Cursos', icon: BookOpen },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'emails', label: 'Marketing', icon: Mail },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Sidebar />
      
      <main className="ml-16 transition-all duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Administrativo</h1>
            <p className="text-gray-400">Gerencie todos os aspectos da plataforma BrasilCodeGap</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                      <Icon className={`h-6 w-6 text-${stat.color}-500`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <div className="border-b border-gray-700">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-500'
                          : 'border-transparent text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Insights da Plataforma</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h4 className="text-white font-medium mb-4">Atividade Recente</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Novo usuário cadastrado</span>
                          <span className="text-gray-500 text-xs">2 min atrás</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Curso "React Avançado" concluído</span>
                          <span className="text-gray-500 text-xs">15 min atrás</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Novo comentário em "Python Data Science"</span>
                          <span className="text-gray-500 text-xs">1h atrás</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h4 className="text-white font-medium mb-4">Ações Rápidas</h4>
                      <div className="space-y-3">
                        <Link
                          to="/admin/create-course"
                          className="w-full flex items-center space-x-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          <Plus className="h-4 w-4 text-white" />
                          <span className="text-white">Criar Novo Curso</span>
                        </Link>
                        <button className="w-full flex items-center space-x-3 p-3 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                          <Mail className="h-4 w-4 text-white" />
                          <span className="text-white">Enviar Newsletter</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                          <BarChart3 className="h-4 w-4 text-white" />
                          <span className="text-white">Ver Relatórios</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Gerenciar Cursos</h3>
                    <Link
                      to="/admin/create-course"
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Novo Curso</span>
                    </Link>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <h4 className="text-white font-medium mb-4">Funcionalidades do Criador de Cursos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Upload de imagens de capa</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Personalização de cores por curso</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Upload de vídeos por módulo</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Módulos dinâmicos (adicionar/remover)</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Conteúdo misto (vídeos + textos + exercícios)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Exercícios personalizados</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Questões múltipla escolha</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">Exercícios de código</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Gerenciar Usuários</h3>
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <p className="text-gray-300">Painel de controle de usuários em desenvolvimento...</p>
                  </div>
                </div>
              )}

              {activeTab === 'emails' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Marketing e E-mails</h3>
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <p className="text-gray-300">Sistema de envio de e-mails em desenvolvimento...</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Configurações da Plataforma</h3>
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <p className="text-gray-300">Configurações avançadas em desenvolvimento...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
