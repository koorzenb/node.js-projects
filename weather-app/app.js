const request = require("request");

// const url = "http://api.weatherstack.com/current?access_key=46b4fee95857bb2faae8cc4dfe85d8d7&query=-33.8648,%2018.6319";

// request({url, json: true}, (error,response) => {
//     // console.log(response.body.current);  
//     console.log(`It is currently ${response.body.current.temperature}, but it feels like ${response.body.current.feelslike} degrees`);
// })

const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/Durbanville.json?access_token=pk.eyJ1Ijoia29vcnplbmIiLCJhIjoiY2ttZTkzbXJ4MHBjOTJ1bnYxbXZtbGM2MCJ9.rmK2Q7C8klPmJ0wzY8pe_A";
request({url: url2, json: true}, (error,response) => {
    // console.log(response);  //.features.center IncomingMessage {

    if(error) {
        console.log("Unable to connect to internet");
    } else if (response.body.features.length == 0) {
        console.log("This location does not exist");
    } else {
        const latitude = response.body.features[0].center[0];
        const longtitude = response.body.features[0].center[1];
        console.log(latitude, longtitude);    
    }
})