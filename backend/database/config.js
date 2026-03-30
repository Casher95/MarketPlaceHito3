const { Pool } = require('pg');
require('dotenv').config();

// Configuración del Pool con SSL para bases de datos en la nube (Render/Ohio)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

// --- CONFIGURACIÓN DE SEGURIDAD Y ESQUEMA ---
// Esto asegura que cada vez que el backend se conecte, apunte al esquema 'public'
pool.on('connect', (client) => {
  client.query('SET search_path TO public');
  console.log("✅ Conexión establecida: Esquema 'public' configurado.");
});

// Manejo de errores inesperados en el pool
pool.on('error', (err) => {
  console.error('❌ Error inesperado en el pool de conexiones:', err.message);
});

// --- FUNCIONES DE BASE DE DATOS ---

/**
 * Obtiene todos los productos de la tabla public.productos
 */
const getProductos = async () => {
  try {
    // Usamos el nombre calificado "public.productos" para evitar errores de relación
    const { rows } = await pool.query("SELECT * FROM public.productos");
    return rows;
  } catch (error) {
    console.error("❌ Error en getProductos:", error.message);
    throw error;
  }
};

/**
 * Registra un nuevo usuario en la tabla public.usuarios
 */
const registrarUsuario = async (usuario) => {
  const { email, password, rol, lenguaje } = usuario;
  const query = "INSERT INTO public.usuarios (email, password, rol, lenguaje) VALUES ($1, $2, $3, $4)";
  try {
    await pool.query(query, [email, password, rol, lenguaje]);
    console.log(`👤 Usuario ${email} registrado con éxito.`);
  } catch (error) {
    console.error("❌ Error en registrarUsuario:", error.message);
    throw error;
  }
};

/**
 * Verifica las credenciales para el login
 */
const verificarCredenciales = async (email, password) => {
  const query = "SELECT * FROM public.usuarios WHERE email = $1 AND password = $2";
  try {
    const { rows: [usuario], rowCount } = await pool.query(query, [email, password]);
    return rowCount > 0 ? usuario : null;
  } catch (error) {
    console.error("❌ Error en verificarCredenciales:", error.message);
    throw error;
  }
};

module.exports = { 
  getProductos, 
  registrarUsuario, 
  verificarCredenciales 
};