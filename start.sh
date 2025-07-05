#!/bin/bash

echo "🚀 Iniciando BrasilCodeGap com Docker..."

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Construir e iniciar containers
echo "🔨 Construindo e iniciando containers..."
docker-compose up --build -d

# Aguardar um pouco para os containers iniciarem
echo "⏳ Aguardando containers iniciarem..."
sleep 10

# Verificar status dos containers
echo "📊 Status dos containers:"
docker-compose ps

echo ""
echo "✅ BrasilCodeGap iniciado com sucesso!"
echo ""
echo "🌐 Acesse a aplicação em:"
echo "   Frontend: http://localhost:8080"
echo "   pgAdmin:  http://localhost:5050"
echo ""
echo "📋 Credenciais do pgAdmin:"
echo "   Email: admin@brasilcodegap.com"
echo "   Senha: admin123"
echo ""
echo "🗄️  Banco de dados PostgreSQL:"
echo "   Host: localhost"
echo "   Porta: 5432"
echo "   Database: brasilcodegap"
echo "   Usuário: postgres"
echo "   Senha: password"
echo ""
echo "📝 Para ver logs: docker-compose logs"
echo "🛑 Para parar: docker-compose down" 