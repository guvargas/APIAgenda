let express = require('express');
let routes = express.Router();
let NeDB = require('nedb');

let db = new NeDB({
    filename: 'dados/compromissos.db',
    autoload: true
});

// 1 inserir compromisso
routes.post('/compromissos', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    db.insert(req.body, (err, compromisso) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.status(200).json(compromisso);
        }
    })
})

// 2 Consultar todos os compromissos de uma pessoa
routes.get('/compromissos/:id', (req, res) => {
    db.find({idusuario:req.params.id}).sort({}).exec((err, compromissos) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            res.json({ compromissos });
        }
    }
    )
})


// 3 Consultar os compromissos filtrando pelo contato
routes.get('/compromissos/:idusuario/:idContato', (req, res) => {
    db.find({idcontato:req.params.idContato,
        idusuario:req.params.idusuario}).sort({}).exec((err, compromissos) => {
            if (err) {
                res.status(500).json({ error: err })
            } else {
                res.status(200).json({ compromissos });
            }
        }
    )
});

//listar todos os compromissos
routes.get('/compromissos/', (req, res) => {
    db.find({}).sort({}).exec((err, compromissos) => {
            if (err) {
                res.status(500).json({ error: err })
            } else {
                res.status(200).json({ compromissos });
            }
        }
    )
});

// 4 Consultar compromissos filtrando por um intervalo de data e usuario
routes.get('/compromissos/filtrodata/:inicio/:fim/:idusuario', (req, res) => {
    db.find({idusuario:req.params.idusuario}).sort({data:1}).exec((err, comp) => {
            if (err) {
                res.status(500).json({ error: err })
            } else {
            var obj = JSON.parse(JSON.stringify({comp}));
            var compromissos = [];
                    obj.comp.forEach(element => {
                        var myArr = element.data.split("/");
                   if(myArr[2]+myArr[1]+myArr[0]>=req.params.inicio&&myArr[2]+myArr[1]+myArr[0]<=req.params.fim){
                    compromissos.push(element);
                   }
               });
                res.status(200).json({compromissos});
            }
        }
    )
});




// 5 Excluir compromisso
routes.delete('/compromissos/:id', (req, res) => {
    db.remove({_id: req.params.id}, (err, compromissos) => {
            if (err) {
                res.status(500).json({ error: err })
            } else {
                res.status(200).json({deleted: compromissos});
            }
        }
    )
});



module.exports = routes;