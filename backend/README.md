# API RESTful - Catálogo de Productos

## 📋 Descripción

API RESTful desarrollada en **Node.js con Express** que permite gestionar un catálogo de productos. Se comunica mediante **JSON** y puede ser testeada fácilmente con **Postman**.

---

## ✅ Requisitos Previos

## ⚙️ Requisitos

Asegurarse de tener MongoDB corriendo localmente en `localhost:27017`.

---

## ▶️ Instrucciones para Ejecutar

1. Abrir una terminal (Command Prompt) y navegar a la carpeta del proyecto:
  ```cmd
  cd C:\Users\[usuario]\Desktop\api_catalogo\backend
  ```

2. Ejecutar el siguiente comando:

```cmd
npm run dev
```

O alternativamente:
```cmd
node node_modules\nodemon\bin\nodemon.js src\index.js
```

3. Verificar que aparezca el siguiente mensaje en la terminal:
```
[nodemon] 3.1.14
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src\index.js`
Servidor corriendo en puerto 4000
MongoDB conectado
```

El servidor estará listo para recibir solicitudes en `http://localhost:4000`.

---

## 🧪 Testing con Postman

### Endpoints Disponibles

#### **GET - Obtener todos los productos**
```
GET http://localhost:4000/api/products
```

**Respuesta esperada:**
```json
[
  {
    "_id": "69a603baed4e852cbef19452",
    "name": "Test item",
    "price": 10,
    "quantity": 0,
    "createdAt": "2026-03-02T21:40:10.597Z",
    "updatedAt": "2026-03-02T21:40:10.597Z",
    "__v": 0
  }
]
```

---

#### **POST - Crear un nuevo producto**
```
POST http://localhost:4000/api/products
```

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "Laptop",
  "price": 599.99,
  "quantity": 5
}
```

**Respuesta esperada:** El producto guardado con `_id`, `createdAt` y `updatedAt` automáticos.

---

#### **GET - Obtener producto por ID**
```
GET http://localhost:4000/api/products/69a603baed4e852cbef19452
```

Reemplaza `69a603baed4e852cbef19452` con un `_id` real de tu base de datos.

---

#### **PUT - Actualizar un producto**
```
PUT http://localhost:4000/api/products/69a603baed4e852cbef19452
```

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "Laptop actualizada",
  "price": 699.99,
  "quantity": 3
}
```

⚠️ **Importante**: Incluye el `_id` en la URL, no en el body.

---

#### **DELETE - Eliminar un producto**
```
DELETE http://localhost:4000/api/products/69a603baed4e852cbef19452
```

**Respuesta esperada:**
```json
{
  "message": "Producto eliminado"
}
```

---

## 📁 Estructura del Proyecto

```
backend/
├── .env                      # Variables de entorno
├── package.json             # Dependencias del proyecto
├── src/
│   ├── index.js            # Configuración principal + servidor Express
│   ├── config/
│   │   └── db.js           # Configuración de base de datos
│   ├── models/
│   │   └── products.js      # Schema de Mongoose para productos
│   ├── controllers/
│   │   └── productControllers.js  # Lógica de negocio (CRUD)
│   └── routes/
│       └── productRoutes.js # Definición de endpoints
└── node_modules/           # Dependencias instaladas
```


