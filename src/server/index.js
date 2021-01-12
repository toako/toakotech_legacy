const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get("/", (req, res) => {
    return res.json({ message: "Hello, World!" });
});
router.post("/login", (req, res) => {
    console.log(req.body);
    return res.json(req.body);
});

module.exports = router;
