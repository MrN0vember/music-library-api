const { expect } = require('chai');
const request =require('supertest');
const { Artist } = require('../src/models');
const app = require('../src/app');

describe('/artists', () => {
    before(done => {
        Artist.sequelize
        .sync()
        .then(() => done())
        .catch(error => done(error));
    });

    beforeEach(done => {
        Artist.destroy({ where: {} })
        .then(() => done()).catch(error => done(error));
    });


    describe('POST /artists', () => {
        it('creates a new artist in the database', (done) => {
            request(app).post('/artists').send({
                name: 'Tame Impala',
                genre: 'Rock',
            }).then(response => {
                console.log(response);
                expect(response.status).to.equal(201);
                expect(response.body.name).to.equal('Tame Impala');
                expect(response.body.genre).to.equal('Rock');
                Artist.findByPk(response.body.id, { raw: true }).then(artist => {
                  expect(artist.name).to.equal('Tame Impala');
                  expect(artist.genre).to.equal('Rock');
                  done();
                }).catch(error => done(error));
              }).catch(error => done(error));
        })
    });

    describe('with artists in database', () => {
        let artists;
        beforeEach((done) => {
            Promise.all([
                Artist.create({ name:'Tame Impala', genre: 'Rock' }),
                Artist.create({ name: 'Kylie Minogue', genre: 'Pop' }),
                Artist.create({ name: 'Dave Mathews', genre: 'Trash'}),
            ]).then((documents) => {
                artists = documents;
                done();
            });
        });
        describe('GET /artists', () => {
            it('gets all artist records', (done) => {
              request(app)
                .get('/artists')
                .then((res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.length).to.equal(3);
                  res.body.forEach((artist) => {
                    const expected = artists.find((a) => a.id === artist.id);
                    expect(artist.name).to.equal(expected.name);
                    expect(artist.genre).to.equal(expected.genre);
                  });
                  done();
                })
                .catch(error => done(error));
            });
        });

        describe('GET /artists/:artistId', () => {
            it('gets artist record by id', (done) => {
                const artist = artists[0];
                request(app)
                .get(`/artists/${artist.id}`)
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal(artist.name);
                    expect(res.body.genre).to.equal(artist.genre);
                    done();
                }).catch(error => done(error));
            });
            it('returns 404 if the artist does not exist', (done) => {
                request(app)
                .get('/artists/12345')
                .then((res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body.error).to.equal('The artist could not be found.');
                    done();
                }).catch(error => done(error));
            });
        });
        describe('PATCH /artists/:id', () => {
            it('updates artists genre by id', (done) => {
                const artist = artists[0];
                request(app)
                .patch(`/artists/${artist.id}`)
                .send({ genre: 'Psychedelic Rock'})
                .then((res) => {
                    expect(res.status).to.equal(200);
                    Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
                        expect(updatedArtist.genre).to.equal('Psychedelic Rock');
                        done();
                    }).catch(error => done(error));
                }).catch(error => done(error));
            });
            it('updates artists name by id', (done) => {
                const artist = artists[0];
                request(app)
                .patch(`/artists/${artist.id}`)
                .send({ name: 'The Mars Volta'})
                .then((res) => {
                    expect(res.status).to.equal(200);
                    Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
                        expect(updatedArtist.name).to.equal('The Mars Volta');
                        done();
                    }).catch(error => done(error));
                }).catch(error => done(error));
        });

    });

    

});
});


