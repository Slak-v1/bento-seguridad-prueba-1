const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
const MONGO_URI = 'mongodb+srv://slak:barto1212@bento.dbh8xfu.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ CONECTADO A MONGODB ATLAS"))
  .catch(err => console.error("❌ ERROR DE CONEXIÓN:", err));

// Esquema de Producto
const Producto = mongoose.model('productos', new mongoose.Schema({
  nombre: String,
  categoria: String,
  etiqueta: String,
  descripcion: String,
  imagen: String
}));

// 1. Ruta de inicio (Para evitar el "Cannot GET /")
app.get('/', (req, res) => {
  res.send('🚀 Servidor de BENTO funcionando correctamente');
});

// 2. Ruta para LEER productos (La usa tu web principal)
app.get('/api/productos', async (req, res) => {
  try {
    const lista = await Producto.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

// 3. Ruta para CREAR productos (La usa tu admin.html)
app.post('/api/productos', async (req, res) => {
  const { password, ...datosProducto } = req.body;

  // Validación de seguridad
  if (password !== 'bento2026') {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }

  try {
    const nuevo = new Producto(datosProducto);
    await nuevo.save();
    res.status(201).json({ mensaje: "Producto guardado con éxito" });
  } catch (err) {
    res.status(500).json({ error: "Error al guardar" });
  }
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
