const {logEvents} = require('../middleware/logEvents');

exports.errorHandler = (err, req, res, next) => {
    console.error(`${err.name}: ${err.message}`);
    logEvents(`${err.name}: ${err.message}`, 'errorLog.txt');
    res.status(500).send(err.message);
  }

