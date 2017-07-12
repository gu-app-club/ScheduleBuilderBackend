var express = require('express');
var router = express.Router();
var Catalog = require('../models/classes');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello, World! I Hate Jen.');
});

router.get('/subjects', function (req, res) {
    Catalog.distinct("Subject").then(function (subjects) {
        res.send(subjects)
    })
});

module.exports = router;



//
// // router.get('/courses', function (req, res, next) {
// //     Class.distinct("Course").then(function (courses) {
// //         res.send(courses)
// //     })
// // });
//
// router.get('/courses', function (req, res) {
//
//     Class.find({"Subject":req.query.subject}).then(function (courses) {
//         res.send(courses)
//     })
// });
//
// router.post('/subjects', function (req, res) {
//     Class.create(req.body).then(function (classes) {
//         res.send(classes);
//     });
//     res.send({
//         CRN: req.body.CRN,
//         Title: req.body.Title
//     });
// });
