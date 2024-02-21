// this files are for Connecting with mangodb Atlas in future
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const eventSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    Teacher: String
});

module.exports = mongoose.model('events', eventSchema);
