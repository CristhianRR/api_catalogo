const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ override: true });
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'API funcionando correctamente' });
});

const frontendPath = path.join(__dirname, '..', '..', 'Frontend');
app.use(express.static(frontendPath));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Error en el servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));