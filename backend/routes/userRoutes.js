const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

//Ruta para obtener la info del usuario autenticado
router.get("/info", authMiddleware, userController.getUserInfo);

module.exports = router;
