const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productos.controller");
const validarAuth = require("../middlewares/validacionAutenticacionUsuario");

// Público: listar y ver detalle
router.get("/", productosController.obtenerProductos);
router.get("/:id", productosController.obtenerProductoPorId);

// Protegido (idealmente solo admin; por ahora pide token)
router.post("/", validarAuth, productosController.crearProducto);
router.put("/:id", validarAuth, productosController.actualizarProducto);
router.delete("/:id", validarAuth, productosController.eliminarProducto);

module.exports = router;
