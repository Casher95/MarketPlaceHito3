const { Pool } = require('pg');
require('dotenv').config();

// Configuración con SSL obligatorio para Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

// Obtener productos (La ruta que te fallaba)
const getProductos = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM productos");
    return rows;
  } catch (error) {
    console.error("Error en SELECT productos:", error);
    throw error;
  }
};

// Registrar usuario
const registrarUsuario = async (usuario) => {
  const { email, password, rol, lenguaje } = usuario;
  const query = "INSERT INTO usuarios (email, password, rol, lenguaje) VALUES ($1, $2, $3, $4)";
  const values = [email, password, rol, lenguaje];
  await pool.query(query, values);
};

// Verificar credenciales para Login
const verificarCredenciales = async (email, password) => {
  const query = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
  const values = [email, password];
  const { rows: [usuario], rowCount } = await pool.query(query, values);
  return rowCount > 0 ? usuario : null;
};

module.exports = { getProductos, registrarUsuario, verificarCredenciales };