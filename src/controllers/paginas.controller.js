// src/controllers/paginas.controller.js
const path = require("path");

// Página principal (index.html)
const mostrarInicio = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
};

// Formulario de inicio de sesión
const mostrarLogin = (req, res) => {
  res.render("inicioSesion.ejs");
};

// Formulario de registro de usuario
const mostrarRegistro = (req, res) => {
  res.render("cerrarSesion.ejs");
};

// Panel de control protegido
const mostrarPanel = (req, res) => {
  res.render("panelControl.ejs", { usuario: req.user || null });
};

module.exports = {
  mostrarInicio,
  mostrarLogin,
  mostrarRegistro,
  mostrarPanel,
};
