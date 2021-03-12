const notes = require("./notes.js");
const yargs = require("yargs");
const chalk = require("chalk");

yargs.version("1.0.1");

// command line : 
//   node app.js add --title="To buy" --body="Carrots Cabbage" 

const file = 'notes.json';

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
    handler: argv => notes.addNote(argv.title, argv.body, file)
})

yargs.command({
    command: "remove",
    describe: "remove a new note",
    builder: {
        title: {
            describe: "Remove a note",
            demandOption: true,
            type: "string"
        }
    },
    handler: argv => notes.removeNote(argv.title, file)
})

yargs.command({
    command: "list",
    describe: "list items",
    builder: {
        title: {
            describe: "List all items"
        }
    },
    handler: () => notes.listNotes(file)
})

yargs.command({
    command: "read",
    describe: "Read an item",
    builder: {
        title: {
            describe: "Read an item",
            demandOption: true,
            type: "string"
        }
    },
    handler: argv => notes.readNote(argv.title, file)
})

yargs.parse();