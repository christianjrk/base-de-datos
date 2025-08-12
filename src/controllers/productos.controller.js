// src/controllers/productos.controller.js
const Producto = require("../models/producto.model");

// 📌 Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos", error });
    }
};

// 📌 Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto", error });
    }
};

// 📌 Crear producto
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        if (!nombre || !descripcion || !precio || stock == null) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const nuevoProducto = new Producto({ nombre, descripcion, precio, stock });
        await nuevoProducto.save();
        res.status(201).json({ message: "Producto creado con éxito", producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

// 📌 Actualizar producto (general)
exports.actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto actualizado con éxito", producto });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
};

// 📌 Actualizar solo el stock
exports.actualizarStock = async (req, res) => {
    try {
        const { stock } = req.body;
        if (stock == null) {
            return res.status(400).json({ message: "El stock es obligatorio" });
        }

        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            { stock },
            { new: true }
        );

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Stock actualizado con éxito", producto });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar stock", error });
    }
};

// 📌 Eliminar producto
exports.eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};
