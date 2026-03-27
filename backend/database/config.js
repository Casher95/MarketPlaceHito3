const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

const getProductos = async () => {
  const { rows } = await pool.query("SELECT * FROM productos");
  return rows;
};

const registrarUsuario = async (usuario) => {
  const { email, password, rol, lenguaje } = usuario;
  const query = "INSERT INTO usuarios (email, password, rol, lenguaje) VALUES ($1, $2, $3, $4)";
  await pool.query(query, [email, password, rol, lenguaje]);
};

const verificarCredenciales = async (email, password) => {
  const { rows: [usuario], rowCount } = await pool.query("SELECT * FROM usuarios WHERE email = $1 AND password = $2", [email, password]);
  return rowCount > 0 ? usuario : null;
};

module.exports = { getProductos, registrarUsuario, verificarCredenciales };