let express = require('express');
let routes = express.Router();
let NeDB = require('nedb');

let db = new NeDB({
    filename: 'dados/usuarios.db',
    autoload: true
});

// 9 inserir usuario
routes.post('/usuarios', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    db.insert(req.body, (err, usuarios) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(200).json(usuarios);
        }
    })
})
 
// 10 login
routes.get('/usuarios/login/:username/:senha', (req, res) => {
    db.findOne({ username: req.params.username }).sort({}).exec((err, usuarios) => {
        if (err){
            res.status(400).json({ error: err })
        }
        else if (usuarios == null) {
            res.status(404).json("usuário ou senhas não encontrados")
        } else {
            db.findOne({ senha: req.params.senha }).sort({}).exec((erro, login) => {
                if (erro){
                    res.status(400).json({ error: erro })
                }
                else if (login == null) {
                    res.status(404).json("usuário ou senhas não encontrados")
                } else {
                    res.json({ login });
                }
            }
            )
        }
    }
    )
})

//todos os usuarios
routes.get('/usuarios', (req, res) => {
    db.find({}).sort({}).exec((err, usuarios) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.json({ usuarios });
        }
    }
    )
})

module.exports = routes;