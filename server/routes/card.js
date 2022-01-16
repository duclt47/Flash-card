const express = require('express');
const router = express.Router();
const Card = require('../models/FlashCard');
const verifyToken = require('../middleware/auth');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });


//@route Card api/Cards
//@desc create Card
//@access private
router.post('/', upload.single('image'), async (req, res) => {
    const { vocabulary, example, meaning } = req.body;
    let image;
    try {
        image = {
            data: fs.readFileSync(path.join(__dirname, '..' + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
        // res.sendFile(__dirname + `/uploads/${req.file.filename}`);
    } catch (error) {
        return res.status(400).json({ success: false, message: error ? error : "Can not upload image!" });
    }

    console.log(image)
    
    if (!vocabulary) {
        return res.status(400).json({ success: false, message: "Vocabulary is required!" });
    }

    // if (!example) {
    //     return res.status(400).json({success: false, message: "Example is required!"});
    // }

    if (!image) {
        return res.status(400).json({ success: false, message: "Image is required!" });
    }

    if (!meaning) {
        return res.status(400).json({ success: false, message: "meaning of word is required!" });
    }

    try {
        const newCart = new Card({
            vocabulary,
            example,
            image,
            meaning,
            // user: req.userId || "anonymous"
        })

        await newCart.save();

        res.send({ success: true, message: "Happy learning!!!", Card: newCart });
    } catch {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


//@route GET api/Cards
//@desc get Cards
//@access private
router.get('/', verifyToken, async (req, res) => {
    try {
        const cards = await Card.find();
        res.json({ success: true, cards })
        // res.sendFile(__dirname + `/uploads/${req.file.filename}`);
    } catch {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


//@route PUT api/Cards/:id
//@desc update Card
//@access private
router.put('/:id', verifyToken, async (req, res) => {
    const { vocabulary, example, image, meaning } = req.body;


    if (!vocabulary) {
        return res.status(400).json({ success: false, message: "Vocabulary is required!" });
    }

    // if (!example) {
    //     return res.status(400).json({success: false, message: "Example is required!"});
    // }

    // if (!image) {
    //     return res.status(400).json({success: false, message: "Image is required!"});
    // }

    if (!meaning) {
        return res.status(400).json({ success: false, message: "meaning of word is required!" });
    }
    try {
        let updatedCard = {
            vocabulary,
            example,
            image,
            meaning,
            user: req.userId || "anonymous"
        }
        const CardUpdateCondition = { _id: req.params.id };
        updatedCard = await Card.findOneAndUpdate(CardUpdateCondition, updatedCard, { new: true });
        if (!updatedCard) {
            res.status(401).json({ success: false, message: 'Card not found or user invalid' });
        }

        res.json({ success: true, message: 'Card updated!', Card: updatedCard });
    } catch {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


//@route DELETE api/Cards/:id
//@desc delete Card
//@access private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const cardDeleteCondition = { _id: req.params.id };
        const deleteCard = await Card.findOneAndDelete(cardDeleteCondition)

        if (!deleteCard) {
            res.status(401).json({ success: false, message: 'Card not found or user invalid' });
        }

        res.json({ success: true, message: 'Card deleted!', Card: deleteCard });
    } catch {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
module.exports = router