const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Asegúrate de que la ruta sea exacta. Si index.js y la carpeta database 
// están al mismo nivel dentro de 'backend', esta ruta es correcta.
const { getProductos, registrarUsuario, verificarCredenciales } = require('./database/config'); 

const app = express();
// Render asigna el puerto automáticamente, por eso process.env.PORT es vital.
const PORT = process.env.PORT || 3000;

// --- 1. CAPTURA DE ERRORES GLOBALES ---
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Error No Manejado (Promise):', reason);
});

process.on('uncaughtException', (err) => {
    console.error('❌ Excepción No Capturada:', err.message);
});

// --- 2. MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- 3. RUTAS ---

// Health Check: Útil para que Render sepa que el contenedor está vivo
app.get('/', (req, res) => {
    res.send('✅ Servidor Backend de SoftJobs funcionando correctamente');
});

// Obtener productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await getProductos();
        res.json(productos);
    } catch (error) {
        // Log detallado en el servidor, pero genérico para el cliente (seguridad)
        console.error("Error en ruta /productos:", error.message);
        res.status(500).json({ error: "Error al obtener productos de la base de datos" });
    }
});

// Registro de usuarios
app.post('/usuarios', async (req, res) => {
    try {
        await registrarUsuario(req.body);
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error("Error en ruta /usuarios:", error.message);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await verificarCredenciales(email, password);
        if (usuario) {
            // Como experta en seguridad, recuerda no enviar el password de vuelta
            delete usuario.password; 
            res.json({ mensaje: "Login exitoso", usuario });
        } else {
            res.status(401).json({ error: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error("Error en ruta /login:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
});

// --- 4. INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    // En Render, el localhost no sirve para el exterior, pero ayuda a debuguear logs.
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'desarrollo'}`);
});