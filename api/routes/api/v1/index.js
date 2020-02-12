const router = require('express').Router();

router.use("/usuarios", require("./users"));
router.use("/clientes", require("./clients"));
router.use("/lojas", require("./lojas"));

module.exports = router;