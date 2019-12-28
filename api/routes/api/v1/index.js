const router = require('express').Router();

router.use("/usuarios", require("./users"));

module.exports = router;