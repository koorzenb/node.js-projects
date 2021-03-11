const myMsg = require("./notes.js");
const yargs = require("yargs");
const chalk = require("chalk");

yargs.version("1.0.1");

yargs.command({
    command: "add",
    describe: "add a new note",
    handler: function add() {
        console.log("this is handler working");
    }
})
console.log(yargs.argv);
