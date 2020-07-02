const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    details: [{
        color: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    gender: { type: String, enum: ['Male', 'Female', 'All'], required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: [String],
    state: { type: String, enum: ['active', 'hidden'], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

productSchema.index({ name: 1, category: 1 });

module.exports = mongoose.model('products', productSchema);