/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    Organization.js - MODEL

    This file is a MODEL for mongoose, which organizes data around creating organization, 
    which manage all other aspects of the coding app.

////////////////////////////////////////////////////////////////////////////////////////*/

const mongoose = require("mongoose");
const Mixed = mongoose.Schema.Types.Mixed;

module.exports = Organization = mongoose.model("Organization", new mongoose.Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    adminList: {type: Array, required: true},
    userList: {type: Array, required: true},
    data: {type: Mixed, required: true},
    settings: {type: Mixed, required: true},
}));