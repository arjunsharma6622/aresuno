const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

// CREATE
router.post('/register', async (req, res) => {
    try {
        const newBusiness = new Business(req.body);
        console.log(newBusiness);
        await newBusiness.save();
        res.status(201).send(newBusiness);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const businesses = await Business.find({});
        res.send(businesses);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).send("Business not found");
        }
        res.send(business);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'type', 'profileImg', 'mainCategory', 'subCategory', 'timing', 'phone', 'photosGallery', 'socialLinks', 'faqs', 'address', 'modeOfPayment'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).send();
        }
        updates.forEach((update) => (business[update] = req.body[update]));
        await business.save();
        res.send(business);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        if (!business) {
            return res.status(404).send("Business not found");
        }
        res.send("Business deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
