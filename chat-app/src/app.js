const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars egeni and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));
 
app.get('', (req,res) => {
    res.render('index', {
        title: 'Chat App',
        name: "BarendK"
    });    // uses hbs - set above in app.set - to convert template to html
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: "Help is here",
        name: "Piet Pompies"
    }); 
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: "Koos Kombuis"
    }); 
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "Help topic not found"
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
})

app.get('*', (req,res) => {
    res.render('404', {
        title: "Page not found"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
