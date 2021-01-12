const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.static('build', {
    setHeaders: res => res.req.path.split("/")[1] === "static" && res.setHeader('Cache-Control', 'max-age=31536000')
}));

app.use('/s', require('./src/server'));

app.get("/*", (req, res) => {
    return res.sendFile(__dirname+'/build/index.html', err => (err.status === 404) ? 
    res.status(404).send("<b>Error: </b>Seems like there is currently no build present for this project. Please run <code>npm run build</code> and restart the server in order to continue. Thank you.") : 
    res.status(500).send("Internal Server Error"));
});

app.listen(process.env.PORT || 5000, () => console.log(`Server is listening on port ${process.env.PORT || 5000}`));
