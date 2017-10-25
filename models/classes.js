var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const ClassSchema = new Schema({

    CRN: {
        type: String,
        required: [true, 'CRN Field is required.']
    },
    Subject: {
        type: String,
        required: [true, 'Subject Field is required.']
    },
    Course: {
        type: String,
        required: [true, 'Course Field is required.']
    },
    Section: {
        type: String,
        required: [true, 'Section Field is required.']
    },
    Credits: {
        type: String,
        required: [true, 'Credits Field is required.']
    },
    Title: {
        type: String,
        required: [true, 'Title Field is required.']
    },
    Campus: {
        type: String,
        required: [true, 'Campus Field is required.']
    },
    Start_Date: {
        type: String,
        required: [true, 'Start_Date Field is required.']
    },
    End_Date: {
        type: String,
        required: [true, 'End_Date Field is required.']
    },
    Days: {
        type: String,
        required: [true, 'Days Field is required.']
    },
    Times: {
        type: String,
        required: [true, 'Times Field is required.']
    },
    Building: {
        type: String,
        required: [true, 'Building Field is required.']
    },
    Room: {
        type: String,
        required: [true, 'Room Field is required.']
    },
    Instructor: {
        type: String,
        required: [true, 'Campus Field is required.']
    },
    Week: {
        type: {String:[]},
        required: [true, 'Campus Field is required.']
    },
    Class:{
        type: String
    }
});

const Class = mongoose.model('catalog-fall-2017', ClassSchema);

module.exports = Class;