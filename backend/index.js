const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// Ruta corregida para Render: sube un nivel si es necesario o entra a database
const { getProductos, registrarUsuario, verificarCredenciales } = require('./database/config.js');

const app = express();

// Usar el puerto de Render o el 3000 local
const PORT = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET || "llave_secreta_u_market_2026";

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz para verificar que el servicio subió
app.get("/", (req, res) => {
  res.send("Servidor Marketplace de Carmen: Online 🚀");
});

// GET /productos - La ruta que presentaba error
app.get("/productos", async (req, res) => {
  try {
    const productos = await getProductos();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error al obtener productos");
  }
});

// POST /usuarios
app.post("/usuarios", async (req, res) => {
  try {
    await registrarUsuario(req.body);
    res.status(201).send("Usuario registrado");
  } catch (error) {
    res.status(500).send("Error en el registro");
  }
});

// POST /login
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
    res.status(500).send("Error en el servidor");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});