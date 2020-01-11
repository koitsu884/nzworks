const express = require('express');
const { LatestFeed } = require('../models/seasonalJob');

const router = express.Router();

router.get('/', async (req, res) => {
    let query = LatestFeed.find();

    if (req.query.limit) {
        query = query.limit(+req.query.limit);
    }
    let feeds = await query.sort({ _id: -1 });

    res.send(feeds);
});

module.exports = router; 
