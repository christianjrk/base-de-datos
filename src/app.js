// src/app.js
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./database/db.config");
const registrarHistorial = require("./middlewares/registrarHistorial");

const app = express();

// ===== Conexión a MongoDB =====
connectDB();

// ===== Middlewares globales =====
app.use(cors());
app.use(morgan("dev"));

// ¡IMPORTANTE! Parseo de JSON y formularios
app.use(express.json());                         // <-- aquí
app.use(express.urlencoded({ extended: true })); // <-- y aquí

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Motor de vistas EJS
app.set("views", path.join(__dirname, "../public"));
app.set("view engine", "ejs");

// Historial de peticiones
app.use(registrarHistorial);

// ===== Rutas =====
const usuariosRoutes = require("./routes/usuarios.routes");
const productosRoutes = require("./routes/productos.routes");
const comprasRoutes = require("./routes/compras.routes");
const paginasRoutes = require("./routes/paginas.routes");

app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);
app.use("/compras", comprasRoutes);
app.use("/", paginasRoutes);

module.exports = app;
