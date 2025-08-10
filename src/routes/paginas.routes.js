const express = require("express");
const router = express.Router();
const paginasController = require("../controllers/paginas.controller");
const validarAuth = require("../middlewares/validacionAutenticacionUsuario");

// Página de inicio
router.get("/", paginasController.mostrarInicio);

// Página de login
router.get("/login", paginasController.mostrarLogin);

// Página de registro (por ahora reutiliza la vista de login)
router.get("/register", paginasController.mostrarRegistro);

// Panel (protegido)
router.get("/dashboard", validarAuth, paginasController.mostrarPanel);

module.exports = router;
