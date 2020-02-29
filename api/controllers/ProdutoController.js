const mongoose = require('mongoose');

const Produto = mongoose.model('Produto');
const Categoria = mongoose.model('Categoria');

class ProdutoController {
    // ADMIN 

    // POST / - store
    async store(req, res, next) {
        const { titulo, descricao, categoria: categoriaId, preco, promocao, sku } = req.body;
        const { loja } = req.query;

        try {
            const produto = new Produto({
                titulo,
                disponibilidade: true,
                descricao,
                categoria: categoriaId,
                preco,
                promocao,
                sku,
                loja
            });

            const categoria = await Categoria.findById(categoriaId);
            categoria.produtos.push(produto._id);

            await produto.save();
            await categoria.save();

            res.send({ produto });
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        const { titulo, descricao, disponibilidade, categoria, preco, promocao, sku } = req.body;
        const { loja } = req.query;

        try {
            const produto = await produto.findById(req.params.id);
            if (!produto) return res.status(400).send({ error: 'Produto não encontrado' });

            if (titulo) produto.titulo = titulo;
            if (descricao) produto.descricao = descricao;
            if (disponibilidade !== undefined) produto.disponibilidade = disponibilidade;
            if (preco) produto.preco = preco;
            if (promocao) produto.promocao = promocao;
            if (sku) produto.sku = sku;

            if (categoria && categoria.toString() !== produto.categoria.toString()) {
                const oldCategoria = await Categoria.findById(produto.categoria);
                const newCategoria = await Categoria.findById(categoria);

                if (oldCategoria && newCategoria) {
                    oldCategoria.produtos = oldCategoria.produtos.filter(item => item !== produto._id);
                    newCategoria.produtos.push(produto._id);    
                    produto.categoria = categoria;
                    await oldCategoria.save();
                    await newCategoria.save();
                } else if (newCategoria) {
                    newCategoria.produtos.push(produto._id);    
                    produto.categoria = categoria;
                    await newCategoria.save();
                }
            }

            await produto.save();

            return res.send({ produto });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = ProdutoController;