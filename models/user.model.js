const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /^[0-9]{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone`
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Quản trị viên', 'Chủ đầu tư', 'Quản lí', 'Nhân Viên', 'Khách hàng mới', 'Khách hàng thân thiết'],
        required: true
    },
    state: { type: String, enum: ['active', 'hidden'], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

userSchema.index({ name: 1, phone: 1, role: 1 });

module.exports = mongoose.model('users', userSchema);