// this files are for Connecting with mangodb Atlas in future
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const specialSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    Teacher: String
});

module.exports = mongoose.model('special', specialSchema);