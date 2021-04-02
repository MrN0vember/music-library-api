const {Artist, Album, Song } = require('../models');
//onst { create } = require('./artists');


exports.createSong = (req, res) => {
    Album.findByPk(req.params.albumId).then(album => {
        if (!album) {
            res.status(404).json({ error: "The album could not be found."});
        } else {
            req.body.albumId = parseInt(req.params.albumId);
            req.body.artistId = album.artistId;
            Song.create(req.body)
            .then(song => res.status(201)
            .json(song));
        }
    });
};