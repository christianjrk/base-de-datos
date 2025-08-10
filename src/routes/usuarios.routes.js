// src/routes/usuarios.routes.js
const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");

// Registro de usuario
router.post("/register", usuariosController.register);

// Login de usuario
router.post("/login", usuariosController.login);

// Perfil de usuario
router.get("/perfil/:id", usuariosController.getPerfil);

// Logout de usuario
router.post("/logout", usuariosController.logout);

module.exports = router;
