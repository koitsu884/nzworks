const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { PolygonSchema } = require('./commonSchema');

AreaSchema = new Schema({
    name:{ 
        type: String, 
        required: true,
        unique: true,
        index: true
    },
    location: PolygonSchema
});

AreaSchema.index({location : '2dsphere'});

module.exports.Area = mongoose.model('areas', AreaSchema);