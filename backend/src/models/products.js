const mongoose = require('mongoose');

const CATEGORIAS = [
  'Cremas',
  'Lociones',
  'Perfumes',
  'Fragancias',
  'Maquillaje',
  'Cuidado Capilar',
  'Cuidado Corporal',
  'Alimentos',
  'Bebidas',
  'Suplementos',
  'Accesorios',
  'Ropa',
  'Hogar',
  'Otro'
];

const MARCAS = [
  "L'Bel",
  'Esika',
  'Cyzone',
  'Avon',
  'Yanbal',
  'Natura',
  'Unique',
  'Mary Kay',
  'Herbalife',
  'Omnilife',
  'Novaventa',
  'Otra'
];

const productSchema = new mongoose.Schema({
  nombre:          { type: String, required: true, trim: true, maxlength: 100 },
  marca:           { type: String, required: true, enum: MARCAS, default: 'Otra' },
  descripcion:     { type: String, required: true, maxlength: 500 },
  precio:          { type: Number, required: true, min: 0 },
  stock:           { type: Number, required: true, min: 0 },
  categoria:       { type: String, required: true, enum: CATEGORIAS },
  fechaVencimiento:{ type: Date },
  imagen:          { type: String, default: '' },
  activo:          { type: Boolean, default: true },
  fechaCreacion:   { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
});

productSchema.pre('findOneAndUpdate', function () {
  this.set({ fechaActualizacion: new Date() });
});

module.exports = mongoose.model('Product', productSchema);
