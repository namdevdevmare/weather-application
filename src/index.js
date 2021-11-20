const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

// Define path for express config 
const mainDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and config views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setting up global static path to serve
app.use(express.static(mainDirectory));

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Welcome to Weather application'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        'location': 'Padharpur',
        'forecast': 'Less rain expected'
    });
});

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        'title': 'Help',
        'text': 'Help page text'
    });
});

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        res.send({
            error: 'Please provide address..!'
        });
        return;
    }

    geocode(req.query.address, (error, { lat, long, location } = {} ) => {
        if (error) {
            return  res.send({
                error
            });
        }

        forecast(lat, long, (error, forecastResponse) => {
            if (error) {
                return  res.send({
                    error
                });
            }
            
            res.send({
                 forecast: forecastResponse,
                 location,
                 address: req.query.address   
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('help.hbs', {
        'title': 'Help article',
        'text': 'Looking help not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404-page.hbs', {
        'title': 'My 404 page',
        'text': 'Looking page is not found'
    });
});


app.listen(3000, () => {
    console.log('Server listing at port 3000');
});

