
const { Area } = require('../models/area');

module.exports.seedArea = async function () {
    const areaData = require('./initialData/area');
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