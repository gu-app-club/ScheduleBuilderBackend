var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello, World! I Hate Jen.');
});

module.exports = router;