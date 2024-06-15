const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/userModel");

//Middleware para verificar el token JWT y autenticar al usuario
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if(!authHeader){
    return res.status(401).json({ message: 'No token, autorizacion denegada.' });
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, autorizacion denegada." });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token no valido." });
  }
};

//Middleware para verificar el rol de admin
exports.adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado." });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Error del servidor." });
  }
};
