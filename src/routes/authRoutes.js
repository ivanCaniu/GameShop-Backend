const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth'); // Importar el middleware de autenticación
const { getProfile, updateProfile } = require('../controllers/userController'); // Importar los controladores de perfil
const { body } = require('express-validator');
const validate = require('../middleware/validate');

// Definir rutas de autenticación
const router = express.Router();

// Ruta de registro
router.post('/register', [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validate
], register);

// Ruta de login
router.post('/login', login);

// Rutas protegidas
router.get('/profile', auth, getProfile); // Obtener perfil del usuario
router.put('/profile', auth, updateProfile); // Actualizar perfil del usuario

// Exportar el router
module.exports = router;
