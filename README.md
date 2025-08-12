# 🛍️ Tienda Solidaria - Backend con Node.js, Express y MongoDB

Este proyecto es una API REST para una **Tienda Solidaria**, desarrollada con **Node.js**, **Express** y **MongoDB**.  
Permite gestionar **usuarios** y **productos**, incluyendo la posibilidad de **actualizar el stock** de forma independiente.

---

## 📌 Características principales

- **Registro y autenticación de usuarios** con JWT y bcrypt.
- **CRUD de productos** (crear, listar, actualizar y eliminar).
- **Actualización de stock** con una ruta específica (`PATCH`).
- Conexión segura a MongoDB mediante variables de entorno.
- Organización del código en controladores, rutas y modelos.
- Middleware para manejo de errores y validaciones.

---

## 🗄️ Estructura de la base de datos

### 1️⃣ Colección `usuarios`
| Campo        | Tipo       | Descripción                               |
|--------------|-----------|-------------------------------------------|
| `nombre`     | String    | Nombre completo del usuario               |
| `email`      | String    | Correo electrónico (único)                |
| `password`   | String    | Contraseña encriptada con bcrypt          |
| `fechaRegistro` | Date  | Fecha en que se registró el usuario        |

---

### 2️⃣ Colección `productos`
| Campo        | Tipo       | Descripción                               |
|--------------|-----------|-------------------------------------------|
| `nombre`     | String    | Nombre del producto                       |
| `descripcion`| String    | Descripción del producto                  |
| `precio`     | Number    | Precio en euros                           |
| `stock`      | Number    | Cantidad disponible en inventario         |
| `categoria`  | String    | Categoría del producto                    |

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/christianjrk/base-de-datos.git
   cd base-de-datos

   
🛠️ Tecnologías usadas
Node.js + Express → Backend

MongoDB + Mongoose → Base de datos

JWT → Autenticación

bcrypt → Encriptación de contraseñas

dotenv → Variables de entorno

morgan → Logger de peticiones HTTP

