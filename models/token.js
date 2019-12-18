const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

TokenSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    token: { 
        type: String, 
        default: crypto.randomBytes(16).toString('hex')
    },
    type: { type: String, required: true},
    createdAt: { type: Date, required: true, default: Date.now, expires: 3600 }
});

module.exports.Token = mongoose.model('tokens', TokenSchema);
module.exports.TOKEN_TYPE_VERIFY = 'verification';
module.exports.TOKEN_TYPE_PASSWORD = 'password';