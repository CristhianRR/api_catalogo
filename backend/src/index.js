require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Conexión MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/api_catalogo';
if (!process.env.MONGO_URI) console.warn('Warning: MONGO_URI not set — using fallback', mongoUri);
mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// Ruta
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));