const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const { ImageSchema, PointSchema } = require('./commonSchema');

module.exports.ProfileSchema = new Schema({
    avatar: { 
        type: ImageSchema
    },
    images: [
        {
            type: ImageSchema
        }
    ],
    phone: {
        type: String,
        default: '',
        maxlength: 20
    },
    introduction: {
        type: String,
        default: '',
        maxlength: 1000
    },
    user_type: {
        type: String,
        required: true,
        index: true,
    }
}, {
    discriminatorKey: 'user_type',
    _id: false,
    require: true
})

module.exports.BusinessProfile = new Schema ({
    companyWebsite: {
        type: String,
        maxLength: 200,
        default: ''
    },
    address: {
        type: String,
        maxLength: 200,
        default: ''
    },
    location: PointSchema
} , { _id: false });

module.exports.PersonalProfile = new Schema ({
    savedFilters: [{
        type: String
    }],
    savedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'jobs'
    }],
    appliedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'jobs'
    }],
} , { _id: false });

module.exports.validate = profile => {
    const schema = Joi.object({
        user_type: Joi.string(),
        avatar: Joi.object().optional(),
        images: Joi.array().items(Joi.object()).optional(),
        phone: Joi.string().max(20).allow('').optional(),
        introduction: Joi.string().allow('').max(1000),
        companyImages: Joi.object(),
        companyWebsite: Joi.string().max(200).allow('').optional(),
        address: Joi.string().max(200).allow('').optional(),
        location: Joi.object().allow(null).optional(),
        savedFilter: Joi.object(),
        savedJobs: Joi.array().items(Joi.objectId()).optional(),
        appliedJobs: Joi.array().items(Joi.objectId()).optional(),
    })

    return schema.validate(profile);
}