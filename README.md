# API REST para Asociación de Guías de Turismo en Cochabamba

Esta es una API REST de backend para una asociación de guías de turismo en Cochabamba. La plataforma permite gestionar usuarios (clientes y guías/administradores), paquetes turísticos y notificaciones automáticas de salidas. Los administradores administran el contenido público como eventos, ferias y anuncios.

## Requisitos Previos
- Node.js v16 o superior
- npm o yarn
- Docker y Docker Compose (recomendado para PostgreSQL)

## Instalación

1. Instala dependencias:
npm install

2. Configura las variables de entorno:
Copia ./.env.example a ./.env y completa los valores.

Ejemplo:
# APP
PORT=3000
NODE_ENV=development

# DATABASE
PGHOST=localhost
PGPORT=5432
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=aguiatur

# AUTH
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10

## Base de Datos
Levanta PostgreSQL con Docker Compose:
docker-compose up -d

Las migraciones están en db/migrations.

## Ejecutar el Servidor

Modo desarrollo:
npm run start:dev

