const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//Ruta para registrar un nuevo usuario
router.post("/register", authController.register);

//Ruta para iniciar sesion
router.post("/login", authController.login);

//Ruta para obtener la informacion del usuario autenticado
router.get("/me", authController.getMe);

module.exports = router;
