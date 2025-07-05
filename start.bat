@echo off
chcp 65001 >nul

echo 🚀 Iniciando BrasilCodeGap com Docker...

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker não está instalado. Por favor, instale o Docker primeiro.
    pause
    exit /b 1
)

REM Verificar se Docker Compose está instalado
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro.
    pause
    exit /b 1
)

REM Parar containers existentes
echo 🛑 Parando containers existentes...
docker-compose down

REM Construir e iniciar containers
echo 🔨 Construindo e iniciando containers...
docker-compose up --build -d

REM Aguardar um pouco para os containers iniciarem
echo ⏳ Aguardando containers iniciarem...
timeout /t 10 /nobreak >nul

REM Verificar status dos containers
echo 📊 Status dos containers:
docker-compose ps

echo.
echo ✅ BrasilCodeGap iniciado com sucesso!
echo.
echo 🌐 Acesse a aplicação em:
echo    Frontend: http://localhost:8080
echo    pgAdmin:  http://localhost:5050
echo.
echo 📋 Credenciais do pgAdmin:
echo    Email: admin@brasilcodegap.com
echo    Senha: admin123
echo.
echo 🗄️  Banco de dados PostgreSQL:
echo    Host: localhost
echo    Porta: 5432
echo    Database: brasilcodegap
echo    Usuário: postgres
echo    Senha: password
echo.
echo 📝 Para ver logs: docker-compose logs
echo 🛑 Para parar: docker-compose down
echo.
pause 