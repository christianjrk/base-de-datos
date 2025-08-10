const express = require("express");
const router = express.Router();
const comprasController = require("../controllers/compras.controller");
const validarAuth = require("../middlewares/validacionAutenticacionUsuario");

// Crear una compra (protegido)
router.post("/", validarAuth, comprasController.crearCompra);

// Obtener compras del usuario logueado (protegido)
router.get("/usuario", validarAuth, comprasController.obtenerComprasUsuario);

// (Opcional) Todas las compras para admin — se implementará más adelante
// router.get("/", validarAuth, esAdmin, comprasController.obtenerTodas);

module.exports = router;
