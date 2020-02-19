const router = requires('express').Router();

const CategoriaController = require('../../../controllers/CategoriaController');

const auth = require('../../auth');
const Validation = require('express-validation');
const { LojaValidation } = require('../../../controllers/validations/lojaValidation');
const { CategoriaValidation } = require('../../../controllers/validations/categoriaValidation');

const categoriaController = new CategoriaController();

router.get('/', categoriaController.index);
router.get('/disponiveis', categoriaController.indexDisponiveis);
router.get('/:id', categoriaController.show);

router.post('/', auth.required, LojaValidation.admin, categoriaController.store);
router.put('/:id', auth.required, LojaValidation.admin, categoriaController.update);
router.delete('/:id', auth.required, LojaValidation.admin, categoriaController.remove);

module.exports = router;