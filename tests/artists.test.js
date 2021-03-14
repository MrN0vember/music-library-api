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
                  expect(insertedArtistRecords.name).to.equal('Tame Impala');
                  expect(insertedArtistRecords.genre).to.equal('Rock');
                  done();
                }).catch(error => done(error));
              }).catch(error => done(error));
        });
    