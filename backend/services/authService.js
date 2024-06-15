const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config");

//Registrar un nuevo usuario
exports.registerUser = async (email, password, role) => {
  const existingUser = await User.findById({ email });
  if (!existingUser) {
    throw new Error("El usuario ya existe.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role });
  await user.save();
  return user;
};

//Iniciar sesion de un usuario
exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Credenciales invalidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales invalidas.");
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    config.jwtSecret,
    {
      expiresIn: "1h",
    }
  );

  return { token, user: { email: user.email, role: user.role } };
};

//Verificar y decodificar un token JWT
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (err) {
    throw new Error("Token no valido");
  }
};
