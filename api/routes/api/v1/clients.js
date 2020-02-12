const router = require('express').Router();

const ClienteController = require('../../../controllers/ClientController');
const { LojaValidation } = require('../../../controllers/validations/lojaValidation');
const { ClientValidation } = require('../../../controllers/validations/clientValidation');
const Validation = require('express-validation');
const auth = require('../../auth');


const clientController = new ClientController();

// ADMIN
router.get('/', auth.required, LojaValidation.admin, clientController.index);
// router.get('/search/:search/pedidos', auth.required, LojaValidation.admin, clientController.searchPedido);
router.get('/search/:search', auth.required, LojaValidation.admin, clientController.search);

router.get('/admin/:id', auth.required, LojaValidation.admin, clientController.showAdmin);
// router.get('/admin/:id/:pedidos', auth.required, LojaValidation.admin, clientController.showPedidosClientes);

router.put('/admin/:id', auth.required, LojaValidation.admin, clientController.updateAdmin);

// CLIENT
router.get('/:id', auth.required, clientController.show);

router.post('/', clientController.store);
router.put('/:id', auth.required, clientController.update);
router.delete('/', auth.required, clientController.remove);

module.exports = router;