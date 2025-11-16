# API REST para Asociación de Guías de Turismo en Cochabamba

Esta es una API REST de backend para una asociación de guías de turismo en Cochabamba. La plataforma permite la gestión completa de usuarios (Clientes y Guías/Administradores) y paquetes turísticos. Los clientes pueden reservar paquetes, y el sistema les notifica por correo las salidas. Los administradores gestionan el contenido público (eventos, ferias y anuncios).

## 🚀 Levantando el Servidor

### Requisitos Previos
- Node.js (v16+)
- npm o yarn
- Docker y Docker Compose (para PostgreSQL)

### Pasos para iniciar

1. **Instala las dependencias:**
   ```bash
   npm install
   ```

2. **Configura las variables de entorno:**
   
   Copia el archivo `.env` (ya debería estar presente con las credenciales de desarrollo):
   ```
   PORT="3000"
   POSTGRES_PASSWORD="1106"
   POSTGRES_USER="marizol"
   POSTGRES_DB="aguiatur"
   PGHOST="localhost"
   PGPORT="5432"
   NODE_ENV="development"
   JWT_SECRET="mundolibre"
   SALTS="512"
   ```

3. **Inicia PostgreSQL con Docker:**
   ```bash
   docker-compose up -d
   ```

4. **Inicia el servidor en modo de desarrollo:**
   
   Este comando utiliza `nodemon` para reiniciar automáticamente el servidor cada vez que detecta un cambio.
   ```bash
   npm run start:dev
   ```

   El servidor estará disponible en: **`http://localhost:3000`**

5. **(Opcional) Compilar a TypeScript:**
   ```bash
   npm run build
   ```

6. **(Opcional) Ejecutar el servidor compilado:**
   ```bash
   npm start
   ```

---

## 📚 Documentación de Endpoints

**Base URL:** `http://localhost:3000`

### 1. AUTENTICACIÓN (Auth)

#### 1.1 Registrar Usuario
- **Método:** `POST`
- **URL:** `/auth/register`
- **Descripción:** Crea una nueva cuenta de usuario.
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@example.com",
    "password": "MiContraseña123!",
    "phoneNumber": "1234567890",
    "phoneCountryCode": "+591",
    "country": "Bolivia",
    "city": "Cochabamba"
  }
  ```
- **Respuesta exitosa (201):**
  ```json
  {
    "ok": true,
    "message": "Registro exitoso",
    "data": {
      "id": "12345",
      "email": "juan.perez@example.com"
    },
    "status": 201
  }
  ```

---

#### 1.2 Iniciar Sesión (Login)
- **Método:** `POST`
- **URL:** `/auth/login`
- **Descripción:** Autentica un usuario y devuelve un token JWT.
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "email": "juan.perez@example.com",
    "password": "MiContraseña123!"
  }
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Inicio de sesión exitoso",
    "data": {
      "id": "12345",
      "email": "juan.perez@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpAZXhhbXBsZS5jb20iLCJzdWIiOiIxMjM0NSJ9..."
    },
    "status": 200
  }
  ```
- **⚠️ Nota:** Guarda el `token` — lo necesitarás para endpoints protegidos.

---

#### 1.3 Olvidé la Contraseña
- **Método:** `POST`
- **URL:** `/auth/password/forgot`
- **Descripción:** Solicita recuperación de contraseña.
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "email": "juan.perez@example.com"
  }
  ```
- **Respuesta (200):**
  ```json
  {
    "ok": true,
    "message": "recuperacion de contraseña pendiente",
    "status": 200
  }
  ```

---

#### 1.4 Restablecer Contraseña
- **Método:** `POST`
- **URL:** `/auth/password/reset`
- **Descripción:** Restablece la contraseña con un token de recuperación.
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "token": "token_de_recuperacion_aqui",
    "newPassword": "NuevaContraseña123!"
  }
  ```
- **Respuesta (200):**
  ```json
  {
    "ok": true,
    "message": "implementacion pendiente de la recuperacion de la contraseña",
    "status": 200
  }
  ```

---

### 2. USUARIOS (Users)

#### 2.1 Obtener Perfil del Usuario Autenticado
- **Método:** `GET`
- **URL:** `/users/profile`
- **Descripción:** Obtiene el perfil del usuario que inició sesión.
- **Headers:** 
  ```
  Content-Type: application/json
  Authorization: Bearer {tu_token_jwt}
  ```
