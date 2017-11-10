var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 5;

throng({
    workers: WORKERS,
    lifetime: Infinity
}, function (id) {
    require('./www');
});