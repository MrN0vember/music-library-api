const { Artist, Album } = require('../models');

exports.createAlbum = (req, res) => {
    Artist.findByPk(req.params.artistId).then(artist => {
        if (!artist) {
            res.status(404).json({ error: "The artist could not be found." });
        } else {
            req.body.artistId = req.params.artistId;
            Album.create(req.body)
                .then(album => res.status(201)
                .json(album));
        }
    });
};
