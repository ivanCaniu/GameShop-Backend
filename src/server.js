const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');


// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Si la aplicación está detrás de un proxy, habilitar trust proxy
app.set('trust proxy', 1);

// Importar el paquete express-rate-limit
const rateLimit = require('express-rate-limit');

// ...

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// limitador de tasa
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.'
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('La API de GameShop está funcionando');
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gameshop';

// Conectar a la base de datos
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
