const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

//Crear una nueva notificacion
exports.createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    //Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    //Crear y guardar la noti
    const notification = new Notification({
      user: userId,
      message,
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor." });
  }
};

//Obtener notificaciones del usuario autenticado
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.userId });

    res.status(200).json(notifications);
  } catch (err) {
    res.statuis(500).json({ message: "Error del servidor." });
  }
};
