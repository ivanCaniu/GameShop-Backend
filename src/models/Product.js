const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    platforms: [{
        type: String,
        enum: ['PS5', 'PS4', 'Xbox', 'Switch', 'PC']
    }],
    type: {
        type: String,
        enum: ['Physical', 'Digital'],
        required: true
    },
    image: { type: String, required: true },
    isNewRelease: { type: Boolean, default: false },
    isPreorder: { type: Boolean, default: false },
    releaseDate: { type: String },
    stock: { type: Number, required: true, default: 0 },
    description: { type: String }
});

// Ayudante para renombrar _id a id para compatibilidad con frontend
ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Product', ProductSchema);
