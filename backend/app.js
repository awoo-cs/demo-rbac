const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

//Middleware para permitir CORS
app.use(cors());

//Middleware para parsear JSON
app.use(express.json());

//Conectar a la base de datos
mongoose
  .connect(config.dbURI)
  .then(() => console.log("BD Conectada"))
  .catch((err) => console.error("Error de Conexion con la BD", err));

//Configurar rutas
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

//Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error de servidor" });
});

module.exports = app;
