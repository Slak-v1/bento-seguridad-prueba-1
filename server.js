const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- CONFIGURACIÓN DE MONGODB ---
// Reemplaza TU_LINK_AQUÍ por el que sacaste de Atlas (Connect -> Drivers)
const MONGO_URI = 'mongodb+srv://slak:<db_password>@bento.dbh8xfu.mongodb.net/?appName=bento'; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado a BENTO DB"))
  .catch(err => console.error("Error de conexión:", err));

// Esquema de producto
const Producto = mongoose.model('Producto', new mongoose.Schema({
  nombre: String,
  categoria: String,
  etiqueta: String,
  descripcion: String,
  imagen: String
}));

// Ruta para que la web lea productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
