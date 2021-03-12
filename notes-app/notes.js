const fs = require('fs');
const chalk = require("chalk");

const addNote = (title, body, file) => {
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

const removeNote = (title, file) => {
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

const loadNotes = file => {
    try {
        const dataBuffer = fs.readFileSync(file);
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
        return data; 
    } catch (error) {
        return [];
    }
}

const readNote = (title, file) => {
    const notes = loadNotes(file); 
    const note = notes.find( note => title === note.title);
    
    if(note) {
        console.log(" ");
        console.log(chalk.bold(note.title));
        console.log("  " + chalk.grey(note.body));
    } else {
        console.log(chalk.red.inverse("No such title"));
    }

}

const listNotes = (file) => {
    const notes = loadNotes(file); 

    notes.forEach(note => {
        console.log(" ");
        console.log(chalk.bold(note.title));
        console.log("  " + chalk.grey(note.body));
    });
}

module.exports = {
    addNote,
    removeNote,
    readNote,
    listNotes
}