- **Ejemplo de Authorization:**
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpAZXhhbXBsZS5jb20iLCJzdWIiOiIxMjM0NSJ9...
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Perfil de usuario",
    "data": {
      "id": "12345",
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "juan.perez@example.com",
      "phoneNumber": "1234567890",
      "country": "Bolivia",
      "city": "Cochabamba",
      "role": "user"
    },
    "status": 200
  }
  ```

---

#### 2.2 Listar Todos los Usuarios
- **Método:** `GET`
- **URL:** `/users`
- **Descripción:** Obtiene lista de usuarios con filtros opcionales.
- **Query params (opcionales):**
  ```
  firstName=Juan
  lastName=Pérez
  email=juan@example.com
  role=user
  country=Bolivia
  city=Cochabamba
  ```
- **Ejemplo URL completa:**
  ```
  http://localhost:3000/users?firstName=Juan&country=Bolivia
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Usuarios obtenidos con éxito",
    "data": [
      {
        "id": "12345",
        "firstName": "Juan",
        "lastName": "Pérez",
        "email": "juan.perez@example.com",
        "role": "user",
        "country": "Bolivia",
        "city": "Cochabamba"
      },
      {
        "id": "12346",
        "firstName": "Juan",
        "lastName": "Rodríguez",
        "email": "juan.rodriguez@example.com",
        "role": "admin",
        "country": "Bolivia",
        "city": "La Paz"
      }
    ],
    "status": 200
  }
  ```

---

#### 2.3 Obtener Usuario por ID (Solo Admins)
- **Método:** `GET`
- **URL:** `/users/{id}`
- **Descripción:** Obtiene detalles de un usuario específico (requiere rol admin).
- **Ejemplo:** 
  ```
  http://localhost:3000/users/12345
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  Authorization: Bearer {token_de_admin}
  ```
- **⚠️ Restricción:** Solo usuarios con rol `SUPER_ADMIN` o `ADMIN`.

---

#### 2.4 Actualizar Usuario (Parcialmente)
- **Método:** `PATCH`
- **URL:** `/users/{id}`
- **Descripción:** Actualiza datos parciales de un usuario.
- **Ejemplo:** 
  ```
  http://localhost:3000/users/12345
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (JSON):** (envía solo los campos que quieras actualizar)
  ```json
  {
    "firstName": "Carlos",
    "city": "La Paz",
    "phoneNumber": "9876543210"
  }
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Usuario actualizado con éxito",
    "data": 1,
    "status": 200
  }
  ```

---

#### 2.5 Eliminar Usuario
- **Método:** `DELETE`
- **URL:** `/users/{id}`
- **Descripción:** Elimina (soft delete) un usuario.
- **Ejemplo:** 
  ```
  http://localhost:3000/users/12345
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Usuario eliminado con éxito",
    "data": 1,
    "status": 200
  }
  ```

---

### 3. PAQUETES (Packages)

#### 3.1 Listar Todos los Paquetes
- **Método:** `GET`
- **URL:** `/packages`
- **Descripción:** Obtiene lista de paquetes turísticos con filtros opcionales.
- **Query params (opcionales):**
  ```
  name=Tour Cochabamba
  ```
- **Ejemplo:**
  ```
  http://localhost:3000/packages?name=Cochabamba
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Paquetes obtenidos con éxito",
    "data": [
      {
        "id": 1,
        "name": "Tour Cochabamba Clásico",
        "description": "Conoce los principales atractivos de Cochabamba",
        "price": 250,
        "duration": 8,
        "languages": ["es", "en"],
        "includes": ["Transporte", "Guía", "Almuerzo"],
        "images": ["https://example.com/image1.jpg"],
        "departure_dates": ["2025-12-20", "2025-12-21"],
        "category_id": 1
      }
    ],
    "status": 200
  }
  ```

---

#### 3.2 Obtener Paquete por ID
- **Método:** `GET`
- **URL:** `/packages/{id}`
- **Descripción:** Obtiene detalles de un paquete específico.
- **Ejemplo:** 
  ```
  http://localhost:3000/packages/1
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Paquete obtenido con éxito",
    "data": {
      "id": 1,
      "name": "Tour Cochabamba Clásico",
      "description": "Conoce los principales atractivos de Cochabamba",
      "price": 250,
      "duration": 8,
      "languages": ["es", "en"],
      "includes": ["Transporte", "Guía", "Almuerzo"],
      "images": ["https://example.com/image1.jpg"],
      "departure_dates": ["2025-12-20", "2025-12-21"],
      "category_id": 1
    },
    "status": 200
  }
  ```

---

