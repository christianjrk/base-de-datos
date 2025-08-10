// src/models/usuario.model.js

const mongoose = require("mongoose");

// Definimos el esquema de Usuario
const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Por favor ingrese un correo válido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    telefono: {
      type: String,
      default: "",
    },
    rol: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
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
const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
