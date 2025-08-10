// src/models/producto.model.js

const mongoose = require("mongoose");

// Definimos el esquema de Producto
const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    imagen: {
      type: String,
      required: [true, "La URL de la imagen es obligatoria"],
    },
    stock: {
      type: Number,
      required: true,
      default: 10, // Cada producto arranca con 10 en stock
      min: [0, "El stock no puede ser negativo"],
    },
    creadoEn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // no incluir __v
  }
);

// Creamos el modelo
const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
