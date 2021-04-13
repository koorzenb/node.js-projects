const path = require('path');
const express = require('express');
const app = express();

const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));
 
app.get('/help', (req,res) => {
    res.send(path.join(__dirname, `../public/help.html`));
})

app.get('/about', (req,res) => {
    res.send(path.join(__dirname, `../public/about.html`));
})

app.get('/weather', (req,res) => {
    res.send({
        forecast: "mild",
        location: "Durbanville"
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3ooo');
})
