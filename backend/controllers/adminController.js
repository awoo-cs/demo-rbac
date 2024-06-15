const User = require("../models/userModel");

//Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch (err){
        res.status(500).json({ message: 'Error al obtener los usuarios.' })
    }
}