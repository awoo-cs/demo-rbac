const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

//Crear una nueva notificacion
exports.createNotification = async (userId, message) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const notification = new Notification({ user: userId, message });
  await notification.save();
  return notification;
};

//Obtener notificaciones del usuario autenticado
exports.getNotifications = async (userId) => {
  const notifications = await Notification.find({ user: userId });
  return notifications;
};
