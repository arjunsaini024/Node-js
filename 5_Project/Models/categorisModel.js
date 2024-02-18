const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 }
});

const Category = mongoose.model('Category', categorySchema);

function validateData(category) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(category, schema);
}

exports.Category = Category
exports.categorySchema = categorySchema
exports.validate = validateData