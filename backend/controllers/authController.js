const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

//Registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    //Hashear la pass
    const hashedPassword = await bcrypt.hash(password, 10);

    //Crear un nuevo usuario
    const user = new User({
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (err) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

//Iniciar sesion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Verificamos si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales invalidas." });
    }

    //Verificamos la contrasenia
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales invalidas." });
    }

    //Crear y enviar un token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Error del servidor." });
  }
};

//Obtenemos la info del usuario autenticado
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor." });
  }
};
