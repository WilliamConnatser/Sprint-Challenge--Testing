const express = require('express');
const dbApi = require('./data/dbApi');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Hi!');
});

router.get('/games', async (req, res) => {
    const queryRes = await dbApi.get();
    res.status(200).send(queryRes);
});

router.post('/games', async (req, res) => {
    try{
        const queryRes = await dbApi.add(req.body);
        res.status(200).json(queryRes[0]);
    } catch(err) {
        res.status(500).send({message: 'Internal Server Error'});
    }
});

module.exports = router;