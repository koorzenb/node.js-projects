const request = require("request");

const url = "http://api.weatherstack.com/current?access_key=46b4fee95857bb2faae8cc4dfe85d8d7&query=-33.8648,%2018.6319";

request({url, json: true}, (error,response) => {
    // console.log(response.body.current);  
    console.log(`It is currently ${response.body.current.temperature}, but it feels like ${response.body.current.feelslike} degrees`);
})