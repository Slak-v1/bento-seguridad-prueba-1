const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = 'mongodb+srv://slak:barto1212@bento.dbh8xfu.mongodb.net/bento_db?retryWrites=true&w=majority';

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

app.get('/api/productos', async (req, res) => {
  try {
    const lista = await Producto.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
});


app.post('/api/productos', async (req, res) => {
  const { password, ...datosProducto } = req.body;

 
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
