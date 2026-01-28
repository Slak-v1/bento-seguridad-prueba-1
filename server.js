const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// USA ESTE LINK EXACTO (con la P mayúscula)
const MONGO_URI = 'mongodb+srv://slak:Puska1212@bento.dbh8xfu.mongodb.net/bento_db?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ CONECTADO A MONGODB ATLAS"))
  .catch(err => console.error("❌ ERROR DE CONEXIÓN:", err));

const Producto = mongoose.model('productos', new mongoose.Schema({
  nombre: String,
  categoria: String,
  etiqueta: String,
  descripcion: String,
  imagen: String
}));

// Esto quita el error "Cannot GET /"
app.get('/', (req, res) => {
  res.send('🚀 Servidor de BENTO funcionando correctamente');
});

// Esta es la ruta para tu HTML
app.get('/api/productos', async (req, res) => {
  try {
    const lista = await Producto.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
