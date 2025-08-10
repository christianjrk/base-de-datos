// src/models/historial.peticiones.model.js

const mongoose = require("mongoose");

// Definimos el esquema para el historial de peticiones
const historialPeticionesSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // Relación con el modelo Usuario
      required: true,
    },
    metodo: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE"],
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    exito: {
      type: Boolean,
      default: true,
    },
    detalleError: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false, // evita el __v
  }
);

// Creamos el modelo
const HistorialPeticiones = mongoose.model(
  "HistorialPeticiones",
  historialPeticionesSchema
);

module.exports = HistorialPeticiones;
