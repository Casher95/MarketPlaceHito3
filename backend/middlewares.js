const jwt = require("jsonwebtoken");
const secretKey = require("./secretKey");

const verificarToken = (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) return res.status(401).send({ error: "Token no proporcionado" });

  const token = authorization.split("Bearer ")[1];
  
  try {
    const payload = jwt.verify(token, secretKey);
    req.email = payload.email; // Guardamos el email para la ruta /usuarios
    next(); // <--- OBLIGATORIO PARA LA RÚBRICA [cite: 104]
  } catch (error) {
    res.status(401).send({ error: "Token inválido" });
  }
};

module.exports = { verificarToken };