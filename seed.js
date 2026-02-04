const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

dotenv.config({ path: './backend/.env' });

const products = [
    // --- PS5 ---
    {
        title: 'God of War Ragnarök',
        price: 59990,
        originalPrice: 69990,
        platforms: ['PS5', 'PS4'],
        type: 'Physical',
        image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg?t=1750909504',
        isNewRelease: true,
        stock: 10,
        description: 'Kratos y Atreus deben viajar a cada uno de los Nueve Reinos en busca de respuestas.'
    },
    {
        title: 'Spider-Man 2',
        price: 64990,
        platforms: ['PS5'],
        type: 'Digital',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.png',
        stock: 99,
        isNew: true
    },
    {
        title: 'Final Fantasy VII Rebirth',
        price: 54990,
        platforms: ['PS5'],
        type: 'Physical',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202401/1809/f094b684796f1e7cd2ba10ea62e45f69b52b4782a38e2aa4.png',
        stock: 5
    },
    {
        title: 'Elden Ring: Shadow of the Erdtree',
        price: 35000,
        platforms: ['PS5', 'Xbox', 'PC'],
        type: 'Digital',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202402/0817/114b1df9577098209a8bb8e45f4a009e201e9a2fa5113a06.png',
        stock: 50
    },
    // --- XBOX ---
    {
        title: 'Halo Infinite',
        price: 29990,
        platforms: ['Xbox', 'PC'],
        type: 'Physical',
        image: 'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/BVPSWA6JGRE3FBZJRQM74YVGGE.jpg',
        stock: 8
    },
    {
        title: 'Starfield',
        price: 45990,
        platforms: ['Xbox', 'PC'],
        type: 'Digital',
        image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/header.jpg?t=1749757928',
        stock: 99
    },
    // --- SWITCH ---
    {
        title: 'Zelda: Tears of the Kingdom',
        price: 49990,
        platforms: ['Switch'],
        type: 'Physical',
        image: 'https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg',
        stock: 12
    },
    {
        title: 'Mario Kart 8 Deluxe',
        price: 39990,
        platforms: ['Switch'],
        type: 'Digital',
        image: 'https://juegosdigitaleschile.com/files/images/productos/1644881577-1637878639-mario-kart-8-deluxe.jpg',
        stock: 99
    },
    // --- PC ---
    {
        title: 'Cyberpunk 2077: Ultimate',
        price: 25000,
        platforms: ['PC', 'PS5', 'Xbox'],
        type: 'Digital',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjLZq5ty97PF7Np4HShhJ1YeON-gRxYTzUA&s',
        stock: 99,
        isNew: false
    },
    {
        title: 'Baldur\'s Gate 3',
        price: 35000,
        platforms: ['PC', 'PS5', 'Xbox'],
        type: 'Digital',
        image: 'https://m.media-amazon.com/images/M/MV5BN2I0N2Y3MWUtNjJiNy00NjRjLWE4ZTctOTQ2YWVhM2VhMTM4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        stock: 99
    },
    // --- PRE-ORDERS ---
    {
        title: 'Resident Evil 9: Requiem',
        price: 69990,
        platforms: ['PS5', 'Xbox', 'PC'],
        type: 'Physical',
        image: 'https://juegosdigitaleschile.com/files/images/noticias/1752877892_2.webp',
        stock: 999,
        isPreorder: true,
        releaseDate: '15 Oct 2026',
        description: 'La saga continúa en una isla remota donde el sol nunca sale.'
    },
    {
        title: 'Grand Theft Auto VI',
        price: 79990,
        platforms: ['PS5', 'Xbox'],
        type: 'Physical',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202505/0616/c9f078c260d79339cb581054ce5ca49f2b56ab943d1beb20.png',
        stock: 999,
        isPreorder: true,
        releaseDate: 'Late 2026',
        description: 'Regresa a Vice City en la experiencia de mundo abierto más ambiciosa hasta la fecha.'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Products cleared');

        await Product.insertMany(products);
        console.log('Products imported!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
