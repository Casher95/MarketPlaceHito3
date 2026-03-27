const { Pool } = require('pg');
require('dotenv').config();

// Configuración del Pool con SSL para bases de datos externas (Ohio/Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

// Verificación de conexión inicial (ayuda a ver errores en los logs de Render)
pool.on('connect', () => {
  console.log("✅ Conexión exitosa a la base de datos de PostgreSQL");
});

const getProductos = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM productos");
    return rows;
  } catch (error) {
    console.error("❌ Error en getProductos:", error.message);
    throw error;
  }
};

const registrarUsuario = async (usuario) => {
  const { email, password, rol, lenguaje } = usuario;
  const query = "INSERT INTO usuarios (email, password, rol, lenguaje) VALUES ($1, $2, $3, $4)";
  try {
    await pool.query(query, [email, password, rol, lenguaje]);
  } catch (error) {
    console.error("❌ Error en registrarUsuario:", error.message);
    throw error;
  }
};

const verificarCredenciales = async (email, password) => {
  const query = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
  try {
    const { rows: [usuario], rowCount } = await pool.query(query, [email, password]);
    return rowCount > 0 ? usuario : null;
  } catch (error) {
    console.error("❌ Error en verificarCredenciales:", error.message);
    throw error;
  }
};

module.exports = { getProductos, registrarUsuario, verificarCredenciales };