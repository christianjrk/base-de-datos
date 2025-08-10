// src/database/db.config.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // URL de conexión (la sacas de tu cuenta MongoDB Atlas o tu servidor local)
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/tiendaSolidaria";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1); // Cierra la app si no conecta
  }
};

module.exports = connectDB;
