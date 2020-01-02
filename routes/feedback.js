const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

const { Feedback, validate } = require('../models/feedback');
const { getJwtFromRequest } = require('../helper/cookieManager');

const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let feedback = new Feedback(req.body);
    let jwtToken = getJwtFromRequest(req);
    if(jwtToken){
        let decodedToken = jwt.verify(jwtToken, config.get('jwtPrivateKey'));
        if(decodedToken){
            feedback._userId = decodedToken._id;
        }
    }

    try {
        await feedback.save();
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something wrong');
    }

    //Send email here if you want
    feedback.sendFeedback();

    res.status(201).send(feedback);
})

module.exports = router; 
