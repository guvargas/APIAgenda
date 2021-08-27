let express = require('express');
let routes = express.Router();
let NeDB = require('nedb');

let db = new NeDB({
    filename: 'dados/contatos.db',
    autoload: true
});

// 6 inserir contato
routes.post('/contatos', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    db.insert(req.body, (err, contato) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(200).json(contato);
        }
    })
})

// 6 trazer contato por id contato
routes.get('/contatos/contato/:id', (req, res) => {
    db.find({ _id: req.params.id }).sort({}).exec((err, contato) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.json({ contato });
        }
    }
    )
})


// 7 atualizar contato
routes.put('/contatos/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    db.update({_id: req.params.id}, req.body, (err, contato) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(200).json(req.body);
        }
    })
})
 
// 8 consultar contato filtrnado pelo nome
/*
routes.get('/contatos/:nome', (req, res) => {
    db.find({ nome: req.params.nome }).sort({}).exec((err, contato) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.json({ contato });
        }
    }
    )
})*/

// Contatos de um id (pessoa)
routes.get('/contatos/:id', (req, res) => {
    db.find({ idusuario: req.params.id }).sort({}).exec((err, contato) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.json({ contato });
        }
    }
    )
})

// Contatos de um id (pessoa) por nome
routes.get('/contatos/:id/:nome', (req, res) => {
    db.find({ idusuario: req.params.id,
        nome: req.params.nome 
    }).sort({}).exec((err, contato) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.json({ contato });
        }
    }
    )
})

//busca todos os contatos
  routes.get('/contatos', (req, res) => {
    db.find({}).sort({}).exec((err, contatos) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.json({ contatos });
        }
    }
    )
})


module.exports = routes;