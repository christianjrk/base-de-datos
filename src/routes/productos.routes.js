// src/routes/productos.routes.js
const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productos.controller");

// Listar todos los productos
router.get("/", productosController.obtenerProductos);

// Obtener producto por ID
router.get("/:id", productosController.obtenerProductoPorId);

// Crear producto
router.post("/", productosController.crearProducto);

// Actualizar producto (general)
router.put("/:id", productosController.actualizarProducto);

// ⭐ Actualizar solo el stock
router.patch("/:id/stock", productosController.actualizarStock);

// Eliminar producto
router.delete("/:id", productosController.eliminarProducto);

module.exports = router;
