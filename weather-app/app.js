const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast");
const chalk = require("chalk");


const address = process.argv[2]; 

if(!address) {
  console.log("please provide address");
} else {

  geocode(address, (error, data) => {
    if(error) {
      return console.log(error);
    }
    forecast(data.latitude, data.longtitude, (error, forecastData) => {
      if(error) {
        return console.log(chalk.red.inverse('Error', error))
      }
      
          console.log(data.location);
          console.log(forecastData);
        })
      
  })

}

