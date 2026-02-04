# Documentación Técnica del Backend - GameShop

## 1. Introducción y Arquitectura
El backend de GameShop está construido sobre una arquitectura **RESTful API** utilizando **Node.js** com entorno de ejecución y **Express** como framework web. La base de datos utilizada es **MongoDB** (NoSQL), gestionada a través de **Mongoose**.

El proyecto sigue el patrón de diseño **MVC (Modelo-Vista-Controlador)** adaptado a una API:
*   **Modelos (`/models`)**: Definen la estructura de los datos (Schemas).
*   **Controladores (`/controllers`)**: Contienen la lógica de negocio y respuesta a las peticiones.
*   **Rutas (`/routes`)**: Definen los endpoints de la API y asignan los controladores correspondientes.
*   **Middleware (`/middleware`)**: Funciones que se ejecutan antes de los controladores (ej: autenticación, validación).

---

## 2. Tecnologías Clave
*   **Express**: Servidor web.
*   **Mongoose**: Modelado de objetos para MongoDB.
*   **Bcryptjs**: Encriptación unidireccional de contraseñas (Hashing).
*   **JsonWebToken (JWT)**: Generación y verificación de tokens para sesiones stateless.
*   q      **Express-Validator**: Validación de datos de entrada en las peticiones.
*   **Cors & Helmet**: Seguridad y manejo de cabeceras HTTP.

---

## 3. Flujo de Datos y Autenticación

### 3.1 Ciclo de Vida de una Petición
1.  **Entrada**: La petición HTTP llega al servidor (`server.js`).
2.  **Middleware Global**: Se aplican reglas de seguridad (`helmet`), CORS y parseo de JSON.
3.  **Enrutamiento**: Express dirige la petición al router correspondiente (`authRoutes` o `productRoutes`).
4.  **Middleware de Ruta**:
    *   **Validación**: Se verifican los datos de entrada (ej: email válido).
    *   **Autenticación (`auth.js`)**: Si la ruta es protegida, se verifica el token Bearer JWT.
5.  **Controlador**: Se ejecuta la lógica de negocio (consultas a BD, cálculos).
6.  **Respuesta**: Se envía una respuesta JSON con el status HTTP adecuado (200, 201, 400, 500).

### 3.2 Seguridad de Autenticación
*   **Registro**: La contraseña del usuario se "hashea" con un *salt* de 10 rondas antes de guardarse. Nunca se guarda texto plano.
*   **Login**: Se compara el hash de la contraseña ingresada con el almacenado. Si coinciden, se firma un JWT con `HS256`.
*   **Persistencia**: El backend no guarda sesiones (Stateless). La autenticidad se verifica en cada petición decodificando el JWT.

---

## 4. Modelos de Base de Datos

### Usuario (`User.js`)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `name` | String | Sí | Nombre completo del usuario. |
| `email` | String | Sí | Email único. Usado para login. |
| `password` | String | Sí | Hash encriptado. |
| `role` | String | No | 'user' (defecto) o 'admin'. Controla acceso RBAC. |
| `createdAt`| Date | Auto | Fecha de registro. |

### Producto (`Product.js`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `title` | String | Título del juego. |
| `price` | Number | Precio actual. |
| `type` | String | 'Physical' o 'Digital'. |
| `platforms`| Array | ['PS5', 'Xbox', etc]. Plataformas compatibles. |
| `stock` | Number | Cantidad disponible. |
| `image` | String | URL de la imagen del producto. |

> **Nota**: El esquema de Producto incluye un transformador `toJSON` para convertir automáticamente `_id` (Mongo) a `id` (Frontend).

---

## 5. Endpoints de la API

### Autenticación (`/api/auth`)
*   **POST** `/register`: Crea un nuevo usuario.
    *   *Body*: `{ name, email, password }`
    *   *Validaciones*: Email válido, Pass min 6 chars.
*   **POST** `/login`: Autentica un usuario existente.
    *   *Body*: `{ email, password }`
    *   *Respuesta*: Token JWT + Datos de usuario.

### Productos (`/api/products`)
*   **GET** `/`: Obtiene todos los productos (Público).
*   **GET** `/:id`: Obtiene un producto por ID (Público).
*   **POST** `/`: Crea un nuevo producto (**Privado** - Requiere Token).
*   **PUT** `/:id`: Actualiza un producto (**Privado**).
*   **DELETE** `/:id`: Elimina un producto (**Privado**).

---

## 6. Manejo de Errores
El backend utiliza códigos de estado HTTP estándar:
*   `200 OK`: Petición exitosa.
*   `201 Created`: Recurso creado exitosamente.
*   `400 Bad Request`: Datos de entrada inválidos o faltantes.
*   `401 Unauthorized`: Token faltante o inválido.
*   `404 Not Found`: Recurso no encontrado.
*   `500 Server Error`: Error interno no controlado.
