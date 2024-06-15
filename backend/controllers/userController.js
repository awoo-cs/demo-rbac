const User = require("../models/userModel");

//Obtener la info del usuario autenticado
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.userId).select('-password');
        if(!user){
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({ message: 'Error al obtener la informacion del usuario.' });
    }
};