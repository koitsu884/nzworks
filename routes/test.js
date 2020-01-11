const express = require('express');
var https = require('https');
var request = require('request');
const fs = require('fs');
const router = express.Router();

const parseStringPromise = require('xml2js').parseStringPromise;

router.get('/readrss', async (req, res) => {
    const file = fs.createWriteStream("feed.xml");

    request('https://www.backpackerboard.co.nz/jobs-feed.xml', async (error, response, body) => {
        if (error) { 
            console.log(error);
            return res.status(500).send("Something went wrong")
        }
        // console.log(body);
        // console.log(response);
        parseStringPromise(body)
            .then(result => {
                // console.log(result);
                let latestJobs = [];
                for( let i=0; i<10; i++){
                    let jobDetail = result.source.job[i];
                    console.log(jobDetail);
                    // latestJobs.push({
                    //     title: 
                    // })
                }
                res.send('OK');
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
