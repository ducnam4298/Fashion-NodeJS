const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    name: {
        type: String,
        required:true,
        validate: {
            validator: (v) => {
                return /^[a-z A-Z]*$/.test(v);
            },
            message: props => `${props.value}is not a valid name`
        }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

colorSchema.index({name: 1 });

module.exports = mongoose.model('colors', colorSchema);