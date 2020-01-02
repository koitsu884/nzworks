const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const { sendFeedback } = require('../utils/mailer');


FeedbackSchema = new Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' },
    title:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: { type: Date, required: true, default: Date.now, expires: 3600 }
});

FeedbackSchema.methods.sendFeedback = async function () {
    try {
        sendFeedback(this.name, this.email, this.title, this.message);
    }
    catch (errors) {
        console.log(JSON.stringify(errors));
    }
}

module.exports.Feedback = mongoose.model('feedback', FeedbackSchema);

module.exports.validate = feedback => {
    const schema = Joi.object({
        _userId: Joi.objectId().optional(),
        title: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        message: Joi.string().required()
    })

    return schema.validate(feedback);
}