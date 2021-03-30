const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia29vcnplbmIiLCJhIjoiY2ttZTkzbXJ4MHBjOTJ1bnYxbXZtbGM2MCJ9.rmK2Q7C8klPmJ0wzY8pe_A`;
    request({url, json: true}, (error, response) => {
        if(error) {
            callback("Unable to connect");
        } else if (response.body.features.length == 0) {
            callback("Not valid location");
        } else {
            const latitude = response.body.features[0].center[0];
            const longtitude = response.body.features[0].center[1];
            callback(undefined, {latitude, longtitude})
        }
    })
}

module.exports = geocode;