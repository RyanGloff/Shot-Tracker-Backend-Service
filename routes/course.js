const verifyToken = require('../verifyToken');
const router = require('express').Router();

const Course = require('../model/Course');
const Hole = require('../model/Hole');
const validateCourse = require('../validation/validateCourse');
const validateHole = require('../validation/validateHole');

router.post('/', verifyToken, async (req, res) => {
    const { error } = await validateCourse(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const course = new Course({
        name: req.body.name
    });
    try {
        const savedCourse = await course.save();
        res.json({ id: savedCourse._id });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ courses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id });
        if (!course) return res.status(404).json({ message: 'Unable to find course with id: ' + req.params.id })
        res.json(course);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});

router.post('/:id/hole', verifyToken, async (req, res) => {
    const { error } = await validateHole(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    const course = await Course.findOne({ _id: req.params.id });
    if (!course) return res.status(404).json({ message: 'Unable to find course with id: ' + req.params.id });
    const courseHole = course.holes.filter(h => h.number === req.body.number);
    if (courseHole.length != 0) return res.status(409).json({ message: 'Hole number ' + req.body.number + ' already exists'});

    const hole = new Hole.model({
        number: req.body.number,
        par: req.body.par,
        location: req.body.location
    });
    try {
        const persistedHole = await hole.save();
        course.holes.push(persistedHole);
        course.holes = course.holes.sort((h1, h2) => h1.number - h2.number);
        await course.save();
        
        res.json({ id: persistedHole._id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});

module.exports = router;