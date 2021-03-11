const myMsg = require("./notes.js");
const yargs = require("yargs");
const chalk = require("chalk");

yargs.version("1.0.1");

// command line : 
//   node app.js add --title="To buy" --body="Carrots Cabbage" 

yargs.command({
    command: "add",
    describe: "add a new note",
    builder: {
        title: {
            describe: "Adding a note",
            demandOption: true,
            type: "string"
        },
        body : {
            describe: "This is body",
            demandOption: true,
            type: "string"
        }
    },
    handler: function add(argv) {
        console.log("Title: " + argv.title);
        console.log("Body: " + argv.body);
    }
})

yargs.parse();