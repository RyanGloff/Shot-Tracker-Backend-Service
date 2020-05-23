const jwt = require('jsonwebtoken');

function verify (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    let valid = false;
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        valid = true;
    } catch (err) {
        console.log(err);
        res.status(401).send('Invalid Token');
    }
    if (valid) next();
}

module.exports = verify;