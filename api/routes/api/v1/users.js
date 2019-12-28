const router = require('express').Router();
const auth = require('../../auth');
const UserController = require('../../../controllers/UserController');

//const Validation = require('express-validation');
//const { UserValidation } = require('../../../controllers/validations/userValidation');

const userController = new UserController();

router.get("/", auth.required, userController.index);
router.get("/:id", auth.required, userController.show);

router.post("/login", userController.login);
router.post("/registrar", userController.store);
router.put("/", auth.required, userController.update);
router.delete("/", auth.required, userController.remove);

router.get("/recuperar-senha", userController.showRecovery);
router.post("/recuperar-senha", userController.createRecovery);
router.get("/senha-recuperada", userController.showCompleteRecovery);
router.post("/senha-recuperada", userController.completeRecovery);

module.exports = router;