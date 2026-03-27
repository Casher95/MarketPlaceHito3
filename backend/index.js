const express = require('express');
const cors = require('cors');
const { getProductos, registrarUsuario, verificarCredenciales } = require('./database/config');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET || "llave_secreta_u_market_2026";

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Marketplace API is Live 🚀");
});

// GET /productos
app.get("/productos", async (req, res) => {
  try {
    const productos = await getProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).send("Error al obtener productos de la base de datos");
  }
});

// POST /usuarios (Registro)
app.post("/usuarios", async (req, res) => {
  try {
    await registrarUsuario(req.body);
    res.status(201).send("Usuario registrado con éxito");
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
      res.status(401).send("Email o contraseña incorrectos");
    }
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));