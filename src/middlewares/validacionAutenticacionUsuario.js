// src/middlewares/validacionAutenticacionUsuario.js
const jwt = require("jsonwebtoken");

const validarAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "❌ Acceso denegado, token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "❌ Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos el ID del usuario en req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "❌ Token no válido o expirado" });
  }
};

module.exports = validarAuth;
