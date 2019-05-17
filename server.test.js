const request = require('supertest');
const db = require('./data/dbConfig');
const server = require('./server');

describe('Express API tests', () => {

    beforeEach(async () => {
        await db('games').truncate();
    });

    it('Environment set to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    it('GET / returns status 200', () => {
        return request(server).get('/').expect(200);
    });

    it('GET / returns Hi!', async () => {
        const res = await request(server).get('/');
        expect(res.text).toBe('Hi!')
    });

    it('GET /games returns status 200', () => {
        return request(server).get('/games').expect(200);
    });

    it('GET /games returns JSON', async () => {
        const res = await request(server).get('/games');
        expect(res.type).toBe('application/json');
    });

    it('GET /games returns an array', async () => {
        const res = await request(server).get('/games');
        expect(res.body).toHaveLength(0);
    });

    it('POST /games returns status 200', () => {
        return request(server).post('/games').send({
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        }).set('Accept', 'application/json').expect(200);
    });

    it('POST /games returns ID of item inserted', async () => {
        const res = await request(server).post('/games').send({
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        }).set('Accept', 'application/json');
        expect(res.body).toBe(1);
    });

    it('POST /games inserts item into database', async () => {
        await request(server).post('/games').send({
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        }).set('Accept', 'application/json');
        const res = await request(server).get('/games');
        expect(res.body[0]).toEqual({
            id: 1,
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        });
    });
});