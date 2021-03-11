const fs = require("fs");

//Read data
const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);
console.log(user.name);

//change values
user.name = "barend"
user.age = "43"

//write data
const userJSON = JSON.stringify(user);
fs.writeFileSync('1-json.json', userJSON);
