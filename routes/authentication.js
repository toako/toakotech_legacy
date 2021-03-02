/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    authentication.js - BACK END

    This allows for authentication and access of the user/admin by the following:
    - Creates, carries, and removes session for the user
    - Allows for login to be passed off to other files
    - Authenticates passwords as well as hashing via BCrypt

////////////////////////////////////////////////////////////////////////////////////////*/

"use strict";

// LIB AND GLOBALS
///////////////////////////////////////////////////
require('dotenv').config();
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt = require("bcrypt");
const uid = require("uniqid");

const hashRate = 10;

// MONGOOSE MODELS
///////////////////////////////////////////////////
const Organization = new require("./models/Organization.js");
const User = new require("./models/User.js");

module.exports = function (app) { ///
    



// MONGO DB SESSION STORE
///////////////////////////////////////////////////

//Session MongoDB store
let store = new MongoDBStore({
    uri: process.env.URI,
    databaseName: "scheduler",
    collection: "sessions",
    expires: 1000 * 60 * 60 * 24
});
store.on('error', function(error) {
    console.log(error);
});

app.use(session({
    secret: "Rosebud",
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: store,
    resave: true,
    saveUninitialized: true
}));

// SESSION AND AUTHENTICATION ROUTES
///////////////////////////////////////////////////

app.get("/s/admin", (req, res) => {
    User.findById(req.session._id, (err, user) => {
        if (err) console.error(err);
        
        res.json({
            session: req.session,
            user: user
        })
    });
});

app.get("/s/manager", (req, res) => {
    User.findById(req.session._id, (err, user) => {
        if (err) console.error(err);
        
        res.json({
            session: req.session,
            user: user
        })
    });
});

app.get("/s/user", (req, res) => {
    User.findById(req.session._id, (err, user) => {
        if (err) console.error(err);
        
        res.json({
            session: req.session,
            user: user
        })
    });
});

app.post("/s/login", (req, res) => {
    let rb = req.body;
    console.log(rb);
    //First, find if username and organization combo exists
    User.find({username: rb.username, orgID: rb.orgID}, (err, doc) => {
        if (err) console.error(err);

        let user = doc[0];
        //If no user or org is found
        if (doc.length == 0) {
            res.json({
                operation: "failed",
                info: "Invalid username or organization ID."
            });
        }
        //Determine if password is correct, if so, add to response
        else if (bcrypt.compareSync(rb.password, user.password)) {
            
            //Access users permission level
            Organization.findById(user.orgID, (err, org) => {
                if (err) console.error(err);

                if (user) {
                    const userPosition = org.data.positionRegister.filter(posRegUser => posRegUser[0] == user._id)[0][1];
                    const managerPositions = org.data.departments.map(dept => dept.manager.id);
                    const isManager = managerPositions.filter(mp => mp === userPosition).length > 0;

                    const loginLevel = org.adminList.includes(user._id) ? "admin" :
                        (isManager ? "manager" : "user");

                    req.session._id = user._id;
                    req.session.username = user.username;
                    req.session.password = user.password;
                    req.session.orgID = org._id;
                    req.session.level = loginLevel;
                    
                    res.json({
                        operation: "success",
                        info: `${user.username} logged in successfully.`,
                        user: user,
                        level: loginLevel
                    });
                }
                else {
                    res.json({
                        operation: "failed",
                        error: "User is not found."
                    });
                }
            });
        }
        //If password failed
        else {
            res.json({
                operation: "failed",
                error: "Invalid password."
            });
        }
    });
});

app.post("/s/createOrg", (req, res) => {
    let rb = req.body;
    
    // Search all organization ID's and create new organization with unique ID
    Organization.distinct("_id", (err, ids) => {
        if (err) return console.error(err);

        let newOrgID = 0;
        let foundNew = false;

        //Keep iterating until new unique ID is found
        while (!foundNew) {
            let randomNum = Math.round(Math.random() * (10000 - 1000) + 1000);
            if (!ids.includes(randomNum)) {
                newOrgID = randomNum;
                foundNew = true;
            }
        }
        console.log(`Found unique ID: ${newOrgID} from used ID's: \n ${ids}`);

        // Create new owner of organization
        let newOwner = new User({
            _id: uid.time(),
            orgID: newOrgID,
            email: rb.oEmail,
            username: rb.oUsername,
            password: bcrypt.hashSync(rb.oPassword, hashRate),
            firstName: rb.oFirstName,
            lastName: rb.oLastName,
            data: { exist: "true" },
            settings: { exist: "true" }
        });

        // Save new owner to db
        newOwner.save((err, data) => {
            if (err) return console.error(err);
            console.log(`A new owner, ${newOwner.firstName} ${newOwner.lastName}, has been created successfully.`);
        });

        //Create organization
        let newOrg = new Organization({
            _id: newOrgID,
            name: rb.oOrgName,
            adminList: [newOwner._id],
            userList: [],
            data: { exist: "true" },
            settings: { exist: "true" }
        });

        //Save new organization to db
        newOrg.save((err, data) => {
            if (err) return console.error(err);
            console.log(`A new organization, ${newOrg.name}, has been created successfully.`);
        });

        //Set session variables to ID
        req.session._id = newOwner._id;
        req.session.username = newOwner.username;
        req.session.password = newOwner.password;
        req.session.orgID = newOrg._id;

        return res.json({
            operation: "success",
            info: `${newOrg.name}, owned by ${newOwner.username} has been created successfully.`,
            user: newOwner,
            organization: newOrg,
            perm: 1
        });
    });
});

app.post("/s/logout", (req, res) => {
    console.log(req.body)
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
    });
    res.json({operation: "destroyed session"});
});

// app.post("/s/createUser", (req, res) => {
//     let rb = req.body;

//     let newUser = new User({
//         _id: uid.time(),
//         orgID: req.session.orgID,
//         email: rb.oEmail,
//         username: rb.oUsername,
//         password: bcrypt.hashSync(rb.oPassword, hashRate),
//         firstName: rb.oFirstName,
//         lastName: rb.oLastName,
//         data: {},
//         settings: {}
//     });

//     // Save new owner to db
//     newOwner.save((err, data) => {
//         if (err) return console.error(err);
//         console.log(`A new owner, ${newOwner.firstName} ${newOwner.lastName}, has been created successfully.`);
//     });
// });






} ///