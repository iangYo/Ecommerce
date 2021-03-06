const router = require('express').Router();

router.use('/usuarios', require('./users'));
router.use('/clientes', require('./clients'));
router.use('/lojas', require('./lojas'));

router.use('/categorias', require('./categorias'));
router.use('/produtos', require('./produtos'));
router.use('/avaliacoes', require('./avaliacoes'));
router.use('/variacoes', require('./variacoes'));

module.exports = router;
