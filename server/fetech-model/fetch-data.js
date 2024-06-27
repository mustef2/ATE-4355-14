const fs = require('fs')
const data_tours = JSON.parse(fs.readFileSync('./json-data/tours-simple.json'));
module.exports = data_tours