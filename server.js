/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    server.js - BACK END

    The linking source for all other back-end files and is the host of the Node.js server.

////////////////////////////////////////////////////////////////////////////////////////*/


// IMPORTS
///////////////////////////////////////////////////
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const authentication = require("./routes/authentication.js");
const position = require("./routes/position.js");
const user = require("./routes/user.js");
const department = require("./routes/department.js");
const panel = require("./routes/panel.js");
const schedule = require("./routes/schedule.js");
const ws = require('./routes/ws.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// USE BUILD IN PRODUCTION
///////////////////////////////////////////////////
app.use(express.static('build', {
    setHeaders: res => res.req.path.split("/")[1] === "static" && res.setHeader('Cache-Control', 'max-age=31536000')
}));

//Mongoose connection
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log("ToakoTech database connection established.");
    });

authentication(app);
position(app);
user(app);
department(app);
panel(app);
schedule(app);
ws(app);

// PAGE NAVIGATION AND RUN SERVER
///////////////////////////////////////////////////
app.get("/*", (req, res) => {
    return res.sendFile(__dirname+'/build/index.html', (err) => {
        if (err) {
            return (err.status === 404) ? 
            res.status(404).send("<b>Error: </b>Seems like there is currently no build present for this project. Please run <code>npm run build</code> and restart the server in order to continue. Thank you.") : 
            res.status(500).send("Internal Server Error");
        }
    });
});
app.listen(process.env.PORT || 5000, () => console.log(`Server is listening on port ${process.env.PORT || 5000}`));
