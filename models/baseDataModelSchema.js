const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = class BaseDataModelSchema extends Schema {
    constructor(obj, options){
        super(obj, options);
        this.add({ 
            created_at: {
                type: Date,
                default: Date.now
            },
            updated_at: {
                type: Date,
                default: Date.now
            },
            is_active: {
                type: Boolean,
                default: true
            }
        })
    }
}