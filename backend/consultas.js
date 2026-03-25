const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'softjobs',      
  port: 5432,
  allowExitOnIdle: true
});

const registrarUsuario = async (usuario) => {
  let { email, password, rol, lenguaje } = usuario;
  const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
  const values = [email, password, rol, lenguaje];
  await pool.query(query, values);
};

const obtenerUsuario = async (email) => {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

module.exports = { registrarUsuario, obtenerUsuario };