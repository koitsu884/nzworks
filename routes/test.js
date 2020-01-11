const express = require('express');
var request = require('request');
const fs = require('fs');
const router = express.Router();

const { LatestFeed } = require('../models/seasonalJob');

const parseStringPromise = require('xml2js').parseStringPromise;

router.get('/readrss', async (req, res) => {
    const file = fs.createWriteStream("feed.xml");

    request('https://www.backpackerboard.co.nz/jobs-feed.xml', async (error, response, body) => {
        if (error) { 
            console.log(error);
            return res.status(500).send("Something went wrong")
        }

        parseStringPromise(body)
            .then(result => {
                // console.log(result);
                let latestJobs = [];
                for( let i=0; i<10; i++){
                    let jobDetail = result.source.job[i];
                    console.log(jobDetail);
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
                latestFeed = new LatestFeed({jobList: latestJobs});
                latestFeed.save()
                    .then(result => {
                        res.send(result);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).send("Something went wrong");
                    })

            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Something went wrong');
            });
    })
    
    // var request = https.get('https://www.backpackerboard.co.nz/jobs-feed.xml', res => {
    //     var data = '';
    //     res.on('data', function (chunk) {
    //         data += chunk;
    //     });
    //     res.on('end', function () {
    //         // console.log(data);
    
    //     });

    // res.pipe(file);
        // file.on('finish', async () => {
        //     console.log(file);
        //     let feed = await parseString(file);
        //     console.log(feed);
        //     file.close();
        //     res.send('OK');
        // })
    // })

});

module.exports = router; 
