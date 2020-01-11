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

async function saveLatestDataToDB(data) {
    parseStringPromise(data)
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
            console.log(latestJobs);
            latestFeed = new LatestFeed({ jobList: latestJobs });
            await latestFeed.save();
        })
        .catch(error => {
            throw error;
        });

}

function execute() {
    console.log("Running crontask - getLatestSeasonalJobs");
    connectDB().then(() => {
        request('https://www.backpackerboard.co.nz/jobs-feed.xml', async (error, response, body) => {
            if (error) {
                console.log(error);
            }
            else {
                try{
                    await saveLatestDataToDB(body);
                    mongoose.connection.close();
                }
                catch(error){
                    console.log(error);
                    mongoose.connection.close();
                }
                console.log('Cron job finished');
            }
        });
    })
    .catch(error => {
        console.log('connection failed');
        console.log(error);
    })
}

execute();