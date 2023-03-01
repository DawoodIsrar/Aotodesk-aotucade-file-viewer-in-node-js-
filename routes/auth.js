const express = require('express');
const { getPublicToken } = require('../services/forge/auth.js');
const { getDimensions } = require('../services/forge/auth.js');
let router = express.Router();

// GET /api/token
// Get public access token to be used by the viewer.
router.get('/token', async function (req, res, next) {
    try {
        res.json(await getPublicToken());
        console.log(getPublicToken())
    } catch (err) {
        next(err);
    }
});


module.exports = router;
