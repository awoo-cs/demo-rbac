const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

//Ruta para obtener todos los usuarios
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);

module.exports = router;