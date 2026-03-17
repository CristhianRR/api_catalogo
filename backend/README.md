# API RESTful + Frontend - Catálogo de Productos

## 📋 Descripción

Proyecto full stack para gestión de inventario de productos con:

- **Backend** en Node.js + Express + MongoDB (Mongoose)
- **Frontend** en AngularJS + Materialize CSS
- **CRUD completo** (crear, consultar, editar y eliminar)
- **Filtros y edición en inventario**
- **Subida de imagen** (base64) y formato de precio en **COP**

El backend sirve también la interfaz web, por eso todo se usa desde:

`http://localhost:5000`

---

## ⚙️ Requisitos previos

Antes de ejecutar, verificar que la persona tenga instalado:

1. **Node.js** (recomendado 18 o superior)
2. **npm**
3. **MongoDB** local corriendo en `localhost:27017`

> Nota: El frontend usa librerías por CDN (AngularJS/Materialize), por lo que no requiere `npm install` dentro de `Frontend`.

---

## 📦 Ejecución desde archivo ZIP (paso a paso)

1. Descomprimir el ZIP (ejemplo: `api_catalogo`).
2. Abrir terminal y ubicarse en:

```cmd
cd C:\ruta\donde\descomprimiste\api_catalogo\backend
```

3. Instalar dependencias del backend:

```cmd
npm install
```

4. Revisar que exista `backend/.env` con este contenido:

```env
MONGODB_URI=mongodb://localhost:27017/catalogo_api
PORT=5000
NODE_ENV=development
```

5. Asegurarse de tener MongoDB activo.

6. Iniciar servidor:

```cmd
npm run dev
```

Alternativa:

```cmd
node src/index.js
```

7. Abrir navegador en:

`http://localhost:5000`

### 🛠️ Nota para PowerShell (Windows)

Si aparece error de ejecución de `npm.ps1`, usar:

```cmd
npm.cmd run dev
```

o ejecutar desde **Command Prompt (cmd)**.

---

## 🌐 Cómo usar el sitio web

### 1) Pestaña **Inicio**

- Registrar nuevos productos con campos:
  - Nombre
  - Marca
  - Categoría
  - Descripción
  - Precio (COP)
  - Cantidad (stock)
  - Fecha de vencimiento
  - Imagen
- Marca y categoría tienen búsqueda para filtrar opciones.
- La imagen se puede subir desde archivo y se muestra vista previa.
- Botón verde de formulario: **Guardar**.
- Se muestran “**Productos registrados recientemente**” con selector de filas (5, 10, 20, Todos).

### 2) Pestaña **Inventario**

- Tabla con columnas: Nombre, Marca, Categoría, Cantidad, Precio, Fecha vencimiento y Acciones.
- Filtros por nombre, marca y categoría.
- Edición directa en la misma tabla (inline), sin cambiar de pestaña.
- En modo edición aparecen botones **Guardar** y **Cancelar** en la fila.
- Eliminación de productos desde la tabla.

---

## 🧠 Funciones implementadas (resumen técnico)

### Backend

- `src/config/db.js`: conexión a MongoDB.
- `src/models/products.js`: esquema con campos de catálogo (nombre, marca, categoría, precio, stock, etc.).
- `src/controllers/productControllers.js`:
  - `createProduct`
  - `getProducts`
  - `getProductById`
  - `updateProduct`
  - `deleteProduct`
  - normalización de payload y manejo de errores.
- `src/index.js`: middlewares, rutas API, servicio estático del frontend y fallback a `index.html`.

### Frontend

- `Frontend/app/services/product.service.js`: consumo de API REST.
- `Frontend/app/controllers/product.controller.js`:
  - lógica de CRUD
  - filtros de inventario
  - edición inline en inventario
  - control de pestañas
  - validación de campos obligatorios
- `Frontend/app/app.module.js`:
  - directiva `fileModel` para convertir imagen a base64
  - filtro `cop` para formato de moneda colombiana

---

## 🧪 Testing con Postman (se mantiene)

### Endpoint base

`http://localhost:5000/api/products`

### Endpoints disponibles

#### **GET - Obtener todos los productos**

```http
GET http://localhost:5000/api/products
```

#### **POST - Crear un nuevo producto**

```http
POST http://localhost:5000/api/products
```

**Headers:**

```http
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "nombre": "Perfume La Nuit",
  "marca": "L'Bel",
  "descripcion": "Fragancia floral amaderada",
  "precio": 128000,
  "stock": 8,
  "categoria": "Perfumes",
  "fechaVencimiento": "2027-06-30",
  "imagen": ""
}
```

#### **GET - Obtener producto por ID**

```http
GET http://localhost:5000/api/products/:id
```

#### **PUT - Actualizar un producto**

```http
PUT http://localhost:5000/api/products/:id
```

**Body (raw JSON) ejemplo:**

```json
{
  "nombre": "Perfume La Nuit - Edición",
  "marca": "L'Bel",
  "descripcion": "Fragancia actualizada",
  "precio": 130000,
  "stock": 10,
  "categoria": "Perfumes"
}
```

#### **DELETE - Eliminar un producto**

```http
DELETE http://localhost:5000/api/products/:id
```

#### **GET - Endpoint de prueba API**

```http
GET http://localhost:5000/api/test
```

---

## ✅ Buenas prácticas aplicadas

- Separación por capas: rutas, controladores, modelo y configuración.
- Validaciones de esquema en Mongoose.
- Manejo de errores con respuestas HTTP apropiadas.
- Normalización de datos recibidos en backend.
- Frontend desacoplado por servicio (`ProductService`) y controlador.
- Interfaz con feedback visual y filtros para mejor experiencia de usuario.

---

## 📁 Estructura  del proyecto

```text
api_catalogo/
├── backend/
│   ├── .env
│   ├── package.json
│   ├── README.md
│   └── src/
│       ├── index.js
│       ├── config/
│       │   └── db.js
│       ├── models/
│       │   └── products.js
│       ├── controllers/
│       │   └── productControllers.js
│       └── routes/
│           └── productRoutes.js
└── Frontend/
    ├── index.html
    ├── app/
    │   ├── app.module.js
    │   ├── controllers/
    │   │   └── product.controller.js
    │   └── services/
    │       └── product.service.js
    └── assets/
        └── css/
            └── styles.css
```



