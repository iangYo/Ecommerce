const router = require('express').Router();

router.use("/usuarios", require("./users"));
// router.use("/lojas", require("./lojas"));

module.exports = router;