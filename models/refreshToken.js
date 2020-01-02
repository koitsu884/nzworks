const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const crypto = require('crypto');

RefreshTokenSchema = new Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        index: true,
        unique: true,
        ref: 'users' },
    token: { 
        type: String, 
        required: true,
        index: true,
        unique: true
    }
});

module.exports.RefreshToken = mongoose.model('refresh_tokens', RefreshTokenSchema);