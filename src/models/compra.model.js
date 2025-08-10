// src/models/compra.model.js
const mongoose = require("mongoose");

const CompraSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  items: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
      cantidad: { type: Number, required: true, min: 1 }
    }
  ],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Compra", CompraSchema);