#### 3.3 Crear Nuevo Paquete
- **Método:** `POST`
- **URL:** `/packages`
- **Descripción:** Crea un nuevo paquete turístico.
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "name": "Tour Laguna Aiquile",
    "description": "Visita a la laguna más bella de la región",
    "price": 350,
    "duration": 12,
    "languages": ["es", "en", "fr"],
    "includes": ["Transporte", "Guía profesional", "Almuerzo", "Bebidas"],
    "images": ["https://example.com/laguna1.jpg", "https://example.com/laguna2.jpg"],
    "departure_dates": ["2025-12-15", "2025-12-22", "2025-12-29"],
    "category_id": 2
  }
  ```
- **Respuesta exitosa (201):**
  ```json
  {
    "ok": true,
    "message": "Paquete creado con éxito",
    "data": {
      "id": 5,
      "name": "Tour Laguna Aiquile",
      "description": "Visita a la laguna más bella de la región",
      "price": 350,
      "duration": 12,
      "languages": ["es", "en", "fr"],
      "includes": ["Transporte", "Guía profesional", "Almuerzo", "Bebidas"],
      "images": ["https://example.com/laguna1.jpg", "https://example.com/laguna2.jpg"],
      "departure_dates": ["2025-12-15", "2025-12-22", "2025-12-29"],
      "category_id": 2
    },
    "status": 201
  }
  ```

---

#### 3.4 Actualizar Paquete
- **Método:** `PATCH`
- **URL:** `/packages/{id}`
- **Descripción:** Actualiza datos parciales de un paquete.
- **Ejemplo:** 
  ```
  http://localhost:3000/packages/1
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (JSON):** (envía solo los campos que quieras actualizar)
  ```json
  {
    "price": 300,
    "description": "Tour mejorado con más atracciones y servicios"
  }
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Paquete actualizado con éxito",
    "data": 1,
    "status": 200
  }
  ```

---

#### 3.5 Eliminar Paquete
- **Método:** `DELETE`
- **URL:** `/packages/{id}`
- **Descripción:** Elimina un paquete turístico.
- **Ejemplo:** 
  ```
  http://localhost:3000/packages/1
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Paquete eliminado con éxito",
    "data": 1,
    "status": 200
  }
  ```

---

### 4. CATEGORÍAS (Categories)

#### 4.1 Listar Todas las Categorías
- **Método:** `GET`
- **URL:** `/categories`
- **Descripción:** Obtiene lista de categorías turísticas.
- **Query params (opcionales):**
  ```
  name=Aventura
  ```
- **Ejemplo:**
  ```
  http://localhost:3000/categories?name=Cultural
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Categorías obtenidas con éxito",
    "data": [
      {
        "id": 1,
        "name": "Cultural",
        "description": "Tours con enfoque en la cultura y tradiciones locales"
      },
      {
        "id": 2,
        "name": "Aventura",
        "description": "Tours de aventura y actividades extremas"
      }
    ],
    "status": 200
  }
  ```

---

#### 4.2 Obtener Categoría por ID
- **Método:** `GET`
- **URL:** `/categories/{id}`
- **Descripción:** Obtiene detalles de una categoría específica.
- **Ejemplo:** 
  ```
  http://localhost:3000/categories/1
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```

---

#### 4.3 Crear Nueva Categoría
- **Método:** `POST`
- **URL:** `/categories`
- **Descripción:** Crea una nueva categoría de tours.
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "name": "Naturaleza",
    "description": "Tours enfocados en ecosistemas y vida silvestre"
  }
  ```
- **Respuesta exitosa (201):**
  ```json
  {
    "ok": true,
    "message": "Categoría creada con éxito",
    "data": {
      "id": 5,
      "name": "Naturaleza",
      "description": "Tours enfocados en ecosistemas y vida silvestre"
    },
    "status": 201
  }
  ```

---

#### 4.4 Actualizar Categoría
- **Método:** `PATCH`
- **URL:** `/categories/{id}`
- **Descripción:** Actualiza datos de una categoría.
- **Ejemplo:** 
  ```
  http://localhost:3000/categories/1
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "name": "Tours Culturales",
    "description": "Experiencias culturales, históricas y tradicionales"
  }
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Categoría actualizada con éxito",
    "data": 1,
    "status": 200
  }
  ```

---

#### 4.5 Eliminar Categoría
- **Método:** `DELETE`
- **URL:** `/categories/{id}`
- **Descripción:** Elimina una categoría.
- **Ejemplo:** 
  ```
  http://localhost:3000/categories/1
  ```
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Categoría eliminada con éxito",
    "data": 1,
    "status": 200
  }
  ```

