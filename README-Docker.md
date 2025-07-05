# BrasilCodeGap - Docker Setup

Este projeto está configurado para rodar em containers Docker com PostgreSQL.

## 🚀 Quick Start

### Pré-requisitos
- Docker
- Docker Compose

### Como executar

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd brasilcode-hub-academy-main
```

2. **Execute com Docker Compose**
```bash
docker-compose up -d
```

3. **Acesse a aplicação**
- Frontend: http://localhost:8080
- pgAdmin: http://localhost:5050
  - Email: admin@brasilcodegap.com
  - Senha: admin123

## 📊 Serviços Disponíveis

### Frontend (React/Vite)
- **Porta**: 8080
- **URL**: http://localhost:8080
- **Tecnologia**: React + Vite + TypeScript + Tailwind CSS

### PostgreSQL Database
- **Porta**: 5432
- **Database**: brasilcodegap
- **Usuário**: postgres
- **Senha**: password
- **Host**: localhost

### pgAdmin (Opcional)
- **Porta**: 5050
- **URL**: http://localhost:5050
- **Email**: admin@brasilcodegap.com
- **Senha**: admin123

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### `users`
- Armazena informações dos usuários
- Campos: id, name, email, password, profession, experience, linkedin_url, github_url, is_admin

#### `courses`
- Armazena informações dos cursos
- Campos: id, title, description, category, duration, technologies, image_url, instructor_id

#### `course_enrollments`
- Relaciona usuários com cursos (matrículas)
- Campos: user_id, course_id, enrolled_at, completed_at

#### `course_ratings`
- Avaliações dos cursos pelos usuários
- Campos: user_id, course_id, rating, comment

#### `course_lessons`
- Aulas dos cursos
- Campos: course_id, title, description, content, video_url, duration_minutes

#### `user_progress`
- Progresso dos usuários nas aulas
- Campos: user_id, lesson_id, completed, watched_duration

## 🔧 Comandos Úteis

### Ver logs dos containers
```bash
# Todos os serviços
docker-compose logs

# Apenas frontend
docker-compose logs frontend

# Apenas banco
docker-compose logs postgres
```

### Parar os serviços
```bash
docker-compose down
```

### Rebuild após mudanças
```bash
docker-compose down
docker-compose up --build -d
```

### Acessar o banco PostgreSQL
```bash
# Via container
docker exec -it brasilcodegap-postgres psql -U postgres -d brasilcodegap

# Via linha de comando (se PostgreSQL estiver instalado localmente)
psql -h localhost -p 5432 -U postgres -d brasilcodegap
```

### Backup do banco
```bash
docker exec brasilcodegap-postgres pg_dump -U postgres brasilcodegap > backup.sql
```

### Restore do banco
```bash
docker exec -i brasilcodegap-postgres psql -U postgres brasilcodegap < backup.sql
```

## 🔒 Variáveis de Ambiente

### Frontend
- `REACT_APP_API_URL`: URL da API backend (padrão: http://localhost:3000/api)

### PostgreSQL
- `POSTGRES_DB`: Nome do banco (padrão: brasilcodegap)
- `POSTGRES_USER`: Usuário do banco (padrão: postgres)
- `POSTGRES_PASSWORD`: Senha do banco (padrão: password)

### pgAdmin
- `PGADMIN_DEFAULT_EMAIL`: Email do admin (padrão: admin@brasilcodegap.com)
- `PGADMIN_DEFAULT_PASSWORD`: Senha do admin (padrão: admin123)

## 🛠️ Desenvolvimento

### Modificar o frontend
1. Faça as alterações no código
2. Rebuild o container:
```bash
docker-compose up --build frontend
```

### Modificar o banco
1. Edite o arquivo `database/init.sql`
2. Recrie o container do banco:
```bash
docker-compose down postgres
docker volume rm brasilcodegap_postgres_data
docker-compose up -d postgres
```

### Conectar backend Java
Para conectar seu backend Java ao banco PostgreSQL:

```java
// Exemplo de configuração JDBC
String url = "jdbc:postgresql://localhost:5432/brasilcodegap";
String user = "postgres";
String password = "password";
```

## 📝 Dados de Exemplo

O banco já vem com dados de exemplo:

### Usuários
- **Admin**: admin@brasilcodegap.com / password
- **João Silva**: joao@email.com / password
- **Maria Santos**: maria@email.com / password

### Cursos
- React Avançado: Do Zero ao Deploy
- Python para Data Science
- DevOps com Docker e Kubernetes
- Node.js e APIs REST
- React Native: Apps Multiplataforma
- AWS Cloud Fundamentals

## 🚨 Troubleshooting

### Container não inicia
```bash
# Ver logs detalhados
docker-compose logs

# Verificar se as portas estão livres
netstat -tulpn | grep :8080
netstat -tulpn | grep :5432
```

### Banco não conecta
```bash
# Verificar se o container está rodando
docker ps

# Verificar logs do PostgreSQL
docker-compose logs postgres

# Testar conexão
docker exec brasilcodegap-postgres pg_isready -U postgres
```

### Frontend não carrega
```bash
# Verificar logs do frontend
docker-compose logs frontend

# Rebuild o frontend
docker-compose up --build frontend
```

## 📚 Próximos Passos

1. **Desenvolver o backend Java** separadamente
2. **Configurar a conexão** entre frontend e backend
3. **Implementar autenticação** JWT
4. **Adicionar funcionalidades** de pagamento
5. **Configurar CI/CD** para deploy automático

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. 