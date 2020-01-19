var Twitter = require('twitter');
const config = require('config');
const request = require('request');

var client = process.env.NODE_ENV === 'production' 
? new Twitter({
    consumer_key:  config.get('twitterConsumerKey'),
    consumer_secret:  config.get('twitterConsumerSecret'),
    access_token_key:  config.get('twitterAccessTokenKey'),
    access_token_secret:  config.get('twitterAccessTokenSecret')
})
:new Twitter({
    consumer_key:  config.get('twitterConsumerKey'),
    consumer_secret:  config.get('twitterConsumerSecret'),
    access_token_key:  config.get('twitterAccessTokenKey'),
    access_token_secret:  config.get('twitterAccessTokenSecret')
})
    // rest_base: 'https://ads-api-sandbox.twitter.com', //Doesn't work...

module.exports.postTweet = async function(status, mediaIds=null){
    if (process.env.NODE_ENV !== 'production') return null;

    try{
        const res = await client.post('statuses/update', {status: status, media_ids: mediaIds});
        return res.text;
    }
    catch(error){
        console.log(error);
    }
}

module.exports.postImage = async function(imageString) {
    if (process.env.NODE_ENV !== 'production') return null;

    try {
        const res = await client.post('media/upload', {
            media_data: imageString
        })
        return res.media_id_string;
    } catch(error){
        console.log(error);
    }
}

module.exports.postImageFromUrl = async function(imageUrl){
    return new Promise((resolve, reject) => {
        request.get({ url: imageUrl, encoding: null }, async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                try{
                    const res = await client.post('media/upload', {
                        media_data: new Buffer.from(body).toString('base64')
                    })
                    resolve( res.media_id_string);
                }
                catch( error){
                    reject(error)
                }
            }
            else {
                reject(error);
            }
        });
    })
}