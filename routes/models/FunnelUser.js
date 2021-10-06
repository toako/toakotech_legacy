/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    FunnelUser.js - MODEL
    
    This file is a MODEL for mongoose, which organizes data around creating a funnel user, 
    which contains all data regarding the user itself, to be implemented on WillStyle data tracker.

////////////////////////////////////////////////////////////////////////////////////////*/
const mongoose = require("mongoose");
const Mixed = mongoose.Schema.Types.Mixed;

module.exports = User = mongoose.model("FunnelUser", new mongoose.Schema({
    _id: {type: String, required: true},
    source: {type: String, required: true},
    dc: {type: String, required: true},
    email: {type: String, required: true},
    data: {type: Mixed, required: true}
}));