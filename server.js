/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Jaspriya Kaur
Student ID: 156757221
Date: 07/02/2025
Vercel Web App URL: 
GitHub Repository URL: 

********************************************************************************/ 

const express = require('express');
const path = require('path');
const storeService = require('./store-service');

const app = express();
const port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

// Adding routes to interact with store-service.js

app.get('/shop', (req, res) => {
  storeService.getPublishedItems()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err }));
});

app.get('/items', (req, res) => {
  storeService.getAllItems()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err }));
});

app.get('/categories', (req, res) => {
  storeService.getCategories()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err }));
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

storeService.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express http server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error(`Failed to initialize store service: ${err}`);
});

module.exports = app;