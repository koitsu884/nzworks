const faker = require("faker");
faker.locale = "ja";
const mongoose = require('mongoose');
const config = require('config');

const { Job } = require('../models/job');
const { Area } = require('../models/area');
const { User } = require('../models/user');

const {jobCategories, workTypes, englishLevels, tagNames} = require('./jobFilterValues');

let recordNum = 100;

const dbConnection = config.get('db');
console.log(dbConnection);

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(async (err, client) => {
    // let user = new User({
    //     email: faker.internet.email(),
    //     password: 'Test@123!!',
    //     name: faker.internet.userName(),
    //     profile: { user_type: 'Business' }
    // });
    // await user.save();
    let user;

    let areas = await Area.find({});

    let jobs = [];

    for( let i = 0 ; i < recordNum; i++){
        if(i % 5 === 0){
            user = new User({
                email: faker.internet.email(),
                password: 'Test@123!!',
                name: faker.internet.userName(),
                verified: true,
                profile: { user_type: 'Business' }
            });
            await user.save();
        }
        let area = faker.random.arrayElement(areas);
        let workType = faker.random.arrayElement(workTypes);
        let jobCategory = faker.random.arrayElement(jobCategories);
        let englishLevel = faker.random.arrayElement(englishLevels);
        let tags = [];
        for( let j = 0; j < tagNames.length; j++){
            let tagName = faker.random.arrayElement(tagNames);
            if(!tags.includes(tagName)){
                tags.push(tagName);
            }
        }
        // console.log(area);
        let newJob = {
            user: user._id,
            area: area._id,
            email: user.email,
            title: faker.lorem.words(3),
            details: faker.lorem.paragraphs(3),
            workType: workType,
            jobCategory: jobCategory,
            englishLevel: englishLevel,
            tags: tags
        }
        jobs.push(newJob);
    }

    await Job.insertMany(jobs);

    mongoose.connection.close();
    console.log('All done');
})

