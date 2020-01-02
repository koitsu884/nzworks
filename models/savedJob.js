const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ImageSchema } = require('./commonSchema');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.JOBSTATUS_DEFAULT = '';
module.exports.JOBSTATUS_REMOVED = 'removed';
module.exports.JOBSTATUS_INACTIVE = 'inactive';

const SavedJobSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        index: true,
        ref: 'users'
    },
    job: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        index: true,
        ref: 'jobs'
    },
    applied:{
        type: Boolean,
        default: false
    },
    jobTitle:{
        type: String,
    },
    employerName:{
        type: String,
    },
    employerImage: {
        type: ImageSchema
    },
    areaName: {
        type: String
    },
    jobCategory: {
        type: String
    },
    jobStatus:{
        type: String,
        default: ''
    },
    applied_at: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

SavedJobSchema.index({"user": 1, "job": 1}, {unique: true});

module.exports.SavedJob = mongoose.model('saved_job', SavedJobSchema);

module.exports.validate = job => {
    const schema = Joi.object({
        user: Joi.objectId().required(),
        job: Joi.objectId().required(),
        applied: Joi.boolean(),
        jobStatus: Joi.string(),
        applied_at: Joi.date().optional().allow(null),
    })

    return schema.validate(job);
}