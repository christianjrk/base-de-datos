// src/controllers/usuarios.controller.js
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_super_larga";

// ============ REGISTRO ============
async function register(req, res) {
  try {
    // Logs para depurar qué llega
    console.log("📥 /usuarios/register content-type:", req.headers["content-type"]);
    console.log("📥 /usuarios/register raw body:", req.body);

    // Normalizamos (evita falsos negativos por espacios, null/undefined)
    const nombre   = (req.body?.nombre   ?? "").toString().trim();
    const email    = (req.body?.email    ?? "").toString().trim();
    const password = (req.body?.password ?? "").toString().trim();
    const telefono = (req.body?.telefono ?? "").toString().trim();

    console.log("✅ Normalizado:", { nombre, email, passwordLen: password.length, telefono });

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ message: "Nombre, email y contraseña son obligatorios" });
    }

    const yaExiste = await Usuario.findOne({ email });
    if (yaExiste) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashed,
      telefono, // opcional
    });

    await nuevoUsuario.save();

    return res.status(201).json({
      message: "✅ Usuario registrado exitosamente",
      usuario: { id: nuevoUsuario._id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email }
    });
  } catch (error) {
    console.error("❌ Error en register:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

// ============ LOGIN ============
async function login(req, res) {
  try {
    const email    = (req.body?.email    ?? "").toString().trim();
    const password = (req.body?.password ?? "").toString().trim();

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.json({ message: "✅ Login exitoso", token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

// ============ PERFIL ============
async function getPerfil(req, res) {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id).select("-password");
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json(usuario);
  } catch (error) {
    console.error("❌ Error en getPerfil:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

// ============ LOGOUT ============
function logout(req, res) {
  return res.json({ message: "✅ Logout (el cliente borra el token)" });
}

module.exports = { register, login, getPerfil, logout };
