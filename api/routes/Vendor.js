const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const bcrypt = require('bcrypt');


// CREATE
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, gender, businesses } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        

        const vendor = new Vendor({ name, email, password: hashedPassword, phone, gender, businesses });


        await vendor.save();
        res.status(201).send(vendor);
    } catch (error) {
        console.log('eerrr')
        res.status(400).send(error);
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.send(vendors);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).send();
        }
        res.send(vendor);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).send();
        }

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            vendor.password = hashedPassword;
        }


        updates.forEach((update) => {
            if (update !== 'password') {
                vendor[update] = req.body[update];
            }
        });

        await vendor.save();
        res.send(vendor);
    } catch (error) {
        res.status(400).send(error);
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return res.status(404).send({ error: "Vendor not found" });
        }
        res.status(200).send({ message: "Vendor deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;