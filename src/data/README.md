# Estrutura de Dados - BrasilCodeGap

Esta pasta contém os dados mockados e a estrutura para gerenciamento de dados da aplicação.

## Estrutura

```
src/
├── data/
│   └── mocks/
│       └── courses.ts          # Dados mockados dos cursos
├── types/
│   └── course.ts              # Tipos TypeScript para cursos
├── services/
│   └── courseService.ts       # Serviço para gerenciar cursos
├── hooks/
│   └── useCourses.ts          # Hook personalizado para cursos
└── config/
    └── app.ts                 # Configurações da aplicação
```

## Como usar

### 1. Dados Mockados
Os dados mockados estão em `src/data/mocks/courses.ts` e seguem a estrutura definida em `src/types/course.ts`.

### 2. Serviço de Cursos
O `courseService` gerencia a comunicação entre frontend e backend:

```typescript
import { courseService } from '@/services/courseService';

// Buscar todos os cursos
const courses = await courseService.getCourses();

// Buscar cursos com filtros
const filteredCourses = await courseService.getCourses({
  category: 'Frontend',
  technologies: ['React', 'TypeScript']
});

// Buscar curso por ID
const course = await courseService.getCourseById('1');
```

### 3. Hook useCourses
O hook `useCourses` gerencia o estado dos cursos:

```typescript
import { useCourses } from '@/hooks/useCourses';

const { 
  courses, 
  loading, 
  error, 
  updateFilters, 
  clearFilters 
} = useCourses();
```

### 4. Configuração
Para alternar entre dados mockados e API, edite `src/config/app.ts`:

```typescript
export const APP_CONFIG = {
  USE_MOCK_DATA: true, // Mude para false quando tiver API
  API_BASE_URL: 'http://localhost:3000/api',
  // ... outras configurações
};
```

## Integração com Backend

Quando estiver pronto para integrar com o backend:

1. Mude `USE_MOCK_DATA` para `false` em `src/config/app.ts`
2. Configure a `API_BASE_URL` correta
3. Os métodos da API já estão implementados no `courseService`
4. O hook `useCourses` continuará funcionando normalmente

## Adicionando Novos Cursos

Para adicionar novos cursos aos dados mockados:

1. Adicione o banner na pasta `src/assets/`
2. Importe o banner em `src/data/mocks/courses.ts`
3. Adicione o curso ao array `mockCourses`
4. Siga o padrão dos cursos existentes

## Tipos de Dados

Todos os tipos estão definidos em `src/types/course.ts`:

- `Course`: Interface principal do curso
- `CourseFilters`: Interface para filtros
- `CourseEnrollment`: Interface para matrículas
- `CourseRating`: Interface para avaliações 