const app = require('./app');

const port = process.env.PORT || 5000;
const server = app.listen(port, () => 
{
    const message = `Listening on port ${port}...`;
    console.log(message);
});

module.exports = server;

