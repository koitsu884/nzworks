const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const { ImageSchema } = require('./commonSchema');

ThreadCommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'users'
    },
    comment: {
        type: String,
        maxLength: 1000,
        required: true
    },

    created_at: {type: Date, default: Date.now}
});

ThreadSchema  = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'users'
    },
    title:{
        type: String,
        required: true,
        maxLength: 100
    },
    mainImage: {
        type: ImageSchema
    },
    details: {
        type: String,
        maxLength: 5000,
        required: true
    },
    comments: {
        type: [{
            type: ThreadCommentSchema
        }],
    },
    created_at: { type: Date, required: true, default: Date.now, expires: 60 * 60 * 24 * 7}
})

module.exports.Thread = mongoose.model('thread', ThreadSchema);

module.exports.validate = thread => {
    const schema = Joi.object({
        user: Joi.objectId(),
        title: Joi.string().max(100).required(),
        mainImage: Joi.object().optional(),
        details: Joi.string().max(5000).required(),
        comments: Joi.array().items(Joi.object()),
    })

    return schema.validate(thread);
}

module.exports.validateUpdate = thread => {
    const schema = Joi.object({
        user: Joi.objectId(),
        title: Joi.string().max(100).optional(),
        mainImage: Joi.object().optional(),
        details: Joi.string().max(5000).optional(),
        comments: Joi.array().items(Joi.object()),
    })

    return schema.validate(thread);
}

module.exports.validateComment = threadComment => {
    const schema = Joi.object({
        user: Joi.objectId(),
        comment: Joi.string().max(1000).required()
    })

    return schema.validate(threadComment);
}