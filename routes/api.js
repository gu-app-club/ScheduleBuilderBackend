var express = require('express');
var router = express.Router();
var Catalog = require('../models/classes');
var product = require('cartesian-product');


// GETS all Subjects from Catalog
router.get('/subjects', function (req, res) {
    Catalog.distinct("Subject").then(function (subjects) {
        res.send({subjects:subjects})
    })
});

// GETS all Subject, Course Number, and Title combinations from Catalog
router.get('/classes', function (req, res) {
    Catalog.aggregate({"$group" : {_id : {Subject:"$Subject", Course:"$Course", Title:"$Title", Credits:"$Credits", Class:"$Class"}}}
        ).then(function (classes) {
            var results = classes.map(function (result) { return result._id });
            results.sort(function(a,b) {return (a.Subject > b.Subject) ? 1 : ((b.Subject > a.Subject) ? -1
                :(a.Course > b.Course) ? 1 :(a.Course < b.Course)? -1: 0);} );
        res.send(results)
    })
});

//GETS all Sections for a given Subject and Course (i.e. MATH 100)
router.get('/sections', function(req, res){
    Catalog.find({Subject:req.query.subject, Course:req.query.course},
        'CRN Subject Course Section Week').then(function (sections) {
        res.send({sections:sections})
    })
});

// GETS a all viable schedules
router.get('/schedules', function(req, res){
    courses = req.query.courses;

    if(typeof courses == 'string'){
        classes = courses.replace('_', ' ');
        Catalog.find({Class:classes}).then(function (sections) {
            res.send(sections.map(function (course) { return [course] }))
        })
    }

    else{
        classes = courses.map(function (course) {return course.replace('_', ' ')});
        Catalog.find({Class:{$in:classes}}).then(function (sections) {
            var results = {};
            // initialize results dictionary
            classes.map(function (elem) { results[elem] = []});
            // sort sections into dictionary by Class data field
            sections.map(function (section) {results[section.Class].push(section);});
            configured = Object.keys(results).map(function (key) { return results[key]});

            res.send(product(configured))
        })
    }
});

router.post('/schedules', function(req, res){
    classes = req.body.classes;
    blocks = req.body.blocks;
    Catalog.find({Class:{$in:classes}}).then(function (sections) {

        var results = {};
        // initialize results dictionary
        classes.map(function (elem) {results[elem] = []});
        // sort sections into dictionary by Class data field
        sections.map(function (section) {results[section.Class].push(section);});
        configured = Object.keys(results).map(function (key) {return results[key]});
        all_schedules = product(configured).map(function (schedule) { return schedule }); //.concat(blocks)

        res.send(viable_schedules(all_schedules))
    })
});


// returns true if week1 conflicts with week2; otherwise, false
// week1 and week2 are dictionaries
function conflicts(week1, week2) {

    // iterates through the dictionary keys
    // checks if corresponding time ranges
    // from week1 and week2 conflict with each other
    // the results are return in an array
    conflict = Object.keys(week1).map(function(key){
        return time_conflicts(week1[key], week2[key]);
    });

    // returns false if all values in the array are false; otherwise,
    // week1 and week2, and the function returns true
    return !conflict.every(function (value) { return !value });

    // returns true if time1 conflicts with time2; otherwise false
    function time_conflicts(time1, time2){
        if(time1 == null || time2 == null){return false;}  // check if time1 or time2 are null
        return !(time1[1] <= time2[0] || time2[1] <= time1[0]);
    }
}


// Filters out schedules with conflicts from all
// possible combinations of classes
// schedules is a list of all possible class combinations
function viable_schedules(schedules) {

    return schedules.filter(function (schedule) {
        return viable(schedule.slice())
    });

    // returns true if a schedule has no conflicts;
    // otherwise, false.
    function viable(schedule) {

        if (schedule.length == 1) {
            return true
        } else {
            head = schedule[0]; tail = schedule.slice(1);

            for (var i = 0; i < tail.length; i++) {
                if (conflicts(head.Week, tail[i].Week)) {
                    return false
                }
            }
            return viable(tail) // recursive step
        }
    }
}

module.exports = router;
