const mongoose = require('mongoose');
const Schema = mongoose.Schema;

SeasonalJobSchema = new Schema({
    title:{
        type: String,
    },
    date: {
        type: Date,
    },
    url:{
        type: String,
    },
    city: {
        type: String
    },
    description: {
        type: String
    },
    salary: {
        type: String
    },
    category: {
        type: String
    },
    createdAt: { type: Date, required: true, default: Date.now, expires: 3600 }
}, {_id: false});

LatestFeedSchema  = new Schema({
    jobList: [{
        type: SeasonalJobSchema
    }],
    createdAt: { type: Date, required: true, default: Date.now, expires: 3600 }
})

module.exports.LatestFeed = mongoose.model('latestfeed', LatestFeedSchema);
