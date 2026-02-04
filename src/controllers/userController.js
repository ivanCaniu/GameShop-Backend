const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Obtener perfil del usuario
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Excluir la contraseña
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Actualizar perfil del usuario
const updateProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updateData = { name, email };

        // Si envían password, hashearlo y agregarlo
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password'); // Excluir la contraseña

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = { getProfile, updateProfile };