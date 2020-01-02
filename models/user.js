const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { sendEmailVerification, sendPasswordResetLink } = require('../utils/mailer');
const { Token, TOKEN_TYPE_PASSWORD, TOKEN_TYPE_VERIFY } = require('../models/token');
const { RefreshToken } = require('../models/refreshToken');
const BaseDataModelSchema = require('./baseDataModelSchema');
const { ProfileSchema, BusinessProfile, PersonalProfile } = require('./profile');
const { Job } = require('./job');


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
});

userSchema.pre('remove', async function (next) {
    await Job.deleteMany({ user: this._id });
    return next();
})

/*======================================================
// User methods
=======================================================*/
// const JWT_LIMIT = 5; //seconds
const JWT_LIMIT = 15 * 60; //seconds
// const REFRESH_LIMIT = 20;
const REFRESH_LIMIT = 30 * 24 * 60 * 60;

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name }, config.get('jwtPrivateKey'), { expiresIn: JWT_LIMIT});
    return token;
}

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateRefreshToken = async function () {
    const token = jwt.sign({ _id: this._id}, config.get('refreshTokenSecret'), { expiresIn: REFRESH_LIMIT });
    // const expired = +new Date() + 30 * 24 * 60 * 60 * 1000;
    let refreshToken = await RefreshToken.findOneAndUpdate(
        { _userId: this._id },
        { token: token },
        { upsert: true, new:true }
    )
    await refreshToken.save();
    return refreshToken.token;
}

userSchema.methods.sendPasswordResetEmail = async function () {
    await Token.deleteOne({ _userId: this._id, type: TOKEN_TYPE_PASSWORD });

    let token = new Token({
        _userId: this._id,
        type: TOKEN_TYPE_PASSWORD,
        token: crypto.randomBytes(16).toString('hex')
    });
    await token.save();

    var link = config.get('clientUrl') + "auth/resetpassword/" + token.token;

    try {
        await sendPasswordResetLink(this.email, this.name, link)
        console.log("Email sent");
    }
    catch (errors) {
        console.log(JSON.stringify(errors));
    }
}

userSchema.methods.sendVerifyEmail = async function () {
    await Token.deleteOne({ _userId: this._id, type: TOKEN_TYPE_VERIFY });

    let token = new Token({
        _userId: this._id,
        type: TOKEN_TYPE_VERIFY,
        token: crypto.randomBytes(16).toString('hex')
    });
    await token.save();

    var link = config.get('clientUrl') + "auth/verifyemail/" + token.token;

    try {
        await sendEmailVerification(this.email, this.name, link)
        console.log("Email sent");
    }
    catch (errors) {
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