const express = require('express');
const app = express();
app.use(express.json());
const artistControllers = require('./controllers/artists');
const artist = require('./models/artist');
const albumControllers = require('./controllers/albums');
const album = require('./models/album');
const songControllers = require('./controllers/songs');
const song = require('./models/song');


// ARTISTS
app.get('/artists', artistControllers.list);
app.post('/artists', artistControllers.create);
app.get('/artists/:id', artistControllers.getArtistById);
app.patch('/artists/:id', artistControllers.updateArtist);
app.delete('/artists/:id', artistControllers.deleteArtist);

// ALBUMS
app.post('/artists/:artistId/albums', albumControllers.createAlbum);
app.get('/albums', albumControllers.getAlbums);
app.get('/albums/:albumId/', albumControllers.getAlbumById);
app.patch('/albums/:albumId/', albumControllers.updateAlbum);
app.delete('/albums/:albumId', albumControllers.deleteAlbum);

//SONGS
app.post('/albums/:albumId/song', songControllers.createSong);


module.exports = app;