const express = require('express');
const app = express();
const path = require('path');

// route for homepage
app.get('/*', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/index.html')));

// route for /notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html')));

module.exports = app;
