const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: { type: String, required: true },
    transporter_id: { type: String, required: true },
    product: [{
        name: { type: String },
        size: { type: String },
        color: { type: String },
        quantity: { type: Number }
    }],
    total_price: { type: Number, required: true },
    status: { type: String, enum: ['Đang xử lý', 'Đang giao hàng', 'Đã giao hàng', 'Hoàn trả'], required: true },
    state: { type: String, enum: ['active', 'hidden'], required: true },
    description: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

orderSchema.index({ _id: 1, created_at: 1, updated_at: 1, status: 1 });

module.exports = mongoose.model('orders', orderSchema);