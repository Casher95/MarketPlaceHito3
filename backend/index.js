const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getProductos, registrarUsuario, verificarCredenciales } = require('./database/config'); // Ajusta la ruta si es necesario

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. CAPTURA DE ERRORES GLOBALES (Crucial para Render) ---
// Esto evita que el servidor se caiga sin explicar por qué
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Error No Manejado (Promise):', reason);
});

process.on('uncaughtException', (err) => {
    console.error('❌ Excepción No Capturada:', err.message);
    // En producción, podrías querer cerrar el proceso limpiamente, 
    // pero aquí lo dejamos logueado para depurar.
});

// --- 2. MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- 3. RUTAS ---

// Ruta de prueba (Health Check)
app.get('/', (req, res) => {
    res.send('✅ Servidor funcionando correctamente');
});

// Obtener productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await getProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Registro de usuarios
app.post('/usuarios', async (req, res) => {
    try {
        await registrarUsuario(req.body);
        res.status(201).send("Usuario registrado con éxito");
    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario" });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await verificarCredenciales(email, password);
        if (usuario) {
            res.json({ mensaje: "Login exitoso", usuario });
        } else {
            res.status(401).json({ error: "Credenciales inválidas" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor durante el login" });
    }
});

// --- 4. INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    console.log(`🌍 URL base: http://localhost:${PORT}`);
});