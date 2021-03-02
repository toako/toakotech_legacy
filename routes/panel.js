/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    panel.js - BACK END

    Welcome page for the user after logging in.

////////////////////////////////////////////////////////////////////////////////////////*/

"use strict";

const { useLayoutEffect } = require("react");
const Organization = require("./models/Organization.js");
const User = require("./models/User.js");

module.exports = function (app) {



app.get("/s/admin/panel", (req, res) => {
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);

        User.findById(req.session._id, (err, user) => {
            if (err) console.error(err);
            
            const userPositionID = org.data.positionRegister.filter(posRegUser => posRegUser[0] == req.session._id)[0][1];
            const positionName = org.data.positions.filter(pos => pos.id == userPositionID)[0].title;

            res.json({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                organization: org.name,
                position: positionName
            })
        });
    });
});



}