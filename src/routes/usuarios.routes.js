// src/routes/usuarios.routes.js
const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");

// Registro
router.post("/register", usuariosController.register);

// Login
router.post("/login", usuariosController.login);

// Perfil por id
router.get("/perfil/:id", usuariosController.getPerfil);

// Logout
router.post("/logout", usuariosController.logout);

module.exports = router;
