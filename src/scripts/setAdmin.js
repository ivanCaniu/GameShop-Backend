const mongoose = require('mongoose');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
console.log("URI:", process.env.MONGODB_URI); // 
const User = require('../models/User'); 

const setAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Conectado a MongoDB');

        const email = 'admin@gameshop.com';
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ No se encontró el usuario ${email}. Regístrate primero en la web.`);
        } else {
            user.role = 'admin';
            await user.save();
            console.log(`✅ ¡ÉXITO! El usuario ${email} ahora es ADMIN.`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

setAdmin();
