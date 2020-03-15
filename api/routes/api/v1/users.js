const router = require('express').Router();
const auth = require('../../auth');
const UserController = require('../../../controllers/UserController');

const Validation = require('express-validation');
const { UserValidation } = require('../../../controllers/validations/userValidation');
const userController = new UserController();

router.post('/login', Validation(UserValidation.login), userController.login);
router.post('/registrar', Validation(UserValidation.store), userController.store);
router.put('/', auth.required, Validation(UserValidation.update), userController.update);
router.delete('/', auth.required, userController.remove);

router.get('/recuperar-senha', userController.showRecovery);
router.post('/recuperar-senha', userController.createRecovery);
router.get('/senha-recuperada', userController.showCompleteRecovery);
router.post('/senha-recuperada', userController.completeRecovery);

router.get('/', auth.required, userController.index);
router.get('/:id', auth.required, Validation(UserValidation.show), userController.show);

module.exports = router;