const express = require('express');
const app = express();
app.use(express.json());
const artistControllers = require('./controllers/artists');

app.get('/artists', artistControllers.list);
app.post('/artists', artistControllers.create);
app.get('/artists/:id', artistControllers.getArtistById);
app.patch('/artists/:id', artistControllers.updateArtist);


module.exports = app;