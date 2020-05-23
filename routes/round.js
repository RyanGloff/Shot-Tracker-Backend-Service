const router = require('express').Router();
const verifyToken = require('../verifyToken');
const validateRound = require('../validation/validateRound');
const Round = require('../model/Round');
const UserClient = require('../client/UserClient');

router.post('/', verifyToken, async (req, res) => {
    let user;
    try {
        user = await UserClient.whoAmI(req.header('auth-token'));
    } catch (err) {
        console.log(err);
    }
    if (!user) return res.status(500).json({ message: 'Failed to find user from JWT' });
    const { error } = await validateRound(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const round = new Round({
        user: user._id,
        course: req.body.course
    });
    try {
        const persistedRound = await round.save();
        res.json(persistedRound);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
});

module.exports = router;