const mongoose = require("mongoose");
const Mixed = mongoose.Schema.Types.Mixed;

module.exports = User = mongoose.model("User", new mongoose.Schema({
    _id: {type: String, required: true},
    orgID: {type: Number, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    data: {type: Mixed, required: true},
    settings: {type: Mixed, required: true}
}));