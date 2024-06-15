const User = require("../models/userModel");

//Middleware para verificar si el usuario tiene el rol requerido
exports.rbacMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
      if (user.role !== requiredRole) {
        return res.status(403).json({ message: "Acceso denegado." });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: "Error del servidor" });
    }
  };
};
