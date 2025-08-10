// src/middlewares/registrarHistorial.js
const Historial = require("../models/historial.peticiones.model");

const registrarHistorial = async (req, res, next) => {
  try {
    const nuevoHistorial = new Historial({
      metodo: req.method,
      endpoint: req.originalUrl,
      usuario: req.user ? req.user.id : null, // Si está logueado, guardamos su ID
    });

    await nuevoHistorial.save();
  } catch (error) {
    console.error("❌ Error registrando historial:", error);
  }
  next();
};

module.exports = registrarHistorial;
