
// IMPORTS
///////////////////////////////////////////////////
require('dotenv').config();
const express = require('express');
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uid = require("uniqid");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GLOBALS
///////////////////////////////////////////////////
const hashRate = 10;

// USE BUILD IN PRODUCTION
///////////////////////////////////////////////////
app.use(express.static('build', {
    setHeaders: res => res.req.path.split("/")[1] === "static" && res.setHeader('Cache-Control', 'max-age=31536000')
}));

// MONGO DB SESSION STORE
///////////////////////////////////////////////////

//Mongoose connection
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log("ToakoTech database connection established.");
    });

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

// COLLECTIONS
///////////////////////////////////////////////////

const Mixed = mongoose.Schema.Types.Mixed;

let Organization = mongoose.model("Organization", new mongoose.Schema({
    _id: Number,
    name: String,
    adminList: Array,
    userList: Array,
    data: Mixed,
    settings: Mixed
}));

let User = mongoose.model("User", new mongoose.Schema({
    _id: String,
    orgID: Number,
    email: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    data: Mixed,
    settings: Mixed
}));

// SESSION AND AUTHENTICATION ROUTES
///////////////////////////////////////////////////

app.get("/s/admin", (req, res) => {
    User.findById(req.session._id, (err, user) => {
        if (err) console.error(err);

        Organization.findById(req.session.orgID, (err, org) => {
            if (err) console.error(err);
            res.json({
                session: req.session,
                user: user,
                organization: org
            })
        });
    });

});

app.post("/s/login", (req, res) => {
    let rb = req.body;

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
                
                let tempPerm;
                if (org.adminList.includes(user._id))
                    tempPerm = 1;
                else if (org.userList.includes(user._id))
                    tempPerm = 0;
                else 
                    tempPerm = -1;

                //If there is no user association with organization
                if (tempPerm === -1) {
                    res.json({
                        operation: "failed",
                        info: "User does not exist in organization."
                    });
                }
                //Send response of completed authentication.
                else {
                    req.session._id = user._id;
                    req.session.username = user.username;
                    req.session.password = user.password;
                    req.session.orgID = org._id;
                    res.json({
                        operation: "success",
                        info: `${user.username} logged in successfully.`,
                        user: user,
                        perm: tempPerm
                    });
                }
            });
        }
        //If password failed
        else {
            res.json({
                operation: "failed",
                info: "Invalid password."
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
            data: {},
            settings: {}
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
            data: {},
            settings: {}
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





// PAGE NAVIGATION AND RUN SERVER
///////////////////////////////////////////////////
app.get("/*", (req, res) => {
    return res.sendFile(__dirname+'/build/index.html', err => (err.status === 404) ? 
    res.status(404).send("<b>Error: </b>Seems like there is currently no build present for this project. Please run <code>npm run build</code> and restart the server in order to continue. Thank you.") : 
    res.status(500).send("Internal Server Error"));
});
app.listen(process.env.PORT || 5000, () => console.log(`Server is listening on port ${process.env.PORT || 5000}`));
