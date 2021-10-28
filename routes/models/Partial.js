/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    FunnelUser.js - MODEL
    
    This file is a MODEL for mongoose, which organizes data around creating a funnel user, 
    which contains all data regarding the user itself, to be implemented on WillStyle data tracker.

////////////////////////////////////////////////////////////////////////////////////////*/
const mongoose = require("mongoose");
const Mixed = mongoose.Schema.Types.Mixed;

module.exports = Partial = mongoose.model("Partial", new mongoose.Schema({
    fn: { type: String },
    ln: { type: String },
    em: { type: String },
    ph: { type: String },
    dc: { type: String }
}));