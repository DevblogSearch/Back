const express = require('express');
const db = require('../lib/db');
const events = require('../routes/events');
const preview = require('../lib/preview');

const router = express.Router();

router.get('/list', async (req, res) => {
    await db.LikeEvent.findAll({
        attributes:['preview_id'],
        where: {user_id: req.query.id }
    }).then(likes => {
        console.log(likes);
    res.end();
    }).catch((e) => {
        console.log(str(e));
        console.log(str(e));
    res.end();
    });

});

module.exports = router;
