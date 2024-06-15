const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { rbacMiddleware } = require("../middlewares/rbacMiddleware");

//Ruta para crear una nueva notificacion
router.post(
  "/",
  authMiddleware,
  rbacMiddleware("admin"),
  notificationController.createNotification
);

//Ruta para obtener las notificaciones del usuario autenticado
router.get("/", authMiddleware, notificationController.getNotifications);

module.exports = router;
