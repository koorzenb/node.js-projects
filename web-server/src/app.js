const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast");

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
        title: 'Weather App',
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

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error) {
            return res.send({
                error: 'You must provide an address'
            });
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            
          if(error) {
            return res.send({error});
          }

          res.send({
              forecast: forecastData,
              location,
              address: req.query.address
          });      
        })
      })

})

app.get('*', (req,res) => {
    res.render('404', {
        title: "Page not found"
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3ooo');
})
