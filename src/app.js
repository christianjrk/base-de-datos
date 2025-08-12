// src/app.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const usuariosRoutes = require("./routes/usuarios.routes");
const productosRoutes = require("./routes/productos.routes");
const paginasRoutes = require("./routes/paginas.routes");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);
app.use("/", paginasRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// Exportar app
module.exports = app;
