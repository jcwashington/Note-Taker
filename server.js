const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// custom middleware for api and html routes
const apiRoutes = require('./routes/apiRoutes');
app.use(apiRoutes);
const htmlRoutes = require('./routes/htmlRoutes');
app.use(htmlRoutes);

// server listener
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));