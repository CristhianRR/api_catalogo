const Product = require('../models/products');

const normalizePayload = (payload = {}) => {
  const data = {
    nombre:      payload.nombre      || payload.name        || '',
    marca:       payload.marca       || 'Otra',
    descripcion: payload.descripcion || payload.description || '',
    precio:      Number(payload.precio  ?? payload.price    ?? 0),
    stock:       Number(payload.stock   ?? payload.quantity ?? 0),
    categoria:   payload.categoria   || payload.catalog     || 'Otro',
    imagen:      payload.imagen      || payload.image       || ''
  };
  if (payload.fechaVencimiento) {
    data.fechaVencimiento = payload.fechaVencimiento;
  }
  return data;
};

const handleError = (error, res) => {
  console.error(error);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};

// Crear
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(normalizePayload(req.body));
    const saved   = await product.save();
    res.status(201).json(saved);
  } catch (error) { handleError(error, res); }
};

// Listar (orden reciente primero)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ fechaCreacion: -1 });
    res.json(products);
  } catch (error) { handleError(error, res); }
};

// Por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) { handleError(error, res); }
};

// Actualizar
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      normalizePayload(req.body),
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updated);
  } catch (error) { handleError(error, res); }
};

// Eliminar
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) { handleError(error, res); }
};
