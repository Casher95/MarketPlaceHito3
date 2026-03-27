const express = require('express');
const cors = require('cors');
const { getProductos, registrarUsuario, verificarCredenciales } = require('./consultas'); // Asegúrate de que existan en consultas.js
const jwt = require('jsonwebtoken');
const secretKey = require('./secretKey');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - ¡Vital para que el frontend se conecte!
app.use(cors());
app.use(express.json());

// 1. Ruta Raíz (Para que no diga Cannot GET /)
app.get("/", (req, res) => {
  res.send("Servidor Marketplace Online 🚀");
});

// 2. RUTA DE PRODUCTOS (Esto solucionará tu error actual)
app.get("/productos", async (req, res) => {
  try {
    const productos = await getProductos();
    res.json(productos); // Si la DB está vacía, aquí verás []
  } catch (error) {
    res.status(500).send("Error al obtener productos");
  }
});

// 3. Ruta de Registro
app.post("/usuarios", async (req, res) => {
  try {
    const usuario = req.body;
    await registrarUsuario(usuario);
    res.status(201).send("Usuario registrado con éxito");
  } catch (error) {
    res.status(500).send("Error al registrar usuario");
  }
});

// 4. Ruta de Login (Genera el JWT)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await verificarCredenciales(email, password);
    if (usuario) {
      const token = jwt.sign({ email }, secretKey);
      res.json({ email, token });
    } else {
      res.status(401).send("Credenciales incorrectas");
    }
  } catch (error) {
    res.status(500).send("Error en el login");
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));