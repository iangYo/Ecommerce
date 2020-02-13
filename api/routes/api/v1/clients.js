const router = require('express').Router();

const ClienteController = require('../../../controllers/ClientController');
const { LojaValidation } = require('../../../controllers/validations/lojaValidation');
const { ClienteValidation } = require('../../../controllers/validations/clienteValidation');
const Validation = require('express-validation');
const auth = require('../../auth');


const clientController = new ClientController();

// ADMIN
router.get('/', auth.required, LojaValidation.admin, Validation(ClienteValidation.index), clientController.index);
// router.get('/search/:search/pedidos', auth.required, LojaValidation.admin, clientController.searchPedido);
router.get('/search/:search', auth.required, LojaValidation.admin, Validation(ClienteValidation.search), clientController.search);

router.get('/admin/:id', auth.required, LojaValidation.admin, Validation(ClienteValidation.showAdmin), clientController.showAdmin);
// router.get('/admin/:id/pedidos', auth.required, LojaValidation.admin, clientController.showPedidosClientes);

router.put('/admin/:id', auth.required, LojaValidation.admin, Validation(ClienteValidation.updateAdmin), clientController.updateAdmin);

// CLIENT
router.get('/:id', auth.required, Validation(ClienteValidation.show), clientController.show);

router.post('/', Validation(ClienteValidation.store), clientController.store);
router.put('/:id', auth.required, Validation(ClienteValidation.update), clientController.update);
router.delete('/', auth.required, clientController.remove);

module.exports = router;