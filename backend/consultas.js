const { Pool } = require('pg');

// Configuración de la conexión usando la URL externa de Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Requerido para conexiones seguras con Render
  }
});

// Función para registrar un nuevo usuario
const registrarUsuario = async (usuario) => {
  const { email, password, rol, lenguaje } = usuario;
  const query = "INSERT INTO usuarios (email, password, rol, lenguaje) VALUES ($1, $2, $3, $4)";
  const values = [email, password, rol, lenguaje];
  await pool.query(query, values);
};

// Función para obtener un usuario por email (usada en Login y Perfil)
const obtenerUsuario = async (email) => {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const { rows: [usuario], rowCount } = await pool.query(query, values);

    if (!rowCount) {
        throw { code: 404, message: "No se encontró ningún usuario con este email" };
    }
    return usuario;
};

module.exports = { registrarUsuario, obtenerUsuario };