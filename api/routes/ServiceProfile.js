const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

// CREATE
router.post('/register', async (req, res) => {
    try {
        const Business = new Business(req.body);
        console.log(Business)
        await Business.save();
        res.status(201).send(Business);
    } catch (error) {
        console.log('errr')
        res.status(400).send(error);
    }
});

// READ ALL
router.get('/service/', async (req, res) => {
    try {
        const Businesss = await Business.find({});
        res.send(Businesss);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const Business = await Business.findById(req.params.id);
        if (!Business) {
            return res.status(404).send();
        }
        res.send(Business);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'duration'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const Business = await Business.findById(req.params.id);
        if (!Business) {
            return res.status(404).send();
        }
        updates.forEach((update) => (Business[update] = req.body[update]));
        await Business.save();
        res.send(Business);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const Business = await Business.findByIdAndDelete(req.params.id);
        if (!Business) {
            return res.status(404).send();
        }
        res.send(Business);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;





