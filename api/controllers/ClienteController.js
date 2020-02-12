const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente');
const Usuario = mongoose.model('Usuario');

class ClienteController {
    
    /**
     * 
     *  ADMIN
     */
    
    // GET / index
    async index(req, res, next) {
        try {
            const offset = Number(req.query.offset) || 0;
            const limit = Number(req.query.limit) || 30;
            const clientes = await Cliente.paginate(
                { loja: req.query.loja },
                { offset, limit, populate: 'usuario' }
            );
            return res.send({ clientes });
        } catch (e) {
            next(e);
        }
    }

    // GET /search/:search/pedidos
    searchPedido(req, res, next) {
        return res.status(400).send({ error: 'Em desenvolvimento' });
    }

    // GET /search/:search
    async search(req, res, next) {
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 30;
        const search = new RegExp(req.params.search, 'i');
        try {
            const clientes = await Cliente.paginate(
                { loja: req.query.loja, nome: { $regex: search } },
                { offset, limit, populate: 'usuario' }
            );
            return res.send({ clientes });
        } catch (e) {
            next(e);
        } 
    }

    // GET /admin/:id
    async showAdmin(req, res, next) {
        try {
            const cliente = await (await Cliente.findOne({ _id: req.params.id, loja: req.query.loja })).populated('usuario');
            return res.send({ cliente });
        } catch(e) {
            next(e);
        }
    }

    // GET /admin/:id/pedidos
    async showPedidosClienteS(req, res, next) {
        return res.status(400).send({ error: 'Em desenvolvimento' });
    }

    // PUT /admin/:id
    async updateAdmin(req, res, next) {
        const { nome, cpf, email, telefones, endereco, dataDeNascimento } = req.body;
        try {
            const Cliente = await Cliente.findById(req.params.id).populate('usuario');
            if (nome) {
                cliente.usuario.nome = nome;
                cliente.nome = nome;
            }
            if (email) cliente.usuario.email = email;
            if (telefones) cliente.usuario.telefones = telefones;
            if (endereco) cliente.usuario.endereco = endereco;
            if (dataDeNascimento) cliente.usuario.dataDeNascimento = dataDeNascimento;
            await cliente.usuario.save();​
            await cliente.save();
            return res.send({ cliente });
        } catch (e) {
            next(e);
        }
    }

    /**
     * 
     *  CLIENTE
     */

    // GET /:id
    async show(req, res, next) {
        try {
            const cliente = await Cliente.findOneAndDelete({ usuario: req.payload.id, loja: req.query.loja }).populate('usuario');
            return res.send({ cliente });
        } catch(e) {
            next(e);
        }
    }

    // POST /
    async store(req, res, next) {
        const { nome, email, cpf, telefones, endereco, dataDeNascimento, password } = req.body;
        const { loja } = req.query;

        const usuario = new Usuario({ nome, email, loja });
        usuario.setSenha(password);
        const cliente = new Cliente({ nome, email, cpf, telefones, endereco, dataDeNascimento, usuario: usuario_id });

        try {
            await usuario.save();
            await cliente.save();
            return res.send({ cliente: Object.assign({}, cliente._doc, { email: usuario.email }) });
        } catch(e) {
            next(e);
        }
    }

    // PUT /:id
    async update(req, res, next) {
        const { nome, email, cpf, telefones, endereco, dataDeNascimento, password } = req.body;
        try {
            const cliente = await Cliente.findById({ usuario: req.payload.id }).populate('usuario');
            if (nome) {
                cliente.usuario.nome = nome;
                cliente.nome = nome;
            }   
            if (email) cliente.usuario.email = email;
            if (password) cliente.usuario.password = password;
            if (cpf) cliente.usuario.cpf = cpf;
            if (telefones) cliente.usuario.telefones = telefones;
            if (endereco) cliente.usuario.endereco = endereco;
            if (dataDeNascimento) cliente.usuario.dataDeNascimento = dataDeNascimento;
            await cliente.usuario.save();
            await cliente.save();
            return res.send({ cliente });
        } catch(e) {
            next(e);
        }
    }

    // DELETE /
    async remove(req, res, next) {
        try {
            const cliente = await (await Cliente.findOne({ usuarios: req.payload.id })).populated('usuario');
            await cliente.usuario.remove();
            cliente.deletado = true;
            await cliente.save();
            return res.send({ deletado: true });
        } catch(e) {
            next(e);
        }
    }
}

module.exports = ClienteController;
