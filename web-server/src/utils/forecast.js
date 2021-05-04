
const request = require("request");

const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=46b4fee95857bb2faae8cc4dfe85d8d7&query=${latitude},${longtitude}`;
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Could not find server");
        } else if (body.error) {
            callback("Location does not exist");
        } else {            
            callback(undefined, `${body.current.weather_descriptions}: Feels like ${body.current.feelslike}`);
        }
    });
}

module.exports = forecast;