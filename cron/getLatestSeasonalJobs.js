const mongoose = require('mongoose');
const config = require('config');
const request = require('request');
const parseStringPromise = require('xml2js').parseStringPromise;

const { LatestFeed } = require('../models/seasonalJob');


// require('../helper/cache');

function connectDB() {
    const dbConnection = config.get('db');
    console.log(dbConnection);
    return mongoose.connect(dbConnection, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}

function requestJobFeed() {
    return new Promise(function (resolve, reject) {
        request('https://www.backpackerboard.co.nz/jobs-feed.xml', function (error, response, body) {
            if (error) {
                console.log(error);
                reject(error);
            }
            else {
                parseStringPromise(body)
                    .then(async result => {
                        let latestJobs = [];
                        for (let i = 0; i < 10; i++) {
                            let jobDetail = result.source.job[i];
                            latestJobs.push({
                                title: jobDetail.title[0],
                                date: jobDetail.date[0],
                                url: jobDetail.url[0],
                                city: jobDetail.city[0],
                                description: jobDetail.description[0],
                                salary: jobDetail.salary[0],
                                category: jobDetail.category[0],
                            });
                        }
                        latestFeed = new LatestFeed({ jobList: latestJobs });
                        await latestFeed.save();
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        });
    })
}

async function execute() {
    console.log("Running crontask - getLatestSeasonalJobs");
    try {
        await connectDB();
        await requestJobFeed();
        mongoose.connection.close();
        console.log('cron job finished');
    }
    catch (error) {
        console.log('connection failed');
        console.log(error);
    }
}

execute();