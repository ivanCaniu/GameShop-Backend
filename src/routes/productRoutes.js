const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

// Rutas públicas
router.get('/', getProducts);
router.get('/:id', getProductById);

// Reglas de validación para productos
const productRules = [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('price').isNumeric().withMessage('El precio debe ser un número'),
    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un entero positivo'),
    body('type').isIn(['Physical', 'Digital']).withMessage('El tipo debe ser Físico o Digital'),
    validate
];

// Rutas protegidas (Solo Admin)
router.post('/', [auth, ...productRules], createProduct);
router.put('/:id', [auth, ...productRules], updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
