const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
const { User } = require('../models/user');
const { Area } = require('../models/area');
// require('../helper/cache');

mongoose.set('useCreateIndex', true);

async function createAdminUser() {
    console.log("createAdminUser");
    let adminUser = await User.findOne({ is_admin: true });
    if (adminUser) {
        console.log("Admin user already exists");
        return;
    }

    //MUST CHANGE PASSWORD AFTER CREATING ADMIN
    user = new User({
        name: 'Admin',
        email: 'kazunori.hayashi.nz@outlook.com',
        verified: true,
        password: 'P@ss1234!!',
        is_admin: true,
        profile: { user_type: 'Personal' }
    });
    await user.save();
    console.log("Admin user created");
}

async function seed() {
    await seedArea();
}

async function seedArea() {
    const areaData = require('./seed/area');
    for (area of areaData) {
        await Area.findOneAndUpdate(
            { name: area.name },
            {
                name: area.name,
                location: {
                    type: 'Polygon',
                    coordinates: area.location
                }
            },
            { upsert: true, new:true })
    }
}

module.exports = function () {
    const dbConnection = config.get('db');
    console.log(dbConnection);
    mongoose.connect(dbConnection, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        // seed();

        // const message = `Connected to ${dbConnection}...`;
        // winston.info(message);
        // console.log(message);

        // createAdminUser();
    })
}