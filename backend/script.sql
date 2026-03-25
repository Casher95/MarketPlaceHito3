-- 1. Crear la base de datos
CREATE DATABASE softjobs;

-- 2. Conectarse a la base de datos (hazlo manualmente en pgAdmin o usa \c softjobs)

-- 3. Crear la tabla de usuarios según el esquema del hito
CREATE TABLE usuarios (
  id       SERIAL PRIMARY KEY,
  email    VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  rol      VARCHAR(25),
  lenguaje VARCHAR(20)
);

-- 4. Opcional: Insertar un usuario de prueba para testear el login
INSERT INTO usuarios (email, password, rol, lenguaje) 
VALUES ('carmen@test.com', '1234', 'Admin', 'JavaScript');