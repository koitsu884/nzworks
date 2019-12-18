const inside = require('point-in-polygon');

const getAreaFromLocation = (areaList, location) => {
    let areaFound = null;
    let point = [location.lng, location.lat];

    for(let area of areaList){
        let polygon = area.location.coordinates[0];
        if( inside(point, polygon)){
            areaFound = area;
            break;
        }
    }

    return areaFound;
}

export default getAreaFromLocation;