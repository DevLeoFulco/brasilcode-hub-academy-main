# BrasilCode Hub Academy

## 🎯 Sobre o Projeto

O BrasilCode Hub Academy é uma plataforma de código aberto para aprendizado e ensino de programação, focada na comunidade brasileira de desenvolvedores. O objetivo é fornecer um ambiente rico em conteúdo, como cursos, tutoriais e artigos, para ajudar tanto iniciantes a darem seus primeiros passos quanto desenvolvedores experientes a se aprofundarem em novas tecnologias.

**URL do projeto DevLeoFulco:**  
https://devleofulco.dev/projects/5561630d-4572-4723-bdb9-1931a6520784

## ✨ Funcionalidades

- Visualização de cursos disponíveis.
- Sistema de registro e login de usuários.
- Painel administrativo para gerenciamento de conteúdo.
- Design responsivo para acesso em diferentes dispositivos.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e bibliotecas:

| Tecnologia             | Versão        | Descrição                                         |
| ---------------------- | ------------- | ------------------------------------------------- |
| **React**              | `^18.3.1`     | Biblioteca para construção de interfaces de usuário.      |
| **Vite**               | `^5.4.1`      | Ferramenta de build e desenvolvimento rápido.         |
| **TypeScript**         | `^5.5.3`      | Superset de JavaScript que adiciona tipagem estática.     |
| **Tailwind CSS**       | `^3.4.11`     | Framework CSS utility-first para estilização.       |
| **React Router**       | `^6.26.2`     | Para gerenciamento de rotas na aplicação.         |
| **TanStack Query**     | `^5.56.2`     | Gerenciamento de estado de servidor (Server State). |
| **React Hook Form**    | `^7.53.0`     | Gerenciamento de formulários com validação.       |
| **Zod**                | `^3.23.8`     | Validação de esquemas de dados.                     |
| **ESLint**             | `^9.9.0`      | Ferramenta de linting para JavaScript/TypeScript. |

## 🎨 Design System

O projeto utiliza o **shadcn/ui** como base para seu Design System. Diferente de bibliotecas de componentes tradicionais, `shadcn/ui` não é um pacote NPM instalável. Em vez disso, ele fornece um conjunto de componentes reutilizáveis, acessíveis e customizáveis que são copiados diretamente para a base de código do projeto.

Isso nos dá total controle sobre o código dos componentes, permitindo customizações profundas para atender às necessidades específicas da BrasilCode Hub Academy. Os componentes são construídos sobre **Radix UI** (para primitivas de UI acessíveis) e estilizados com **Tailwind CSS**.

## 🏗️ Arquitetura e Padrões de Projeto

- **Arquitetura Baseada em Componentes:** A aplicação é estruturada em componentes reutilizáveis, seguindo o padrão do React. A organização de pastas (`src/pages`, `src/components`, `src/hooks`, `src/lib`) reflete uma separação clara de responsabilidades, facilitando a manutenção e escalabilidade.
- **Provider Pattern:** Utilizado para prover contexto global à aplicação, como pode ser visto no `App.tsx` com o `QueryClientProvider` e o `BrowserRouter`.
- **Hook Pattern:** A lógica reutilizável é extraída para custom hooks (ex: `useAuth`), centralizando e simplificando o estado e os efeitos nos componentes.
- **Composição de Componentes:** O `shadcn/ui` promove a composição como principal forma de construir interfaces complexas a partir de blocos de construção simples e reutilizáveis.

## 🚀 Como Executar o Projeto Localmente

Para executar o projeto em seu ambiente de desenvolvimento, siga os passos abaixo. É necessário ter o **Bun** ou **Node.js** (v18+) instalado.

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/brasilcode-hub-academy-main.git

# 2. Navegue até o diretório do projeto
cd brasilcode-hub-academy-main

# 3. Instale as dependências
# Usando bun
bun install
# Ou usando npm
npm install

# 4. Inicie o servidor de desenvolvimento
# Usando bun
bun dev
# Ou usando npm
npm run dev

# 5. Abra http://localhost:5173 no seu navegador para ver a aplicação.
```

## 📈 Próximos Passos e Contribuições

O BrasilCode Hub Academy está em constante evolução. Os próximos objetivos incluem:

- [ ] Implementação completa do fluxo de autenticação e autorização com JWT.
- [ ] Desenvolvimento de um backend em Node.js com NestJS para servir a API.
- [ ] Adição de testes unitários e de integração com Vitest e React Testing Library.
- [ ] Criação de mais cursos e conteúdos sobre tecnologias em alta.
- [ ] Configuração de um pipeline de CI/CD para automação de deploy.

Contribuições são bem-vindas! Se você tem interesse em ajudar, por favor, abra uma issue para discutir suas ideias.