---

## 🔐 Cómo Usar Autenticación en Postman

### Paso 1: Registra un Usuario
1. Abre **Postman**
2. Crea una nueva solicitud `POST`
3. URL: `http://localhost:3000/auth/register`
4. En la pestaña **Body**, selecciona **raw** y **JSON**
5. Pega el body del ejemplo de registro (sección 1.1)
6. Haz clic en **Send**

### Paso 2: Inicia Sesión
1. Crea otra solicitud `POST`
2. URL: `http://localhost:3000/auth/login`
3. Body con tu email y contraseña (sección 1.2)
4. **Copia el token de la respuesta**

### Paso 3: Usa el Token en Requests Protegidos
1. En cualquier request que requiera autenticación:
   - Ve a la pestaña **Headers**
   - Añade una nueva fila:
     - **Key:** `Authorization`
     - **Value:** `Bearer {tu_token_aqui}`

**Ejemplo:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpAZXhhbXBsZS5jb20iLCJzdWIiOiIxMjM0NSJ9...
```

### Alternativa: Usar Authorization Tab en Postman
1. En la solicitud, ve a la pestaña **Authorization**
2. Selecciona tipo **Bearer Token**
3. En el campo **Token**, pega tu JWT
4. Postman añadirá automáticamente el header

---

## ⚠️ Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `401 No autorizado` | Token faltante o inválido | Verifica que el header `Authorization: Bearer {token}` esté presente |
| `400 Solicitud incorrecta` | Datos faltantes en Body | Asegúrate de enviar todos los campos requeridos (firstName, lastName, email, etc.) |
| `404 Página no encontrada` | URL incorrecta | Revisa la URL; usa `http://localhost:3000/...` |
| `500 Error interno del servidor` | Error en el servidor | Revisa los logs en la terminal; asegúrate de que PostgreSQL esté corriendo |
| `EADDRINUSE: address already in use :::3000` | Puerto 3000 ocupado | Mata el proceso: `taskkill /PID {pid} /F` (Windows) o `kill -9 {pid}` (Linux/Mac) |

---

## 🗄️ Variables de Entorno

Asegúrate de que el `.env` contenga:

```env
PORT=3000
POSTGRES_PASSWORD=1106
POSTGRES_USER=marizol
POSTGRES_DB=aguiatur
PGHOST=localhost
PGPORT=5432
NODE_ENV=development
JWT_SECRET=mundolibre
SALTS=512
```

---

## 🧪 Corriendo las Pruebas

Para ejecutar las pruebas del proyecto:

```bash
npm test
```

**Nota:** Actualmente, el proyecto no cuenta con un conjunto de pruebas implementado. El comando `npm test` solo mostrará un mensaje de error por defecto. Se recomienda implementar tests unitarios e integración en el futuro.

---

## 📦 Scripts Disponibles

```bash
# Inicia el servidor en modo desarrollo (hot reload)
npm run start:dev

# Compila TypeScript a JavaScript
npm run build

# Inicia el servidor compilado
npm start

# Ejecuta el linter (ESLint)
npm run lint

# Formatea el código (Prettier)
npm run format

# Ejecuta las pruebas
npm test
```

---

## 🏗️ Estructura del Proyecto

```
src/
├── config/           # Configuración (BD, servidor, Socket.IO)
├── middleware/       # Middleware de validación y autenticación
├── modules/          # Módulos principales
│   ├── auth/         # Autenticación y registro
│   ├── users/        # Gestión de usuarios
│   ├── packages/     # Gestión de paquetes turísticos
│   └── categories/   # Gestión de categorías
├── tools/            # Herramientas (crypto, JWT)
├── types/            # Tipos e interfaces TypeScript
├── main.ts           # Punto de entrada de la aplicación
└── controllers.ts    # Controladores globales (si existen)
```

---

## 🔧 Dependencias Principales

- **Express.js** - Framework web
- **Sequelize** - ORM para bases de datos
- **PostgreSQL** - Base de datos relacional
- **Socket.IO** - Comunicación en tiempo real
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcrypt** - Hash de contraseñas
- **Zod** - Validación de esquemas
- **TypeScript** - Tipado estático
- **Nodemon** - Reinicio automático durante desarrollo

---

## 👨‍💻 Autores

- **Nicole**
- Repositorio: [AguiaturSistema](https://github.com/anistopera/AguiaturSistema)

---

## 📄 Licencia

ISC

---

## 📧 Soporte

Para reportar bugs o sugerencias, contacta al equipo de desarrollo.
