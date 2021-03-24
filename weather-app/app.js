const request = require("request");
const geocode = require("./utils/geocode")

geocode("Durbanville", (error, data) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Data = ", data);
    }
})