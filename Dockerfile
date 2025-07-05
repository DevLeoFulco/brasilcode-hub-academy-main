# Build stage
FROM node:18-alpine AS build

# Base de trabalho 
WORKDIR /app

# Copia os arquivos de package
COPY package*.json ./

# Install dependencies
RUN npm ci

# Faz uma copia dos codigos
COPY . .

# Builda a aplicação
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar aplicativo criado para nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expoe a porta 80
EXPOSE 80

# Inicializa o servidor nginx
CMD ["nginx", "-g", "daemon off;"] 