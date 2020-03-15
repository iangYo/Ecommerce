const router = require('express').Router();

const AvalicaoController = require('../../../controllers/AvaliacaoController');

const { LojaValidation } = require('../../../controllers/validations/lojaValidation');
const auth = require('../../auth');

const avaliacaoController = new AvaliacaoController();

// CLIENTES/VISITANTE
router.get('/', avaliacaoController.index);
router.get('/:id', avaliacaoController.show);
router.post('/', auth.required, avaliacaoController.store);

// ADMIN
router.delete('/:id', auth.required, LojaValidation.admin, avaliacaoController.remove);

module.exports = router