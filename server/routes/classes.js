const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const User = require('../models/User'); // Assuming you might need user info
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// @route   POST api/classes
// @desc    Create a class
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, section, subject, room, theme } = req.body;

    try {
        // Generate a random 6-character class code
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();

        const newClass = new Class({
            title,
            section,
            subject,
            room,
            code,
            theme: theme || 'bg-gradient-to-r from-blue-600 to-indigo-600',
            owner: req.user.id,
            teachers: [req.user.id] // Owner is also a teacher
        });

        const savedClass = await newClass.save();
        res.json(savedClass);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/classes
// @desc    Get all classes for a user (as teacher or student)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // Find classes where user is owner, teacher, or student
        const classes = await Class.find({
            $or: [
                { owner: req.user.id },
                { teachers: req.user.id },
                { students: req.user.id }
            ]
        }).populate('owner', 'name email'); // Populate owner details if needed

        res.json(classes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
