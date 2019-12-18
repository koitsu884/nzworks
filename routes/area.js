const express = require('express');
const { Area } = require('../models/area');
const router = express.Router();

router.get('/', async (req, res) => {
    let areaList = await Area.find({});
    res.send(areaList);
});

module.exports = router; 