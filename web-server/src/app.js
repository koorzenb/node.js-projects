const path = require('path');
const express = require('express');
const app = express();

const publicDirPath = path.join(__dirname, "../public");
app.set('view engine', 'hbs');

app.use(express.static(publicDirPath));
 
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: "BarendK"
    });    // uses hbs - set above in app.set - to convert template to html
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: "Help is here"
    }); 
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: "Koos Kombuis"
    }); 
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
