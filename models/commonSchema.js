const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.ImageSchema = new Schema({
    image_id: {
        type: String
    },
    image_url: {
        type: String
    }
}, { _id: false });

module.exports.PolygonSchema = new Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers
        required: true
    }
}, {_id: false});

module.exports.PointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, {_id: false});