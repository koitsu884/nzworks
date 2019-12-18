const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

const { sendEmailVerification } = require('../utils/mailer');
const { Token, TOKEN_TYPE_PASSWORD, TOKEN_TYPE_VERIFY } = require('../models/token');
const BaseDataModelSchema = require('./baseDataModelSchema');
const { ProfileSchema, BusinessProfile, PersonalProfile } = require('./profile');


const userSchema = new BaseDataModelSchema({
    is_admin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    provider: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        // required: true,
        select: false,
        minlength: 6
    },
    name: {
        type: String,
        maxlength: 50
    },
    profile: ProfileSchema
});

userSchema.path('profile').discriminator('Business', BusinessProfile)
userSchema.path('profile').discriminator('Personal', PersonalProfile)

/*======================================================
// User pre hooks
=======================================================*/
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
})

/*======================================================
// User methods
=======================================================*/
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name }, config.get('jwtPrivateKey'));
    return token;
}

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.sendVerifyEmail = async function () {
    await Token.deleteOne({_userId: this._id});

    let token = new Token({
        _userId: this._id,
        type: TOKEN_TYPE_VERIFY
    });
    await token.save();

    var link = config.get('clientUrl') + "auth/verifyemail/" + token.token;

    try{
        await sendEmailVerification(this.email, this.name, link)
        console.log("Email sent");
    } 
    catch(errors)
    {
        console.log(JSON.stringify(errors));
    }
}

module.exports.User = mongoose.model('users', userSchema);

module.exports.validate = user => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        name: Joi.string().min(2).max(50).required(),
        profile: Joi.object().required(),
    })

    return schema.validate(user);
}