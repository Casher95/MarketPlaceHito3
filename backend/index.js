const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { registrarUsuario, obtenerUsuario } = require('./consultas');
const { verificarToken } = require('./middlewares');
const secretKey = require('./secretKey');

const app = express();

// Middlewares Globales
app.use(cors());
app.use(express.json());

// 1. Registro de Usuarios
app.post("/usuarios", async (req, res) => {
    try {
        const usuario = req.body;
        await registrarUsuario(usuario);
        res.status(201).send("Usuario creado con éxito");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 2. Login y Generación de Token
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await obtenerUsuario(email);
        
        // Nota: En producción se recomienda bcrypt para comparar contraseñas
        if (usuario && usuario.password === password) {
            const token = jwt.sign({ email }, secretKey);
            res.send({ token });
        } else {
            res.status(401).send("Credenciales incorrectas");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 3. Obtener Perfil (Ruta Protegida)
app.get("/usuarios", verificarToken, async (req, res) => {
    try {
        // req.email viene del middleware verificarToken
        const usuario = await obtenerUsuario(req.email);
        res.json(usuario);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Configuración del Puerto para Render
const PORT = process.env.PORT || 3000;

// Levantar servidor SOLO si no estamos en modo de prueba
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor backend corriendo en puerto ${PORT}`);
    });
}

module.exports = app;