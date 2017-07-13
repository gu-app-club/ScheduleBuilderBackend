var express = require('express');
var router = express.Router();
var Catalog = require('../models/classes');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello, World! I Hate Jen.');
});

router.get('/subjects', function (req, res) {
    Catalog.distinct("Subject").then(function (subjects) {
        res.send({subjects:subjects})
    })
});

router.get('/courses', function (req, res) {
    Catalog.aggregate({ $group: {
        _id: { Subject: "$Subject", Course: "$Course" }
    }}).then(function (courses) {
        refined = [];
        courses.forEach(function (course) {refined.push(course._id);});
        refined.sort(function(a, b) {
            var textA = a.Subject;
            var textB = b.Subject;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        res.send({courses:refined})
    })
});

module.exports = router;


