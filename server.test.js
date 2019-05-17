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
        expect(res.data).toHaveLength(0);
    });

    it('POST /games returns status 200', () => {
        return request(server).post('/games',{
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        }).expect(200);
    });

    it('POST /games returns ID of item inserted', async () => {
        const res = await request(server).post('/games',{
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        });
        expect(res.data).toBe(1);
    });

    it('POST /games inserts item into database', async () => {
        await request(server).post('/games',{
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        });
        const res = await request(server).get('/games');
        expect(res.data[0]).toEqual({
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        });
    });
});