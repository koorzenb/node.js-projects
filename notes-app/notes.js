const fs = require('fs');
const chalk = require("chalk");

function getNotes() {
    const notes = [];
}

function addNote(title, body, file) {
   const notes = loadNotes(file); 
   const duplicateNotes = notes.filter( note => {return title === note.title} ); 
   
   if (duplicateNotes.length !== 0) {
       console.log(chalk.red.inverse("Duplicate title - use another!"));
    } else {
        notes.push({
            title,
            body
        });
        saveNotes(notes, file);
        console.log(chalk.blue("Success - note added"));
   }
}

function removeNote(title, file){
    const notes = loadNotes(file); 
    let index;
    const filteredNotes = notes.filter( note => {
        return title !== note.title;
    }); 
    
    if (notes.length === filteredNotes.length) {
        console.log(chalk.red.inverse("No notes were removed - check again"));
     } else {
         saveNotes(filteredNotes, file);
         console.log(chalk.blue("Success - note removed"));
    }
}

const saveNotes = (notes, file) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync(file, notesJSON);
}

function loadNotes(file) {
    try {
        const dataBuffer = fs.readFileSync(file);
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
        return data; 
    } catch (error) {
        return [];
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote
}