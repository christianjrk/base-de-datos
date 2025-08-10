// src/controllers/compras.controller.js
const Compra = require("../models/compra.model");
const Producto = require("../models/producto.model");

// Crear una compra
exports.crearCompra = async (req, res) => {
  try {
    const usuarioId = req.user.id; // lo da el middleware validarAuth
    const { items } = req.body; // [{ productoId, cantidad }]

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    let total = 0;

    // Validar stock y calcular total
    for (let item of items) {
      const producto = await Producto.findById(item.productoId);

      if (!producto) {
        return res.status(404).json({ message: `Producto no encontrado: ${item.productoId}` });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para ${producto.nombre}` });
      }

      total += producto.precio * item.cantidad;

      // Reducir stock
      producto.stock -= item.cantidad;
      await producto.save();
    }

    // Crear la compra
    const nuevaCompra = new Compra({
      usuario: usuarioId,
      items,
      total,
      fecha: new Date(),
    });

    await nuevaCompra.save();

    res.status(201).json({ message: "✅ Compra realizada con éxito", compra: nuevaCompra });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar compra", error });
  }
};

// Obtener compras de un usuario
exports.obtenerComprasUsuario = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const compras = await Compra.find({ usuario: usuarioId }).populate("items.productoId");

    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener compras", error });
  }
};
