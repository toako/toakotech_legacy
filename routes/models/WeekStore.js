/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    WeekStore.js - MODEL

    This file is a MODEL for mongoose, which organizes data around a week for scheduling
    that the user and manager can see.

////////////////////////////////////////////////////////////////////////////////////////*/

const mongoose = require("mongoose");
const Mixed = mongoose.Schema.Types.Mixed;

module.exports = WeekStore = mongoose.model("WeekStore", new mongoose.Schema({
    orgID: {type: Number, required: true},
    startDate: {type: String, required: true},
    active: {type: Boolean, required: true},
    days: {type: Array, required: true}
}));