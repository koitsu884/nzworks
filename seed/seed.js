const mongoose = require('mongoose');
const config = require('config');

const { createAdminUser } = require('./seedUser');
const { seedArea } = require('./seedArea');

const dbConnection = config.get('db');
console.log(dbConnection);

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(async (err, client) => {
    await createAdminUser();
    console.log("Initializing areas..");
    await seedArea();
    mongoose.connection.close();
    console.log('All done');
})

