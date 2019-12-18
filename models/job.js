const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const { PointSchema } = require('./commonSchema');
const BaseDataModelSchema = require('./baseDataModelSchema');


const JobSchema = new BaseDataModelSchema({
    user: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        index: true,
        ref: 'users'
    },
    title: {
        type: String, required: true, maxlength: 100
    },
    details: { 
        type: String,
        maxLength: 10000,
        required: true
    },
    tags: [
        {
            type: String,
            index: true
        },
    ],
    area: {
        type: Schema.Types.ObjectId,
        ref: 'areas',
        index: true,
    },
    englishLevel: {
        type: String,
        index: true,
    },
    jobCategory: { 
        type: String,
        index: true,
     },
    workType: {
        type: String,
        index: true,
    },
    address: {
        type: String,
    },
    location: PointSchema
});

JobSchema.pre('save', async function (next) {
    this.updated_at = Date.now;
    return next();
})

JobSchema.index({location : '2dsphere'});

module.exports.Job = mongoose.model('jobs', JobSchema);

module.exports.validate = job => {
    const schema = Joi.object({
        user: Joi.objectId(),
        area: Joi.objectId(),
        title: Joi.string().max(100).required(),
        details: Joi.string().max(10000).required(),
        tags: Joi.array().items(Joi.string()),
        englishLevel: Joi.string().optional(),
        jobCategory: Joi.string().optional(),
        workType: Joi.string().optional(),
        address: Joi.string().optional(),
        location: Joi.object().optional().allow(null),
    })

    return schema.validate(job);
}

module.exports.validateUpdate = job => {
    const schema = Joi.object({
        user: Joi.objectId(),
        area: Joi.objectId(),
        title: Joi.string().min(1).max(100),
        details: Joi.string().min(1).max(10000),
        tags: Joi.array().items(Joi.string()),
        englishLevel: Joi.string().optional(),
        jobCategory: Joi.string().optional(),
        workType: Joi.string().optional(),
        address: Joi.string().optional(),
        is_active: Joi.boolean().optional(),
        location: Joi.object().optional().allow(null),
    })

    return schema.validate(job);
}