export const APP_CONFIG = {
  // Configuração de dados
  USE_MOCK_DATA: true, // Mude para false quando tiver API pronta
  
  // Configuração da API (comentado até ter backend)
  API_BASE_URL: 'http://localhost:3000/api', // Descomente quando tiver backend
  
  // Configuração de features
  ENABLE_SEARCH: true,
  ENABLE_FILTERS: true,
  ENABLE_RATINGS: true,
  
  // Configuração de paginação
  COURSES_PER_PAGE: 12,
  
  // Configuração de cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
  
  // Configuração de loading states
  LOADING_DELAY: 300, // ms
} as const;

// Função para alternar entre mock e API
export const toggleMockData = (useMock: boolean) => {
  (APP_CONFIG as any).USE_MOCK_DATA = useMock;
};

// Função para verificar se está usando mock
export const isUsingMockData = () => {
  return APP_CONFIG.USE_MOCK_DATA;
}; 