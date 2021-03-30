const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast");
const chalk = require("chalk");

geocode("Durbanville", (error, data) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Data = ", data);
    }
})

forecast(-33.867, 18.633, (error, data) => {
  if(error) {
    console.log(chalk.red.inverse('Error', error))
  }
    console.log('Data', data)
  })